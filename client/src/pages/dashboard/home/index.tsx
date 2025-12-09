import { CircleDollarSign, Landmark } from "lucide-react";
import PrimaryCardItem from "../../../components/cards";
import currencyFormat from "../../../utils/currency-formatter";
import { Button } from "../../../components/_shared/button";
import TableTemplate from "../../../components/_shared/table/table-template";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/_shared/dropdown-menu";
import formatDate from "../../../utils/dates/isoDateConverter";
import pageSerializer from "../../../utils/page-serializer";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/store-hooks";
import { openFormModal } from "../../../stores/features/services/form-modal";
import useGetTransactions from "../../../hooks/services/GET/transactions/transactions";
import useGetMyAccount from "../../../hooks/services/GET/accounts/account";
import Loader from "../../../components/loader";
import Refresh from "../../../components/_shared/button/refresh";

export default function DashboardHome() {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetTransactions();
  const { user } = useAppSelector((state) => state.auth.value);
  const {
    data: myAccount,
    retryFunction: reloadMyAccount,
    isLoading: myAccountLoading,
  } = useGetMyAccount();

  const transact = useCallback((type?: "DEPOSIT") => {
    dispatch(
      openFormModal({
        render: "Transact",
        title: type === "DEPOSIT" ? "New Deposit" : "New Transaction",
        metadata: { type, w_classname: "max-w-screen-lg" },
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
    <div className=" w-full flex flex-col gap-10">
      <div className=" w-full flex justify-center items-center">
        <p className=" font-bold text-center rounded-xl bg-green-500/5 text-green-500 p-4 px-4 lg:px-8 w-fit flex items-center flex-col lg:flex-row gap-2">
          <Landmark /> Hello {user?.first_name}, Welcome to your personalised
          dashboard
        </p>
      </div>

      {/* Metrics */}
      <div className=" space-y-3">
        <div className=" w-full flex justify-end">
          <Button className=" w-fit" onClick={() => transact("DEPOSIT")}>
            New deposit
          </Button>
        </div>
        <div>
          <Refresh isLoading={myAccountLoading} retry={reloadMyAccount} />
          <Loader
            isLoading={myAccountLoading}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {[
              {
                id: "1",
                title: "Balance",
                description: "Available Balance",
                value: currencyFormat(
                  myAccount?.available_balance || 0,
                  myAccount?.currency
                ),
                icon: <CircleDollarSign className=" h-6 w-6" />,
                textClassName: "text-[#00FF00]",
                bgClassName: "bg-[#00FF00]/10",
              },
            ].map((ite) => (
              <PrimaryCardItem key={ite?.id} {...ite} />
            ))}
          </Loader>
        </div>
      </div>

      {/* Recent transactions */}
      <div className=" space-y-6 p-5 bg-secondary/5 rounded-lg">
        <h3 className=" text-center lg:text-left text-xl lgtext-2xl font-bold text-primary">
          Recent Transactions
        </h3>
        <div className=" w-full flex justify-center lg:justify-end">
          <Button className=" w-fit" onClick={() => transact()}>
            New transaction
          </Button>
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
              render: ({
                recipient_account_number,
                recipient_account_name,
              }) => (
                <div>
                  <p className=" capitalize">{recipient_account_name}</p>
                  <span className=" text-xs text-gray-500">
                    Account: | {recipient_account_number}
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
              key: "transaction_type",
              render: ({ transaction_type }) => (
                <p className=" uppercase">{transaction_type}</p>
              ),
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
          showPaginator={false}
          // pagination={pagination}
        />

        <div className=" w-full flex justify-end">
          <Link
            to={"/dashboard/transactions"}
            className=" dark:text-primary text-black border-b border-dotted dark:border-primary border-black px-3"
          >
            See All
          </Link>
        </div>
      </div>
    </div>
  );
}
