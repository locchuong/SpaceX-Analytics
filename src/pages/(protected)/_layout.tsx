import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, useLocation } from "react-router-dom";

import { firebaseAuth } from "~/config/firebase";

import { Footer, Header } from "~/features/base-ui";

import { Navigate } from "~/router";

function ProtectedLayout() {
  const location = useLocation();
  const [currentUser, isLoading, error] = useAuthState(firebaseAuth);

  // Loading authentication (Always null on mount)
  if (isLoading) {
    return false;
  }

  // Authentication error
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  // Unauthenticated
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated
  return (
    <div className="dark h-full min-h-screen w-full bg-black">
      <Header />

      <main id="main" className="relative min-h-screen bg-black">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
export default ProtectedLayout;
