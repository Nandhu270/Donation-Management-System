import React from "react";
import { FaTrash } from "react-icons/fa";

export default function InquiriesTab({ inquiries, handleDeleteInquiry }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">Contact Inquiries Desk</h3>
        <p className="text-xs text-slate-500">Messages sent via the Contact Us form</p>
      </div>

      {inquiries.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          No inquiries in the inbox.
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq._id}
              className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{inq.name}</span>
                  <span className="text-slate-400">({inq.mail})</span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                    {inq.subject}
                  </span>
                </div>
                <p className="text-slate-700">{inq.msg}</p>
                <span className="text-[11px] text-slate-400">
                  Received: {inq.createdAt ? new Date(inq.createdAt).toLocaleString() : "—"}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteInquiry(inq._id)}
                className="p-2 rounded text-rose-600 hover:bg-rose-50 shrink-0"
                title="Remove Message"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

