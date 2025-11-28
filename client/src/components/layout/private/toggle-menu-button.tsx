"use client";
import { cn } from "../../../utils/cn";
import { toggleMenuView } from "../../../stores/features/app-native-features/nav-menu";
import { useAppDispatch, useAppSelector } from "../../../stores/store-hooks";
import { ChevronLeft } from "lucide-react";
import { useCallback } from "react";

export default function ToggleNavMenuButton({
  hideDesktopView,
}: {
  hideDesktopView?: boolean;
}) {
  const dispatch = useAppDispatch();
  const fullView = useAppSelector(
    (state) => state?.navMenuProperties?.value?.fullMenuView
  );

  const toggleMenu = useCallback(() => {
    dispatch(toggleMenuView());
  }, []);
  return (
    <button
      onClick={() => toggleMenu()}
      className={cn(hideDesktopView && "block lg:hidden")}
    >
      <ChevronLeft
        className={cn(
          "w-6 h-6",
          fullView ? "" : "rotate-180 w-10 h-10 transition-all"
        )}
      />
    </button>
  );
}
