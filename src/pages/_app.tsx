import { Outlet } from "react-router-dom";
import AppProvider from "~/providers/app-provider";

import { SkipContentButton } from "~/components/skip-content";

function AppLayout() {
  return (
    <AppProvider>
      <SkipContentButton />
      <Outlet />
    </AppProvider>
  );
}
export default AppLayout;
