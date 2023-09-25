import { useLocation } from "react-router-dom";

import { Navigate } from "~/router";

// Redirect to root if User lands on unknown route
function NotFound() {
  const location = useLocation();
  return <Navigate to="/" state={{ from: location }} replace />;
}
export default NotFound;
