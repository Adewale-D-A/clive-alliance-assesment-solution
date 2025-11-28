import { Outlet } from "react-router-dom";
import DashboardLayoutWrapper from "../components/layout/private";

export default function ProtectDashboard() {
  return (
    <DashboardLayoutWrapper>
      <Outlet />
    </DashboardLayoutWrapper>
  );
}
