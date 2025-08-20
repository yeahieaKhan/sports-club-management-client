import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../contextApi/AuthContext";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:8000/payment-history?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return <p className="text-center py-10 font-semibold">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500 font-semibold">
        Failed to load data
      </p>
    );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        💳 Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No payment records found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100">
          <table className="table table-zebra w-full">
            <thead className="bg-primary text-white text-base font-semibold">
              <tr>
                <th>No</th>
                <th>Transaction ID</th>
                <th>Amount (৳)</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id}>
                  <td>{index + 1}</td>
                  <td className="text-blue-600 font-medium">
                    {pay.transactionId}
                  </td>
                  <td>৳{pay.amount}</td>
                  <td>{new Date(pay.paymentDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
