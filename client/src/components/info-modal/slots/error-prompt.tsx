import { X } from "lucide-react";

export default function ErrorPrompt({
  message = "Action failed",
}: {
  message?: string;
}) {
  return (
    <div className="w-full flex items-center flex-col gap-5 text-red-500">
      <X className="w-24 h-24" />
      <h4 className={`font-semibold text-3xl`}>Error</h4>
      <p className=" text-sm text-center">{message}</p>
    </div>
  );
}
