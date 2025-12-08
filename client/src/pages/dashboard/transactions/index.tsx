import { Button } from "../../../components/_shared/button";
import TableTemplate from "../../../components/_shared/table/table-template";
import Search from "../../../components/search";
import { Ellipsis, Wallet } from "lucide-react";
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
import { useCallback } from "react";
import { useAppDispatch } from "../../../stores/store-hooks";
import { openFormModal } from "../../../stores/features/services/form-modal";
import useGetTransactions from "../../../hooks/services/GET/transactions/transactions";
import useExtractUrlParams from "../../../hooks/extract-url-query-params";
import currencyFormat from "../../../utils/currency-formatter";

export default function DashboardTransactions() {
  const dispatch = useAppDispatch();

  const [{ search, page, start_date, end_date, size, sort }] =
    useExtractUrlParams({
      page: 1,
      size: 10,
      start_date: "",
      end_date: "",
      search: "",
      sort: "asc",
    });
  const { data, pagination, isLoading } = useGetTransactions({
    search,
    page,
    limit: size,
    start_date,
    end_date,
    sort,
  });

  const transact = useCallback(() => {
    dispatch(
      openFormModal({
        render: "Transact",
        title: "New Transaction",
        metadata: {
          w_classname: "max-w-screen-lg",
        },
      })
    );
  }, []);

  const showTransaction = useCallback((id: string) => {
    dispatch(
      openFormModal({
        render: "ShowTransaction",
        title: "Transaction Details",
        metadata: { id },
      })
    );
  }, []);

  return (
    <div className=" w-full space-y-2">
      <div className=" w-full space-y-5">
        <div className=" w-full flex justify-center items-center">
          <p className=" font-bold text-center rounded-xl bg-rose-500/5 text-rose-500 p-4 px-8 w-fit flex items-center gap-2">
            <Wallet /> My Transactions
          </p>
        </div>
        <div className=" w-full flex justify-center lg:justify-end items-end flex-col gap-5">
          <Button className="w-full lg:w-fit" onClick={transact}>
            Make a transaction
          </Button>
          <div className=" w-full flex flex-col lg:flex-row justify-between gap-4 items-center shadow p-2">
            <DateFilter /> <DateSort />
            <div className="w-fit flex justify-end items-center gap-2">
              <Search className="w-full max-w-sm" />{" "}
            </div>
          </div>
        </div>
        <TableTemplate
          data={data}
          isLoading={isLoading}
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
              header: "RECIPIENT",
              key: "recipient",
              render: ({ recipient }) => (
                <div>
                  <p className=" capitalize">{recipient?.account_name}</p>
                  <span className=" text-xs text-gray-500">
                    Account: | {recipient?.account_number}
                  </span>
                </div>
              ),
            },
            {
              header: "AMOUNT",
              key: "amount",
              render: ({ amount }) => <p>{currencyFormat(amount || 0)}</p>,
            },
            {
              header: "TRANSACTION TYPE",
              key: "type",
              render: ({ type }) => <p className=" uppercase">{type}</p>,
            },
            {
              header: "DESCRIPTION",
              key: "description",
              render: ({ description }) => <p>{description}</p>,
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
                    <DropdownMenuItem onSelect={() => showTransaction(row?.id)}>
                      Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            },
          ]}
          showPaginator={true}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
