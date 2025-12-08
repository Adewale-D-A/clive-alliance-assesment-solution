import { useCallback } from "react";
import type { ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "../_shared/button";
import { cn } from "../../utils/cn";

export default function Loader({
  isLoading,
  isFailed,
  setIsFailed,
  retry,
  children,
  ...props
}: {
  isLoading?: boolean;
  isFailed?: boolean;
  setIsFailed?: (val: boolean) => void;
  retry?: () => void;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { className, ...rest } = props;
  const retryRequest = useCallback(() => {
    setIsFailed?.(false);
    retry?.();
  }, [retry]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "w-full min-h-60 animate-pulse rounded-md bg-gray-400",
          className
        )}
        {...rest}
      />
    );
  }

  if (isFailed) {
    return (
      <div
        className={cn(
          "w-full min-h-60 rounded-md flex flex-col gap-3 items-center justify-center bg-gray-100",
          className
        )}
        {...rest}
      >
        <p className=" italic text-gray-500">Failed</p>
        <div>
          <Button
            variant={"destructive"}
            onClick={() => retryRequest()}
            className=" flex items-center gap-2"
          >
            Retry <RefreshCw className=" h-5 w-6" />
          </Button>
        </div>
      </div>
    );
  }
  return <div {...props}>{children}</div>;
}
