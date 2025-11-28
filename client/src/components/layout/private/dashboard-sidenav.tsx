"use client";

import { useCallback, useEffect, useLayoutEffect } from "react";
import {
  toggleMenuView,
  changeFullMenuViewState,
  changeSecondaryMenuViewState,
} from "../../../stores/features/app-native-features/nav-menu";
import { useAppDispatch, useAppSelector } from "../../../stores/store-hooks";
// import ToggleNavMenuButton from "./toggle-menu-button";
import { cn } from "../../../utils/cn";
import { LogOut } from "lucide-react";
import signOutClient from "../../../utils/auth/sign-out-client";
import SideBarItems from "./sidebar-items";
import { destroyContent } from "../../../stores/features/services/dynamic-content-render";
import { Logo } from "../../logo";
import { useLocation, useNavigate } from "react-router-dom";
import ToggleNavMenuButton from "./toggle-menu-button";

export const DashboardSideNav = () => {
  const pathname = useLocation();
  const router = useNavigate();
  const dispatch = useAppDispatch();

  //get status of side menu from redux store
  const { fullMenuView, secondaryMenu } = useAppSelector(
    (state) => state?.navMenuProperties?.value
  );
  const closeMenu = useCallback(() => {
    dispatch(toggleMenuView());
    dispatch(changeSecondaryMenuViewState({ state: false }));
  }, []);

  const changeFullMenuState = useCallback((state: boolean) => {
    dispatch(changeFullMenuViewState({ state }));
  }, []);

  useLayoutEffect(() => {
    dispatch(changeSecondaryMenuViewState({ state: false }));
    dispatch(destroyContent());
  }, [pathname]);

  // Close side menu on route change
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const isMobile = mediaQuery.matches;
    const handleViewToggle = () => {
      if (isMobile) {
        changeFullMenuState(false);
      }
    };
    handleViewToggle();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      // ALERT: Internal API call!
      // await axios.delete(`/api/auth/delete-cookie`);
      signOutClient();
      // dispatch({ type: "RESET_STORE" }); // Reset
      router("/");
    } catch (error) {}
  };

  return (
    <div className="">
      <div
        className={cn(
          `h-screen  fixed top-0 left-0 flex items-stretch transition-width duration-200 z-50 border-r border-gray-200`,
          fullMenuView
            ? "w-64 rounded-r-lg md:rounded-r-none"
            : "hidden md:flex md:w-20"
        )}
      >
        <div
          className={cn(
            "w-full overflow-y-auto flex flex-col h-full  bg-off_white",
            fullMenuView && "max-w-64"
          )}
        >
          <div className={cn(`block w-full p-5`, !fullMenuView && "hidden")}>
            <Logo url="#" />
          </div>
          <div className=" h-full flex flex-col justify-between gap-10">
            <nav
              className={cn(
                "w-full space-y-3",
                fullMenuView ? "px-1 md:px-2 mt-8" : "px-0 mt-16"
              )}
            >
              <SideBarItems />
            </nav>
            <div className=" flex flex-col border-t border-gray-300 pt-5 items-center gap-4 ">
              <button
                type="button"
                onClick={() => handleLogout()}
                className={`p-4 rounded-lg font-bold hover:cursor-pointer flex items-center justify-center text-red-500 gap-4 transition-all hover:bg-red-500 hover:text-white w-fit`}
              >
                <LogOut />
                {fullMenuView && <span>Log out</span>}
              </button>
              <div className={cn("flex justify-end pb-10 w-full")}>
                <ToggleNavMenuButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {(fullMenuView || secondaryMenu) && (
        <div
          className=" fixed top-0 right-0 w-full h-full z-[18] block md:hidden  backgrop-bg-filter"
          onClick={() => closeMenu()}
        ></div>
      )}
    </div>
  );
};
