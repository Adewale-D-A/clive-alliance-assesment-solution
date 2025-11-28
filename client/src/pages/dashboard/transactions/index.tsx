import { Button } from "../../../components/_shared/button";
import TableTemplate from "../../../components/_shared/table/table-template";
import Search from "../../../components/search";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/_shared/dropdown-menu";
import DateFilter from "../../../components/filters/date";
import DateSort from "../../../components/filters/date-sort";
import formatDate from "../../../utils/dates/isoDateConverter";
import pageSerializer from "../../../utils/page-serializer";

export default function DashboardTransactions() {
  return (
    <div className=" w-full space-y-2">
      <div className=" w-full space-y-5">
        <h1 className=" font-semibold text-2xl">My Transactions </h1>
        <div className=" w-full flex justify-end items-end flex-col gap-5">
          {<Button className=" w-fit">Make a transaction</Button>}
          <div className=" w-full flex flex-col lg:flex-row justify-between gap-4 items-center shadow p-2">
            <DateFilter /> <DateSort />
            <div className="w-fit flex justify-end items-center gap-2">
              <Search className="w-full max-w-sm" />{" "}
            </div>
          </div>
        </div>
        <TableTemplate
          data={[]}
          isLoading={false}
          columns={[
            {
              header: "S/N",
              key: "sn",
              render: ({}, index) => (
                <p>
                  {pageSerializer({
                    currentPage: 1,
                    pageSize: 10,
                    index: index ?? 0,
                  })}
                </p>
              ),
            },
            {
              header: "NAME",
              key: "name",
              render: ({ first_name, last_name, email, phone_number }) => (
                <div>
                  <p className=" capitalize">
                    {first_name} {last_name}
                  </p>
                  <span className=" text-xs text-gray-500">
                    {email} | {phone_number}
                  </span>
                </div>
              ),
            },
            {
              header: "AMOUNT",
              key: "amount",
              render: ({ gender }) => <p>{gender}</p>,
            },
            {
              header: "DESCRIPTION",
              key: "description",
              render: ({ user_type }) => <p>{user_type?.name}</p>,
            },
            {
              header: "CREATED AT",
              key: "created_at",
              showColumnSort: true,
              render: (row) => <p>{formatDate(row?.created_at)}</p>,
            },
            {
              header: "ACTION",
              key: "action",
              render: (row) => (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="text"
                      size="icon"
                      className="relative p-0 rounded-full"
                    >
                      <Ellipsis />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {<DropdownMenuItem>View Details</DropdownMenuItem>}
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            },
          ]}
          showPaginator={true}
          // pagination={pagination}
        />
      </div>
    </div>
  );
}
