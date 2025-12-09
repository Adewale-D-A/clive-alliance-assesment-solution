import { CircleDollarSign, Hash, PiggyBank, User } from "lucide-react";
import PrimaryCardItem from "../../../components/cards";
import currencyFormat from "../../../utils/currency-formatter";
import { Button } from "../../../components/_shared/button";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../stores/store-hooks";
import { openFormModal } from "../../../stores/features/services/form-modal";
import useGetMyAccount from "../../../hooks/services/GET/accounts/account";
import Loader from "../../../components/loader";
import Refresh from "../../../components/_shared/button/refresh";

export default function DashboardAccounts() {
  const dispatch = useAppDispatch();
  const {
    data: myAccount,
    isLoading: isAccountLoading,
    retryFunction,
  } = useGetMyAccount();
  const { user } = useAppSelector((state) => state.auth.value);

  const deposit = useCallback(() => {
    dispatch(
      openFormModal({
        render: "Transact",
        title: "New Deposit",
        metadata: { type: "DEPOSIT", w_classname: "max-w-screen-lg" },
      })
    );
  }, []);
  return (
    <div className=" w-full flex flex-col gap-10">
      <div className=" w-full flex justify-center items-center">
        <p className=" font-bold text-center rounded-xl bg-purple-500/5 text-purple-500 p-4 px-8 w-fit flex items-center gap-2">
          <PiggyBank /> My Account Statement
        </p>
      </div>

      {/* Metrics */}
      <div className=" space-y-4">
        <div className=" w-full flex justify-center lg:justify-end">
          <Button className="w-full lg:w-fit" onClick={deposit}>
            New deposit
          </Button>
        </div>
        <div>
          <Refresh isLoading={isAccountLoading} retry={retryFunction} />
          <Loader
            isLoading={isAccountLoading}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4"
          >
            {[
              {
                id: "1",
                title: "Balance",
                description: "Available Balance",
                value: currencyFormat(
                  myAccount?.available_balance,
                  myAccount?.currency
                ),
                icon: <CircleDollarSign className=" h-6 w-6" />,
                textClassName: "text-[#00FF00]",
                bgClassName: "bg-[#00FF00]/10",
              },
              {
                id: "2",
                title: "User",
                description: `My Profile`,
                value: user?.first_name + " " + user?.last_name,
                icon: <User className=" h-6 w-6" />,
                textClassName: "text-[#3498DB]",
                bgClassName: "bg-[#3498DB]/10",
              },
              {
                id: "3",
                title: "Account",
                description: `Account Type (${myAccount?.account_type})`,
                value: "Acc No" + " " + String(myAccount?.account_number || ""),
                icon: <Hash className=" h-6 w-6" />,
                textClassName: "text-[#B8860B]",
                bgClassName: "bg-[#B8860B]/10",
              },
            ].map((ite) => (
              <PrimaryCardItem key={ite?.id} {...ite} />
            ))}
          </Loader>
        </div>
      </div>
    </div>
  );
}
