/**
 * A template (unlike a layout) re-mounts on every navigation, so each page
 * gets a soft fade-in. Pure CSS: the page is visible immediately in the server
 * HTML (good for loading speed and SEO) and reduced-motion visitors skip it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
