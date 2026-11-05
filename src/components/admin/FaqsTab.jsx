import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function FaqsTab({ faqs, handleDeleteFaq, onOpenModal }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">FAQs Manager</h3>
          <p className="text-xs text-slate-500">
            Add or edit questions displayed on the Contact page
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800"
        >
          <FaPlus className="text-[10px]" /> Add FAQ
        </button>
      </div>

      {faqs.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          No FAQs listed. Click &quot;Add FAQ&quot; to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">{faq.question}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteFaq(faq._id)}
                className="p-1.5 rounded text-rose-600 hover:bg-rose-50 shrink-0"
                title="Delete FAQ"
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

