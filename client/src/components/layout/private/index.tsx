"use client";
import { DashboardSideNav } from "./dashboard-sidenav";
import { useAppSelector } from "../../../stores/store-hooks";
import { BellDot, User } from "lucide-react";
import { cn } from "../../../utils/cn";
import formatDate, { formatTime } from "../../../utils/dates/isoDateConverter";
// import useExtractProfile from "../../../hooks/extract-profile";
import { Link } from "react-router-dom";
import ToggleNavMenuButton from "./toggle-menu-button";
const DashboardLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const { isLoading: isProfileLoading, data } = useExtractProfile();

  const { fullMenuView, secondaryMenu } = useAppSelector(
    (state) => state?.navMenuProperties?.value
  );

  // if (isProfileLoading) return <Loading />;

  return (
    <div className="w-full flex">
      <DashboardSideNav />

      {/* Main Content */}
      <div
        className={cn(
          "w-full flex-grow flex flex-col transition-all",
          fullMenuView && secondaryMenu
            ? "md:max-w-[calc(100vw-512px)] md:ml-128"
            : fullMenuView
            ? "md:max-w-[calc(100vw-256px)] md:ml-64"
            : secondaryMenu
            ? "md:max-w-[calc(100vw-320px)] md:ml-80"
            : "md:max-w-[calc(100vw-40px)] md:ml-20"
        )}
      >
        {/* Top Navbar */}

        <header className="bg-off_white shadow-sm sticky top-0 z-10 flex justify-between items-center p-4  bg-no-repeat bg-contain bg-center ">
          <div className=" flex items-center gap-2">
            <ToggleNavMenuButton hideDesktopView />
            <div className="flex-col gap-0 hidden lg:flex">
              <h3 className="text-xl lg:text-2xl font-semibold flex items-end gap-1.5">
                Your Personal Banking Experience
              </h3>
              <p className=" text-sm text-gray-400">
                {formatDate(new Date().toISOString())},{" "}
                {formatTime(new Date().toISOString())}
              </p>
            </div>
          </div>
          <div className="items-center gap-5 hidden lg:flex">
            <Link to="#">
              <BellDot />
            </Link>
            <Link to="/dashboard/settings">
              <User />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="h-full overflow-y-auto w-full py-10 p-5">
          <div className=" w-full flex justify-center">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutWrapper;
