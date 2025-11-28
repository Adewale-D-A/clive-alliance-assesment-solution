import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/_shared/select";

export default function PageSizeLimiter({
  onPageSizeChange,
}: {
  onPageSizeChange?: (val: number) => void;
}) {
  // const router = useRouter();
  // const pathname = usePathname();
  // const searchParams = useSearchParams();

  const handlePageSizeChange = useCallback((val: number) => {
    // onPageSizeChange?.(val);
    // let queries: { [key: string]: string } = {};
    // searchParams.forEach((value, key) => {
    //   queries[key] = value;
    // });
    // const params = new URLSearchParams(queries);
    // params.set("size", String(val));
    // params.set("page", "1");
    // router.push(pathname + "?" + params.toString());
  }, []);
  return (
    <Select
      // value={String(searchParams.get("size") || 10)}
      onValueChange={(v) => handlePageSizeChange(Number(v))}
    >
      <SelectTrigger className=" w-fit">
        <SelectValue placeholder="Limit" />
      </SelectTrigger>
      <SelectContent className=" w-fit">
        {[10, 20, 50, 100].map((v) => (
          <SelectItem key={String(v)} value={String(v)}>
            {v}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
