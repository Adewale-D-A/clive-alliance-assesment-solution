"use client";

import { useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import getPagination from "../../utils/get-pagination";
import type { PaginationType } from "../../types/types";
import { Button } from "../_shared/button";
import PageSizeLimiter from "./page-limiter";
import { cn } from "../../utils/cn";
import { useLocation, useNavigate } from "react-router-dom";

export default function Pagination({
  pagination,
  isLoading,
  label,
  onCurrentPageChange,
  onPageSizeChange,
}: {
  pagination: PaginationType;
  isLoading?: boolean;
  label?: string;
  onCurrentPageChange?: (val: number) => void;
  onPageSizeChange?: (val: number) => void;
}) {
  const result = getPagination(pagination?.current_page, pagination?.last_page);

  const router = useNavigate();
  const pathname = useLocation();
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair

  const handlePageNumberChange = useCallback(
    (val: number) => {
      // onCurrentPageChange?.(val);
      // router.push(pathname + "?" + createQueryString("page", String(val)));
    },
    [pathname]
  );
  // productsArray next function
  const showNextproductsArray = useCallback(() => {
    if (pagination?.total >= pagination?.current_page * pagination?.per_page) {
      handlePageNumberChange(pagination?.current_page + 1);
    }
  }, [pagination]);

  // productsArray next previous
  const showPrevproductsArray = useCallback(() => {
    if (!(pagination?.current_page < 1)) {
      handlePageNumberChange(pagination?.current_page - 1);
    }
  }, [pagination]);

  return (
    <div className="w-full flex items-center flex-col md:flex-row justify-between gap-2 my-8 px-2.5">
      {/* <span>
        Showing {pagination?.to} of {pagination?.total} {label}{" "}
      </span> */}
      <Button
        type="button"
        title="next"
        variant={"text"}
        size="icon"
        isLoading={isLoading}
        disabled={Boolean(pagination?.current_page < 2)}
        className={cn(
          "w-fit p-2 flex px-4 items-center gap-3 justify-center border rounded-lg transition-all",
          "hover:bg-primary hover:text-white border-primary cursor-pointer "
        )}
        onClick={() => showPrevproductsArray()}
      >
        <ArrowLeft className=" h-4 w-4 min-h-4 min-w-4" /> Previous
      </Button>
      <div className="flex gap-2 flex-wrap justify-between items-center md:justify-center">
        <PageSizeLimiter onPageSizeChange={onPageSizeChange} />
        {result.map((page, index) => (
          <Button
            type="button"
            title="next"
            variant={"text"}
            size="icon"
            disabled={page === "..."}
            key={String(index)}
            onClick={() => handlePageNumberChange?.(page)}
            className={cn(
              "border min-h-4 min-w-4 aspect-square flex items-center justify-center rounded-lg p-3 text-primary hover:border-primary hover:bg-primary/10 transition-all cursor-pointer",
              page === pagination?.current_page &&
                "text-primary border-none font-bold bg-primary/10 "
            )}
          >
            {page}
          </Button>
        ))}
      </div>
      <Button
        type="button"
        title="next"
        variant={"text"}
        isLoading={isLoading}
        size="icon"
        disabled={Boolean(pagination?.last_page <= pagination?.current_page)}
        className={cn(
          "w-fit p-2 px-6 flex items-center gap-3 justify-center border rounded-lg transition-all",
          "hover:bg-primary hover:text-white border-primary cursor-pointer "
        )}
        onClick={() => showNextproductsArray()}
      >
        Next <ArrowRight className=" h-4 w-4 min-h-4 min-w-4" />
      </Button>
    </div>
  );
}
