// Central site config. Editable values live in src/data/site.json (so they can
// be changed through the CMS), but anything sensitive or environment-specific
// can be overridden at build time with an env var, which always wins.
import site from './data/site.json';

/**
 * Amazon Associates tracking ID (e.g. "yourtag-20").
 * Precedence: PUBLIC_AMAZON_TAG env var  >  site.json  >  empty.
 * Note: the affiliate tag is NOT secret — it appears in the final public links.
 * It lives in env/config purely so it is never hardcoded across 90+ markdown files.
 */
export const AMAZON_TAG: string =
  import.meta.env.PUBLIC_AMAZON_TAG || site.amazonAssociatesTag || '';

/** GoatCounter site code, e.g. "pnwhistory" → https://pnwhistory.goatcounter.com */
export const GOATCOUNTER_CODE: string =
  import.meta.env.PUBLIC_GOATCOUNTER_CODE || '';

/**
 * Secret-token URL for embedding the full GoatCounter dashboard in an iframe on
 * /admin. The token grants ONLY read-only viewing of the dashboard; it lives in
 * the (public) page source on purpose so the embed renders without a login.
 * Rotate it any time in GoatCounter → Settings → "Generate random secret".
 * Override the token at build time with PUBLIC_GOATCOUNTER_TOKEN if you prefer.
 */
export const GOATCOUNTER_EMBED_URL: string = GOATCOUNTER_CODE
  ? `https://${GOATCOUNTER_CODE}.goatcounter.com?access-token=${
      import.meta.env.PUBLIC_GOATCOUNTER_TOKEN || 'k7p2m9x4q1w8z3n6b5v0r7t2y4h1j8s3'
    }`
  : '';

/**
 * GitHub repository as "owner/name". Used by the /admin build-health panel to
 * read the latest GitHub Actions run via the public REST API (no token — public
 * repos allow unauthenticated reads at 60 req/hr per IP, ample for admin use).
 */
export const GITHUB_REPO: string =
  import.meta.env.PUBLIC_GITHUB_REPO || 'red4golf/PNWHistoricalExplorer';

/** Default branch the deploy workflow runs on (for filtering the runs list). */
export const GITHUB_BRANCH: string =
  import.meta.env.PUBLIC_GITHUB_BRANCH || 'main';

/**
 * Google Search Console verification token — the value of the
 * <meta name="google-site-verification"> tag Google gives you under the
 * "HTML tag" verification method. Set PUBLIC_GOOGLE_SITE_VERIFICATION as a repo
 * variable; Base.astro then emits the tag on every page. Not secret.
 */
export const GOOGLE_SITE_VERIFICATION: string =
  import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION || '';

export { site };
