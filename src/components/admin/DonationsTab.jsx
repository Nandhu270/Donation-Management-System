import React from "react";
import { FaTrash } from "react-icons/fa";

export default function DonationsTab({ donations, handleDeleteDonation }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">Donation Transactions Ledger</h3>
        <p className="text-xs text-slate-500">
          Recorded financial contributions and tax certificate details
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <th className="py-2.5 px-4">Donor Name & Mail</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">Pay Mode</th>
              <th className="py-2.5 px-3">Phone</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {donations.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No donation records found.
                </td>
              </tr>
            ) : (
              donations.map((d) => (
                <tr key={d._id}>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{d.name}</div>
                    <div className="text-slate-400 text-[11px]">{d.mail}</div>
                  </td>
                  <td className="py-3 px-3 font-extrabold text-slate-900">
                    {d.currency} {Number(d.amount).toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3">{d.paytype}</td>
                  <td className="py-3 px-3 text-slate-600">{d.mobile}</td>
                  <td className="py-3 px-3 text-slate-500">
                    {d.createdAt ? new Date(d.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteDonation(d._id)}
                      className="p-1.5 rounded text-rose-600 hover:bg-rose-50"
                      title="Delete Record"
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

