import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function CampaignsTab({ campaigns, handleDeleteCampaign, onOpenModal }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Medical Relief Campaigns</h3>
          <p className="text-xs text-slate-500">
            Causes listed on the Home overview with live progress bars
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800"
        >
          <FaPlus className="text-[10px]" /> Add Campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          No relief campaigns listed. Click &quot;Add Campaign&quot; to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((camp) => (
            <div
              key={camp._id}
              className="p-4 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {camp.focus}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{camp.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{camp.desc}</p>
                <div className="text-xs font-medium text-slate-700 pt-1">
                  Raised: <strong>₹{Number(camp.raised).toLocaleString("en-IN")}</strong> / Goal: ₹
                  {Number(camp.goal).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{camp.beneficiaries}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteCampaign(camp._id)}
                  className="p-1.5 rounded text-rose-600 hover:bg-rose-50"
                  title="Delete Campaign"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

