import { Outlet } from "react-router-dom";
import InfoModal from "../components/info-modal";
import FormModal from "../components/dynamic-renders/modal-renders";

export default function AppWrapper() {
  return (
    <>
      <Outlet />
      <InfoModal />
      <FormModal />
    </>
  );
}
