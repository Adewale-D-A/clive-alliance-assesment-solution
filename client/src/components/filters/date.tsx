"use client";

import { useCallback } from "react";
import type { FormEvent } from "react";
import { SendHorizonal } from "lucide-react";
import { Input } from "../../components/_shared/input";
import { Button } from "../../components/_shared/button";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function DateFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const onDateChange = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as any;
      const startDate = form?.start?.value;
      const endDate = form?.end?.value;
      const params = new URLSearchParams(searchParams.toString());
      params.set("start_date", startDate ?? "");
      params.set("end_date", endDate ?? "");
      const paramsString = params.toString();
      navigate(location.pathname + "?" + paramsString);
    },
    [location, searchParams]
  );

  return (
    <form
      className="w-full lg:w-fit flex flex-col lg:flex-row items-start lg:items-center gap-2 text-sm border border-gray-200 p-2 rounded-lg"
      onSubmit={onDateChange}
    >
      <label className="w-full lg:w-fit flex items-center gap-2">
        <span>From:</span>
        <Input type="date" name="start" required className="w-full lg:w-fit" />
      </label>
      <div className="w-full lg:w-fit flex items-center gap-2">
        <label className="w-full lg:w-fit flex items-center gap-2">
          <span>To:</span>
          <Input type="date" name="end" required className="w-full lg:w-fit" />
        </label>
        <Button type="submit" className=" rounded-full aspect-square p-1">
          <SendHorizonal className=" h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
