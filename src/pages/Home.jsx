import React from "react";
const stats = [
  {
    label: "Total Projects",
    value: "12.9K",
    badge: "+2",
    note: "this week",
    icon: "◈",
    color: "from-blue-500/10 to-blue-600/5 border-blue-200/40",
    iconColor: "text-blue-500 bg-blue-500/10",
    badgeColor: "text-blue-600 bg-blue-500/10",
  },
  {
    label: "Active Tasks",
    value: "34.9K",
    badge: "+8",
    note: "due today",
    icon: "◎",
    color: "from-violet-500/10 to-violet-600/5 border-violet-200/40",
    iconColor: "text-violet-500 bg-violet-500/10",
    badgeColor: "text-violet-600 bg-violet-500/10",
  },
  {
    label: "Team Members",
    value: "8K",
    badge: "+2",
    note: "2 online",
    icon: "⬡",
    color: "from-emerald-500/10 to-emerald-600/5 border-emerald-200/40",
    iconColor: "text-emerald-500 bg-emerald-500/10",
    badgeColor: "text-emerald-600 bg-emerald-500/10",
  },
];
function Home() {
  return (
    <>
      {/* STATS */}
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`
        relative overflow-hidden
        rounded-2xl border p-5
        bg-gradient-to-br ${s.color}
        backdrop-blur-md
        hover:scale-[1.02] hover:shadow-lg
        transition-all duration-300
      `}
          >
            {/* Glow orb */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            {/* Top row — icon + badge */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${s.iconColor} backdrop-blur-sm`}
              >
                {s.icon}
              </div>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.badgeColor}`}
              >
                ↑ {s.badge}
                <span className="font-normal opacity-60 ml-0.5">{s.note}</span>
              </span>
            </div>

            {/* Value */}
            <p className="text-[28px] font-bold text-gray-900 leading-none mb-1">
              {s.value}
            </p>

            {/* Label */}
            <p className="text-xs font-medium text-gray-500 tracking-wide">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1 */}
        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/60 backdrop-blur-md shadow-sm p-6 hover:shadow-md hover:bg-white/70 transition-all duration-300">
          {/* Inner glow */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-violet-300/10 rounded-full blur-2xl pointer-events-none" />

          {/* Card header */}
          <div className="flex items-center justify-between mb-5 relative">
            <div>
              <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-widest mb-1">
                Overview
              </p>
              <h2 className="text-base font-semibold text-gray-900">
                Weekly Sales & Revenue
              </h2>
            </div>
            {/* Icon badge */}
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-base">
              ◈
            </div>
          </div>

          {/* Your chart goes here */}
          <div className="relative">
            {/* placeholder — replace with your chart component */}
            <div className="h-48 rounded-xl bg-gradient-to-br from-blue-50/60 to-violet-50/40 border border-blue-100/50 flex items-center justify-center">
              <span className="text-sm text-gray-300 font-medium">
                Chart component
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden rounded-2xl border border-white/70 bg-white/60 backdrop-blur-md shadow-sm p-6 hover:shadow-md hover:bg-white/70 transition-all duration-300">
          {/* Inner glow */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-violet-300/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-emerald-300/10 rounded-full blur-2xl pointer-events-none" />

          {/* Card header */}
          <div className="flex items-center justify-between mb-5 relative">
            <div>
              <p className="text-[11px] font-semibold text-violet-500 uppercase tracking-widest mb-1">
                Analytics
              </p>
              <h2 className="text-base font-semibold text-gray-900">
                Your title here
              </h2>
            </div>
            {/* Icon badge */}
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 text-base">
              ◎
            </div>
          </div>

          {/* Your content goes here */}
          <div className="relative">
            <div className="h-48 rounded-xl bg-gradient-to-br from-violet-50/60 to-pink-50/40 border border-violet-100/50 flex items-center justify-center">
              <span className="text-sm text-gray-300 font-medium">
                Chart component
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
