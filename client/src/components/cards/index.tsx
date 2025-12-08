import type { ReactNode } from "react";
import { Skeleton } from "../loader/skeleton";
import { cn } from "../../utils/cn";

export default function PrimaryCardItem({
  value,
  description,
  icon,
  textClassName,
  bgClassName,
  isLoading,
}: {
  value: string;
  description: string;
  icon: ReactNode;
  textClassName: string;
  bgClassName: string;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div className=" w-full rounded-lg shadow-sm border border-gray-100 p-7 space-y-8 hover:shadow-lg transition-all hover:scale-110 hover:cursor-pointer">
      <div
        className={cn(" rounded-full w-fit p-3", bgClassName, textClassName)}
      >
        {icon}
      </div>
      <div className=" space-y-2">
        <h4 className=" font-bold text-4xl">{value}</h4>
        <p className=" text-gray_text-500">{description}</p>
      </div>
    </div>
  );
}
