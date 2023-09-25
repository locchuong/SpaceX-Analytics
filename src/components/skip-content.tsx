/**
 * A button component that allows screen readers and keyboard users to skip
 * directly to the main content of a web page.
 */
function SkipContentButton() {
  return (
    <a id="skip-link" className="visually-hidden" aria-label="Skip to content" href="#main">
      Skip to content
    </a>
  );
}
export { SkipContentButton };
