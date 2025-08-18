import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../contextApi/AuthContext";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);

  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://sports-club-management-server.vercel.app/payment-history?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center py-10">Failed to load data</p>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Payment History</h2>

      {payments.length === 0 ? (
        <p className="text-center text-gray-500">No payment records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border border-gray-200">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Amount (৳)</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id}>
                  <td>{index + 1}</td>
                  <td className="text-blue-600">{pay.transactionId}</td>
                  <td>{pay.amount}</td>
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
