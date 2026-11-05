import React from "react";
import { FaTimes } from "react-icons/fa";

export default function ArticleModal({
  articleForm,
  setArticleForm,
  handleCreateArticle,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Publish Article</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleCreateArticle} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Title *</label>
            <input
              type="text"
              required
              value={articleForm.title}
              onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
              placeholder="e.g. Clinical Importance of Regular Platelet Donations"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={articleForm.category}
                onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="Transfusion Science">Transfusion Science</option>
                <option value="Donor Guidelines">Donor Guidelines</option>
                <option value="Patient Impact">Patient Impact</option>
                <option value="Emergency Care">Emergency Care</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Read Time</label>
              <input
                type="text"
                value={articleForm.readTime}
                onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                placeholder="e.g. 5 min read"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Image URL</label>
            <input
              type="text"
              value={articleForm.image}
              onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Excerpt / Summary *</label>
            <textarea
              rows={2}
              required
              value={articleForm.excerpt}
              onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
              placeholder="Brief summary displayed on cards..."
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
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

