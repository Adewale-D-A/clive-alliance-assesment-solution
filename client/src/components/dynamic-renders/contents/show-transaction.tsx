import useGetATransaction from "../../../hooks/services/GET/transactions/transaction";
import { useAppSelector } from "../../../stores/store-hooks";
import currencyFormat from "../../../utils/currency-formatter";
import formatDate from "../../../utils/dates/isoDateConverter";
import Loader from "../../loader";

export default function ShowTransaction() {
  const { metadata } = useAppSelector((state) => state.formModal.value);

  const { data, isLoading } = useGetATransaction(metadata?.id);
  return (
    <Loader isLoading={isLoading}>
      {" "}
      <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition">
        <div>
          <p className="text-lg font-semibold text-gray-900">
            {data?.description}
          </p>
          <p className="text-sm text-gray-500">
            {formatDate(data?.created_at || "")}
          </p>
          <p className="text-sm text-gray-400">
            <b>Account:</b> {data?.recipient_account_number}
          </p>
          <p className="text-sm text-gray-400">
            <b>Account Name:</b> {data?.recipient_account_name}
          </p>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-sm font-medium`}>
            {data?.transaction_type}
          </span>
          <p className="text-xl font-bold mt-2 text-gray-800">
            {currencyFormat(data?.amount, "USD")}
          </p>
        </div>
      </div>
    </Loader>
  );
}
