"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/_shared/select";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useCallback } from "react";
import useCreateQueryString from "../../hooks/use-create-query-string";

export default function DateSort({ ...props }: SelectPrimitive.SelectProps) {
  const query = useCreateQueryString();

  const handleOnChange = useCallback((value: string) => {
    query("sort", value);
  }, []);
  return (
    <Select {...props} onValueChange={(e) => handleOnChange(e)}>
      <SelectTrigger className=" w-fit">
        <SelectValue placeholder={"Sort"} />
      </SelectTrigger>
      <SelectContent
        className="max-h-[50vh] w-full space-y-2"
        position="popper"
      >
        <SelectGroup className=" w-full">
          {[
            { id: "1", label: "Asc", value: "created_at" },
            { id: "2", label: "Desc", value: "-created_at" },
          ].map((state) => (
            <SelectItem value={state?.value} key={state?.value}>
              {state?.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
