"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./index";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
// import { Skeleton } from "../../../components/loader/skeleton";
import Pagination from "../../../components/pagination";
import type { PaginationType } from "../../../types/types";
import { Skeleton } from "../../loader/skeleton";

interface Column<T> {
  key: string;
  header: string;
  render: (item: any, index?: number) => React.ReactNode;
  cellClassName?: string;
  showColumnSort?: boolean;
  hideOnMobile?: boolean;
}
export default function TableTemplate({
  data,
  columns,
  isLoading,
  emptyStateText,
  showPaginator,
  pagination,
  onCurrentPageChange,
  onPageSizeChange,
  paginatorLabel,
}: {
  data: any[];
  columns: Column<any>[];
  isLoading?: boolean;
  emptyStateText?: string;
  showPaginator?: boolean;
  pagination?: PaginationType;
  onCurrentPageChange?: (val: number) => void;
  onPageSizeChange?: (val: number) => void;
  paginatorLabel?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: any) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <div className=" w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {columns
              ?.filter((val) => !Boolean(val.hideOnMobile && isMobile))
              .map((column) => (
                <TableHead
                  key={String(column.key)}
                  className="text-xs font-medium hover:bg-none text-gray-500"
                >
                  <div className="flex gap-3 items-center">{column.header}</div>
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Loading state */}
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center space-y-3"
              >
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </TableCell>
            </TableRow>
          )}

          {/* Empty State */}
          {data?.length < 1 && !isLoading && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className=" h-[320px] place-items-center"
              >
                <div className="flex flex-col items-center text-center space-y-4 text-gray-400">
                  <div className=" p-3 rounded-full shadow-lg shadow-primary">
                    <Search />
                  </div>
                  <p className="body-md-normal text-gray-400!tracking-wide">
                    {emptyStateText ?? "No data"}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}

          {/* Data state */}
          {data?.length > 0 &&
            !isLoading &&
            data.map((item, index: number) => (
              <TableRow key={item.id}>
                {columns
                  ?.filter((val) => !Boolean(val.hideOnMobile && isMobile))
                  .map((column, columnIndex) => (
                    <TableCell
                      className={column.cellClassName}
                      key={`${String(column.key)}-${columnIndex}`}
                    >
                      {column.render(item, index)}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {showPaginator && (
        <Pagination
          isLoading={isLoading}
          pagination={
            pagination || {
              current_page: 1,
              last_page: 1,
              per_page: 1,
              total: 1,
              from: 1,
              to: 1,
            }
          }
          label={paginatorLabel}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}
