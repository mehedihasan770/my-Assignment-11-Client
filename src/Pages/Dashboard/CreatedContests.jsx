import React from "react";

const CreatedContests = ({ contests = [], onEdit, onDelete, onViewSubmissions }) => {
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        My Created Contests
      </h2>
      <table className="min-w-full bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, index) => (
            <tr key={contest._id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{contest.name}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    contest.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : contest.status === "Confirmed"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {contest.status}
                </span>
              </td>
              <td className="px-4 py-2 flex gap-2">
                {contest.status === "Pending" && (
                  <>
                    <button
                      onClick={() => onEdit(contest._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(contest._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
                <button
                  onClick={() => onViewSubmissions(contest._id)}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  See Submissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatedContests;