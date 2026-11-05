import React from "react";
import { FaTimes } from "react-icons/fa";

export default function CampaignModal({
  campaignForm,
  setCampaignForm,
  handleCreateCampaign,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Add Medical Relief Campaign</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleCreateCampaign} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Campaign Title *</label>
            <input
              type="text"
              required
              value={campaignForm.title}
              onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
              placeholder="e.g. Emergency Pediatric Cardiac Aid"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Focus / Category *</label>
              <input
                type="text"
                required
                value={campaignForm.focus}
                onChange={(e) => setCampaignForm({ ...campaignForm, focus: e.target.value })}
                placeholder="e.g. Child Healthcare"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Goal (₹) *</label>
              <input
                type="number"
                min="1"
                required
                value={campaignForm.goal}
                onChange={(e) => setCampaignForm({ ...campaignForm, goal: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
            <input
              type="text"
              value={campaignForm.image}
              onChange={(e) => setCampaignForm({ ...campaignForm, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Beneficiaries Tag</label>
            <input
              type="text"
              value={campaignForm.beneficiaries}
              onChange={(e) => setCampaignForm({ ...campaignForm, beneficiaries: e.target.value })}
              placeholder="e.g. 15 pediatric surgeries supported"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description *</label>
            <textarea
              rows={2}
              required
              value={campaignForm.desc}
              onChange={(e) => setCampaignForm({ ...campaignForm, desc: e.target.value })}
              placeholder="Provide a brief clinical summary of the campaign cause..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

