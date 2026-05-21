import { useState } from "react";
import useAuth from './../../contexts/AuthContext';

const PERMISSIONS = [
  "View Projects",
  "Edit Projects",
  "Delete Projects",
  "Manage Team",
  "View Analytics",
  "Export Reports",
  "Admin Settings",
  "Billing Access",
];

const stats = [
  { label: "Total Projects", value: "12.9K", badge: "+2", note: "this week" },
  { label: "Active Tasks", value: "34.9K", badge: "+8", note: "due today" },
  { label: "Team Members", value: "8K", badge: "+2", note: "2 online" },
];

const activityLog = [
  { action: "Created project", target: "Marketing Campaign Q2", time: "2h ago" },
  { action: "Completed task", target: "Design system update", time: "5h ago" },
  { action: "Added member", target: "Sara Johnson to Dev Team", time: "1d ago" },
  { action: "Uploaded file", target: "Q1_Report_Final.pdf", time: "2d ago" },
  { action: "Sent message", target: "Backend Team channel", time: "3d ago" },
];

const defaultForm = {
  name: "Ayoub Ibi",
  email: "ayoub@gmail.com",
  role: "Senior Developer",
  location: "Casablanca, Morocco",
  website: "ayoubibi.dev",
};

const defaultPermissions = [
  "View Projects",
  "Edit Projects",
  "View Analytics",
  "Export Reports",
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [draft, setDraft] = useState(defaultForm);
  // const [permissions, setPermissions] = useState(defaultPermissions);
  const [draftPermissions, setDraftPermissions] = useState(defaultPermissions);
  const { user, role, permissions } = useAuth();

  const tabs = ["overview", "activity", "settings"];

  const handleChange = (e) => {
    setDraft((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePermission = (perm) => {
    setDraftPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSave = () => {
    setForm(draft);
    // setPermissions(draftPermissions);
    setEditMode(false);
  };

  const handleCancel = () => {
    setDraft(user);
    setDraftPermissions(permissions);
    setEditMode(false);
  };

  const startEdit = () => {
    setDraft(user);
    setDraftPermissions(permissions);
    setEditMode(true);
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage your personal information and permissions
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold select-none">
              {initials}
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-white" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
              <span className="text-xs bg-blue-50 text-blue-600 font-medium px-2.5 py-0.5 rounded-full border border-blue-100">
                {form.role}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{user?.email}</p>
            <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-gray-400">
              {form.location && (
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {form.location}
                </span>
              )}
              {form.website && (
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  {form.website}
                </span>
              )}
            </div>
          </div>

          {/* Edit / Cancel button */}
          <button
            onClick={editMode ? handleCancel : startEdit}
            className={`self-start sm:self-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              editMode
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {s.badge}
              </span>
              <p className="text-xs text-gray-400 mt-1">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Panel */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-gray-100 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 mr-6 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Overview — View Mode ── */}
        {activeTab === "overview" && !editMode && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Personal Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Personal Information</h3>
              <ul className="space-y-4">
                {[
                  { label: "Name", value: user?.name },
                  { label: "Email", value: user?.email },
                  { label: "Role", value: role },
                  { label: "Location", value: user.country },
                  { label: "Website", value: user.website },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <span className="text-xs text-gray-400 w-16 flex-shrink-0 pt-0.5">{item.label}</span>
                    <span className="text-sm text-gray-700 break-all">{item.value || "—"}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Permissions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Permissions</h3>
              <div className="flex flex-wrap gap-2">
                {permissions.map((perm) => {
                  const active = permissions.includes(perm);
                  return (
                    <span
                      key={perm}
                      className={`text-xs font-medium px-3 py-1.5 rounded-xl border ${
                        active
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-gray-50 text-gray-400 border-gray-100"
                      }`}
                    >
                      {active && <span className="mr-1 text-green-500">✓</span>}
                      {perm}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Overview — Edit Mode ── */}
        {activeTab === "overview" && editMode && (
          <div className="p-6">
            {/* Fields */}
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Role", name: "role", type: "text" },
                { label: "Location", name: "country", type: "text" },
                { label: "Website", name: "website", type: "text" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={draft[field.name]}
                    onChange={handleChange}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition"
                  />
                </div>
              ))}
            </div>

            {/* Permissions Editor */}
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Permissions</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {PERMISSIONS.map((perm) => {
                const active = draftPermissions.includes(perm);
                return (
                  <button
                    key={perm}
                    type="button"
                    onClick={() => togglePermission(perm)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-xl border transition-all ${
                      active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-500"
                    }`}
                  >
                    {perm}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mb-6">Click a permission to toggle it on or off.</p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── Activity Tab ── */}
        {activeTab === "activity" && (
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Activity</h3>
            <ul className="divide-y divide-gray-50">
              {activityLog.map((item, i) => (
                <li key={i} className="flex items-center justify-between py-3.5 gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <p className="text-sm text-gray-600 truncate">
                      <span className="text-gray-800 font-medium">{item.action}</span>
                      {" — "}
                      {item.target}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Settings Tab ── */}
        {activeTab === "settings" && (
          <div className="p-6 space-y-5">
            <h3 className="text-sm font-semibold text-gray-700">Preferences</h3>
            {[
              { label: "Email Notifications", desc: "Receive updates about your projects", on: true },
              { label: "Two-Factor Authentication", desc: "Add an extra layer of security", on: false },
              { label: "Public Profile", desc: "Allow others to view your profile", on: true },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
                <ToggleSwitch defaultOn={item.on} />
              </div>
            ))}
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Danger Zone</h3>
              <button className="text-sm text-red-500 border border-red-100 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition font-medium">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ToggleSwitch({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${
        on ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}