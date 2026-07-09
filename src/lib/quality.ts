// Verification / quality scoring for location entries.
//
// The grade is a TRANSPARENT function of the objective factcheck fields in
// frontmatter — not a black box. It measures how well-sourced and reviewed an
// entry is (its "verification status"), NOT a claim that every fact is true.
// See project memory: location-factcheck-standard.

export type FactcheckStatus =
  | 'unverified'
  | 'in-review'
  | 'verified'
  | 'corrected'
  | 'flagged';

export type SourceTier = 'primary' | 'peer-reviewed' | 'secondary' | 'none';

export interface Factcheck {
  status: FactcheckStatus;
  lastChecked: string | null;
  reviewer: string | null;
  sourceTier: SourceTier;
  claimsTotal: number;
  claimsCited: number;
  openFlags: number;
  neutrality: 'pass' | 'fail' | 'n/a';
  checkedHash: string | null;
  notes: string | null;
}

export const FACTCHECK_DEFAULT: Factcheck = {
  status: 'unverified',
  lastChecked: null,
  reviewer: null,
  sourceTier: 'none',
  claimsTotal: 0,
  claimsCited: 0,
  openFlags: 0,
  neutrality: 'n/a',
  checkedHash: null,
  notes: null,
};

// Deterministic, dependency-free content hash (djb2 xor -> base36).
// Used to detect edits after a check: if the live content hash differs from
// the hash captured at check time, the entry is "stale" and needs re-review.
export function contentHash(...parts: Array<string | null | undefined>): string {
  const s = parts.filter(Boolean).join('');
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (((h << 5) + h) ^ s.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
}

export type Grade = 'A' | 'B' | 'C' | 'D' | '—';
export type DisplayStatus = FactcheckStatus | 'stale';

export interface Quality {
  status: DisplayStatus;
  label: string;
  grade: Grade;
  color: string; // badge background
  /** Whether the public "Sources verified" badge should show for this entry. */
  verifiedPublic: boolean;
  /** Sort weight: higher = needs attention sooner. */
  attentionRank: number;
  reasons: string[];
}

const COLORS: Record<DisplayStatus, string> = {
  verified: '#1a7f5a',
  corrected: '#1a7f5a',
  'in-review': '#3a9bdc',
  stale: '#8a5cd0',
  flagged: '#b0392f',
  unverified: '#8391a0',
};

const LABELS: Record<DisplayStatus, string> = {
  verified: 'Verified',
  corrected: 'Corrected',
  'in-review': 'In review',
  stale: 'Re-review (stale)',
  flagged: 'Flagged',
  unverified: 'Unverified',
};

// Higher = surfaces first in the admin worklist.
const ATTENTION: Record<DisplayStatus, number> = {
  flagged: 5,
  stale: 4,
  unverified: 3,
  'in-review': 2,
  corrected: 1,
  verified: 0,
};

/**
 * Derive display status + grade from the stored factcheck record and the
 * entry's current content hash.
 */
export function deriveQuality(
  input: Partial<Factcheck> | undefined,
  currentHash: string
): Quality {
  const f: Factcheck = { ...FACTCHECK_DEFAULT, ...(input ?? {}) };
  const reasons: string[] = [];

  const wasChecked = f.status === 'verified' || f.status === 'corrected';
  const stale =
    wasChecked && f.checkedHash != null && f.checkedHash !== currentHash;

  let status: DisplayStatus = f.status;
  if (stale) {
    status = 'stale';
    reasons.push('Content edited since it was last verified.');
  }

  // Grade only meaningful for checked, non-stale entries.
  let grade: Grade = '—';
  if (status === 'verified' || status === 'corrected') {
    const coverage = f.claimsTotal > 0 ? f.claimsCited / f.claimsTotal : 0;
    const tierRank =
      f.sourceTier === 'primary' || f.sourceTier === 'peer-reviewed'
        ? 3
        : f.sourceTier === 'secondary'
          ? 2
          : 0;

    if (f.neutrality === 'fail') {
      grade = 'D';
      reasons.push('Neutrality check failed.');
    } else if (tierRank === 3 && coverage >= 0.95 && f.openFlags === 0) {
      grade = 'A';
    } else if (tierRank >= 2 && coverage >= 0.8 && f.openFlags === 0) {
      grade = 'B';
    } else if (coverage >= 0.6 && f.openFlags <= 1) {
      grade = 'C';
    } else {
      grade = 'D';
    }
    if (f.openFlags > 0) reasons.push(`${f.openFlags} open flag(s).`);
    if (coverage < 1)
      reasons.push(
        `${f.claimsCited}/${f.claimsTotal} claims cited (${Math.round(coverage * 100)}%).`
      );
  }

  const verifiedPublic =
    (status === 'verified' || status === 'corrected') &&
    f.neutrality === 'pass' &&
    f.openFlags === 0 &&
    (grade === 'A' || grade === 'B');

  return {
    status,
    label: LABELS[status],
    grade,
    color: COLORS[status],
    verifiedPublic,
    attentionRank: ATTENTION[status],
    reasons,
  };
}

/** Hash the parts of an entry that represent its factual content. */
export function entryContentHash(entry: {
  data: { title: string; description: string };
  body?: string;
}): string {
  const body = (entry.body ?? '').replace(/\r\n/g, '\n').trim();
  return contentHash(entry.data.title, entry.data.description, body);
}
