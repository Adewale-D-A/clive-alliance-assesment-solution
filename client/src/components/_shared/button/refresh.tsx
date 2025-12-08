import { RefreshCcw } from "lucide-react";
import { Button } from ".";

export default function Refresh({
  isLoading,
  retry,
}: {
  isLoading: boolean;
  retry: (skipCache?: boolean, limitless?: number) => void;
}) {
  return (
    <Button
      variant={"text"}
      title="Refresh"
      className=" hover:text-green-500 hover:scale-110 transition-all hover:cursor-pointer w-fit"
      isLoading={isLoading}
      onClick={() => retry(true)}
    >
      <RefreshCcw className=" size-5" />
    </Button>
  );
}
