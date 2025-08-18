import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../pages/loading/Loading";
import axios from "axios";

const UserMemberAnnounce = () => {
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get(
        "https://sports-club-management-server.vercel.app/announcements"
      );
      return res.data;
    },
  });
  if (isLoading) {
    <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        📢 All Announcements
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-xl bg-base-100">
        <table className="table table-zebra table-lg w-full">
          <thead className="bg-primary text-white text-base">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Message</th>
              <th>Posted By</th>
              <th>Posted At</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{item.title}</td>
                <td>{item.message}</td>
                <td>
                  <span className="badge badge-outline badge-info">
                    {item.postedBy}
                  </span>
                </td>
                <td>
                  {new Date(item.postedAt || item.posted_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {announcements.length === 0 && (
          <p className="text-center py-6 text-gray-400">
            No announcements found.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserMemberAnnounce;
