import SideNavbar from "@/components/nav/SideNavbar";
import { Outlet } from "react-router-dom";
function AutomateLayout() {
  return (
    <>
     <div className="max-w-screen max-h-screen w-screen h-screen overflow-hidden">
      <SideNavbar/>
       <Outlet />
     </div>
    </>
  );
}

export default AutomateLayout;
