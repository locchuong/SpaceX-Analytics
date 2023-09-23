import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "~/router";

import { firebaseAuth } from "~/config/firebase";

function ProtectedLayout() {
  const location = useLocation();
  const [user, loading, error] = useAuthState(firebaseAuth);

  if (loading) {
    return false;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}
export default ProtectedLayout;
