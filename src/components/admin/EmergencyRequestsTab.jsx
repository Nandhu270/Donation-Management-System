import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function EmergencyRequestsTab({
  emergencyRequests,
  handleToggleRequest,
  handleDeleteRequest,
  onOpenModal,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Hospital Emergency Requests</h3>
          <p className="text-xs text-slate-500">
            Cases displayed live on the Home page and Find Donors section
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800"
        >
          <FaPlus className="text-[10px]" /> Add Emergency Request
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <th className="py-2.5 px-4">Hospital & Location</th>
              <th className="py-2.5 px-3">Blood Group</th>
              <th className="py-2.5 px-3">Patient Case</th>
              <th className="py-2.5 px-3">Urgency</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {emergencyRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No emergency hospital requests found. Click &quot;Add Emergency Request&quot; to publish one.
                </td>
              </tr>
            ) : (
              emergencyRequests.map((req) => (
                <tr key={req._id}>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{req.hospital}</div>
                    <div className="text-slate-400 text-[11px]">{req.location}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold px-2 py-0.5 rounded bg-red-50 text-red-700">
                      {req.blood}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700">{req.patient}</td>
                  <td className="py-3 px-3 font-semibold text-slate-600">{req.urgency}</td>
                  <td className="py-3 px-3">
                    <button
                      type="button"
                      onClick={() => handleToggleRequest(req._id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        req.isActive !== false
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {req.isActive !== false ? "Active (Live)" : "Fulfilled / Closed"}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteRequest(req._id)}
                      className="p-1.5 rounded text-rose-600 hover:bg-rose-50"
                      title="Delete"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

