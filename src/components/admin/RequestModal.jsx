import React from "react";
import { FaTimes } from "react-icons/fa";

export default function RequestModal({
  requestForm,
  setRequestForm,
  handleCreateRequest,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Add Hospital Emergency Request</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hospital Name *</label>
            <input
              type="text"
              required
              value={requestForm.hospital}
              onChange={(e) => setRequestForm({ ...requestForm, hospital: e.target.value })}
              placeholder="e.g. Apollo Hospital"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City / Location *</label>
              <input
                type="text"
                required
                value={requestForm.location}
                onChange={(e) => setRequestForm({ ...requestForm, location: e.target.value })}
                placeholder="e.g. Chennai, TN"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Blood Group *</label>
              <select
                value={requestForm.blood}
                onChange={(e) => setRequestForm({ ...requestForm, blood: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              >
                {["A+ve", "A-ve", "B+ve", "B-ve", "O+ve", "O-ve", "AB+ve", "AB-ve"].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Patient Details *</label>
            <input
              type="text"
              required
              value={requestForm.patient}
              onChange={(e) => setRequestForm({ ...requestForm, patient: e.target.value })}
              placeholder="e.g. Pediatric Cardiac Surgery"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Urgency Level</label>
              <select
                value={requestForm.urgency}
                onChange={(e) => setRequestForm({ ...requestForm, urgency: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="Immediate">Immediate</option>
                <option value="Critical">Critical</option>
                <option value="Within 4 Hours">Within 4 Hours</option>
                <option value="Within 6 Hours">Within 6 Hours</option>
                <option value="Within 12 Hours">Within 12 Hours</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Units Required</label>
              <input
                type="number"
                min="1"
                value={requestForm.unitsRequired}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, unitsRequired: Number(e.target.value) || 1 })
                }
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
            <input
              type="text"
              value={requestForm.contactPhone}
              onChange={(e) => setRequestForm({ ...requestForm, contactPhone: e.target.value })}
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
              Save Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

