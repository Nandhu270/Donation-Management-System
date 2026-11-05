import React from "react";

export default function UsersTab({
  users,
  currentAdmin,
  roleFilter,
  setRoleFilter,
  userSearch,
  setUserSearch,
  userPage,
  setUserPage,
  userPagination,
  handleRoleChange,
  handleUserStatusToggle,
  fetchTabData,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-4 p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">User Directory</h3>
          <p className="text-xs text-slate-500">Manage user roles and toggle active membership</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            {["", "donor", "admin", "user"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRoleFilter(r);
                  setUserPage(1);
                }}
                className={`px-2.5 py-1 rounded transition-colors ${
                  roleFilter === r ? "bg-white font-bold text-slate-900" : "text-slate-600"
                }`}
              >
                {r === "" ? "All" : r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* User Search Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUserPage(1);
              fetchTabData();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search user..."
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-40"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold"
            >
              Search
            </button>
            {userSearch && (
              <button
                type="button"
                onClick={() => {
                  setUserSearch("");
                  setUserPage(1);
                  setTimeout(() => fetchTabData(), 0);
                }}
                className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <th className="py-2.5 px-4">User</th>
              <th className="py-2.5 px-3">Blood</th>
              <th className="py-2.5 px-3">Role</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  No users found matching your criteria.
                </td>
              </tr>
            ) : (
              users.map((u) => {
                const isSelf = u._id === currentAdmin?._id;
                const isActive = u.isActive !== false;

                return (
                  <tr key={u._id}>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{u.name}</div>
                      <div className="text-slate-400 text-[11px]">
                        {u.mail} • Ph: {u.mobile}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">{u.blood || "—"}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          u.role === "admin"
                            ? "bg-amber-100 text-amber-800"
                            : u.role === "donor"
                            ? "bg-red-100 text-red-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isActive ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {isActive ? "Active" : "Deactivated"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1.5">
                      <select
                        disabled={isSelf}
                        value={u.role || "user"}
                        onChange={(e) => handleRoleChange(u._id, u.name, e.target.value)}
                        className="text-[11px] border border-slate-200 rounded px-1.5 py-1 bg-white"
                      >
                        <option value="user">User</option>
                        <option value="donor">Donor</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        type="button"
                        disabled={isSelf}
                        onClick={() => handleUserStatusToggle(u._id, u.name, isActive)}
                        className={`px-2 py-1 rounded text-[11px] border ${
                          isActive ? "text-rose-700 bg-rose-50" : "text-emerald-700 bg-emerald-50"
                        }`}
                      >
                        {isActive ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {userPagination?.totalPages > 1 && (
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
          <span className="text-slate-500">
            Page {userPage} of {userPagination.totalPages} ({userPagination.total} total)
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={userPage <= 1}
              onClick={() => setUserPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 border rounded text-slate-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={userPage >= userPagination.totalPages}
              onClick={() => setUserPage((p) => p + 1)}
              className="px-2.5 py-1 border rounded text-slate-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

