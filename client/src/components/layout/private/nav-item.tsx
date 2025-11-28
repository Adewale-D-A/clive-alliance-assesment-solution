import { useMemo, useState } from "react";
import { cn } from "../../../utils/cn";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SideMenuI } from "./sidebar-items";
import { Link, useLocation } from "react-router-dom";

export default function NavLinkItem({
  href,
  icon: Icon,
  title,
  exact,
  children,
  isMinimized,
  iconHueClassName,
  startUrl,
}: // isMinimized,
{
  href: string;
  icon: LucideIcon;
  title: string;
  children?: SideMenuI[];
  exact?: boolean;
  isMinimized: boolean;
  iconHueClassName: string;
  startUrl: string;
}) {
  const [isDocked, setIsDocked] = useState(true);
  const pathname = useLocation();

  const isActive = useMemo(() => {
    return pathname.pathname.includes(startUrl);
  }, [pathname, startUrl]);
  return (
    <div className="w-full group text-sm">
      <Link
        to={children?.length || 0 > 0 ? "#" : href}
        onClick={() => setIsDocked((prev) => !prev)}
      >
        <div
          className={cn(
            "flex justify-between items-center gap-2 hover:bg-primary hover:text-white font-semibold hover:pl-5 transition-all ",
            isActive ? "bg-primary text-white" : " text-gray-500",
            isMinimized
              ? "rounded-sm hover:pl-0 p-2 py-3"
              : "rounded-r-2xl rounded-l-md p-2 px-1 lg:px-2 py-3 "
          )}
        >
          <div className={cn("w-full flex items-center gap-3")}>
            <div
              className={cn(
                " rounded-full w-fit p-2 group-hover:bg-white group-hover:text-primary",
                iconHueClassName,
                isActive && "text-primary bg-white"
              )}
            >
              <Icon className={cn("w-5 h-5")} />
            </div>
            {!isMinimized && <p className="flex-1">{title}</p>}
          </div>
          {children?.length ||
            (0 > 0 && !isMinimized && (
              <ChevronDown
                className={cn(
                  "size-5 rotate-[270deg]",
                  !isDocked ? "rotate-0" : "group-hover:rotate-0"
                )}
              />
            ))}
        </div>
      </Link>

      {children?.length ||
        (0 > 0 && !isDocked && (
          <div className="w-[calc(100%-0.5rem)] lg:w-[calc(100%-1.25rem)] ml-2 lg:ml-4 my-3 space-y-2 transition-all">
            {children
              ?.filter((it) => it.show)
              .map(({ icon: SubIcon, ...subItem }, indx) => (
                <Link
                  to={subItem?.href}
                  key={subItem?.id}
                  className={cn(
                    "flex justify-between group/child gap-2 p-3 rounded-r-2xl rounded-l-md hover:bg-primary hover:text-white font-semibold hover:pl-8 transition-all ",
                    // pathname.includes(subItem?.startUrl)
                    //   ? "bg-primary text-white "
                    //   :"",
                    " text-gray-500"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        " rounded-full w-fit p-2 group-hover/child:bg-white group-hover/child:text-primary",
                        indx % 2 === 1
                          ? "text-[#007bd8] bg-[#007bd8]/10"
                          : "text-[#66C61C] bg-[#66C61C]/10"
                        // pathname.includes(subItem?.startUrl) &&
                        //   "bg-white text-primary"
                      )}
                    >
                      <SubIcon className={cn("w-5 h-5")} />
                    </div>
                    {!isMinimized && <span>{subItem?.title}</span>}
                  </div>
                </Link>
              ))}
          </div>
        ))}
    </div>
  );
}
