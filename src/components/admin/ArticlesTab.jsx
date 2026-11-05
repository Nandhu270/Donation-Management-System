import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function ArticlesTab({ articles, handleDeleteArticle, onOpenModal }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Articles & Educational Content</h3>
          <p className="text-xs text-slate-500">
            Published articles displayed on the Guides & Blog page
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800"
        >
          <FaPlus className="text-[10px]" /> Publish New Article
        </button>
      </div>

      {articles.length === 0 ? (
        <div className="py-12 text-center text-slate-400 text-xs">
          No articles published yet. Click &quot;Publish New Article&quot; to write one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((art) => (
            <div
              key={art._id}
              className="p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-700">{art.category}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{art.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{art.excerpt}</p>
              </div>

              <button
                type="button"
                onClick={() => handleDeleteArticle(art._id)}
                className="p-1.5 rounded text-rose-600 hover:bg-rose-50 shrink-0"
                title="Delete Article"
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

