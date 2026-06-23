// Base-path-aware URL helper. BASE_URL is '/PNWHistoricalExplorer' on GitHub
// Pages (or '/' if BASE_PATH is overridden for a custom domain).
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a root-relative path ('/map', '/images/x.jpg') with the site base. */
export const href = (path: string) => base + path;
