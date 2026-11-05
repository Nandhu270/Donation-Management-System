import React from "react";

export default function OverviewTab({ stats, setActiveTab }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Total Users</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {stats?.totalUsers ?? "-"}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Registered Donors</span>
          <div className="text-2xl font-extrabold text-red-700 mt-1">
            {stats?.totalDonors ?? "-"}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Total Funds Collected</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {stats?.totalDonationAmount != null
              ? `₹${Number(stats.totalDonationAmount).toLocaleString("en-IN")}`
              : "-"}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs">
          <span className="text-xs font-medium text-slate-500">Contact Inquiries</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            {stats?.contactInquiries ?? "-"}
          </div>
        </div>
      </div>

      {/* Content summary shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Hospital Cases
          </span>
          <div className="text-xl font-bold text-slate-900">
            {stats?.emergencyRequests ?? 0} Listed
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className="text-xs font-semibold text-red-700 hover:text-red-800"
          >
            Manage Requests →
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Relief Campaigns
          </span>
          <div className="text-xl font-bold text-slate-900">
            {stats?.campaignsCount ?? 0} Active
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("campaigns")}
            className="text-xs font-semibold text-red-700 hover:text-red-800"
          >
            Manage Campaigns →
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Published Articles
          </span>
          <div className="text-xl font-bold text-slate-900">
            {stats?.articlesCount ?? 0} Posts
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("articles")}
            className="text-xs font-semibold text-red-700 hover:text-red-800"
          >
            Manage Articles →
          </button>
        </div>
      </div>
    </div>
  );
}

