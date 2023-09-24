import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <a id="skip-link" className="visually-hidden" aria-label="Skip to content" href="#main">
        Skip to content
      </a>
      <Outlet />
    </>
  );
}
export default App;
