// Build-time Amazon affiliate link helper.
// Appends your Associates tag to any Amazon product URL without hardcoding the
// tag in content. Non-Amazon URLs are returned untouched.
import { AMAZON_TAG } from '../config';

// Matches amazon.com, amazon.co.uk, amazon.ca, smile.amazon.com, www.amazon.de, etc.
const AMAZON_HOST = /(^|\.)amazon\.[a-z.]+$/i;

/** True if the URL points at an Amazon storefront we can tag. */
export function isAmazonUrl(rawUrl?: string | null): boolean {
  if (!rawUrl) return false;
  try {
    return AMAZON_HOST.test(new URL(rawUrl).hostname);
  } catch {
    return false;
  }
}

/**
 * Return the URL with `tag=<affiliate tag>` set. If the URL isn't an Amazon
 * link, or no tag is configured, the original URL is returned unchanged.
 */
export function withAffiliateTag(rawUrl?: string | null, tag: string = AMAZON_TAG): string {
  if (!rawUrl) return '';
  if (!tag || !isAmazonUrl(rawUrl)) return rawUrl;
  try {
    const u = new URL(rawUrl);
    u.searchParams.set('tag', tag);
    return u.toString();
  } catch {
    return rawUrl;
  }
}
