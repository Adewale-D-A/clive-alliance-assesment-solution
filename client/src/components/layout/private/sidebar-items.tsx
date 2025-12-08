import {
  LayoutDashboard,
  PiggyBank,
  UserRoundCog,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import NavLinkItem from "./nav-item";
import { useAppSelector } from "../../../stores/store-hooks";

export interface SideMenuI {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  show: boolean;
  startUrl: string;
  children?: SideMenuI[];
}

export default function SideBarItems() {
  const { fullMenuView } = useAppSelector(
    (state) => state?.navMenuProperties?.value
  );

  return (
    <>
      {[
        {
          id: "1",
          show: true,
          title: "Dashboard",
          href: `/dashboard/home`,
          startUrl: "/dashboard/home",
          icon: LayoutDashboard,
          iconHueClassName: "text-[#00359E] bg-[#00359E]/10",
        },
        {
          id: "2",
          show: true,
          title: "My Account",
          href: `/dashboard/account`,
          startUrl: "/dashboard/account",
          icon: PiggyBank,
          iconHueClassName: "text-[#66C61C] bg-[#66C61C]/10",
          children: [],
        },
        {
          id: "3",
          show: true,
          title: "Transactions",
          href: `/dashboard/transactions`,
          startUrl: "/dashboard/transactions",
          icon: Wallet,
          iconHueClassName: "text-[#f4a261] bg-[#f4a261]/10",
          children: [],
        },
      ]
        .filter((it) => it.show)
        .map((item) => (
          <NavLinkItem key={item.id} {...item} isMinimized={!fullMenuView} />
        ))}
    </>
  );
}
