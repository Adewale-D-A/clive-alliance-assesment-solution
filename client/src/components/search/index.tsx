import { cn } from "../../utils/cn";
import { SearchIcon } from "lucide-react";
import { useCallback, useState } from "react";
import type { ChangeEvent, SyntheticEvent } from "react";
import { Input } from "../_shared/input";
import type { InputProps } from "../_shared/input";
import useCreateQueryString from "../../hooks/use-create-query-string";

interface SearchProps extends InputProps {
  allowUrlQuery?: boolean;
}
export default function Search({
  allowUrlQuery = true,
  onChange,
  className,
  ...props
}: SearchProps) {
  const [search, setSearch] = useState("");
  const urlQuery = useCreateQueryString();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onChange?.(e);
  };

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      urlQuery("search", search);
      console.log("hot here");
    },
    [urlQuery, search, allowUrlQuery]
  );
  return (
    <form onSubmit={handleSubmit} className={cn("w-full", className)}>
      <Input
        type="text"
        onChange={(e) => handleOnChange(e)}
        placeholder="Search"
        className={cn("w-full", className)}
        {...props}
        leftIcon={<SearchIcon className={cn(" text-gray-500")} />}
      />
    </form>
  );
}
