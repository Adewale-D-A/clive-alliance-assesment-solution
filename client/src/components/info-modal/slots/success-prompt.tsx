import { CheckCircle } from "lucide-react";

export default function SuccessPrompt({
  message = "Action was successful",
}: {
  message?: string;
}) {
  return (
    <div className="w-full flex items-center flex-col gap-5 text-green-500">
      <CheckCircle className="w-24 h-24" />
      <h4 className={`font-semibold text-3xl`}>Success</h4>
      <p className=" text-sm text-center">{message}</p>
    </div>
  );
}
