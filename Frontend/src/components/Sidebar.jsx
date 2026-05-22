// import { useState } from "react";
// import useAuth from './../contexts/AuthContext';
// import { Link } from 'react-router-dom';
// import {
//   Home,
//   Settings,
//   Users,
//   BarChart3,
//   Folder,
//   MessageSquare,
//   Bell,
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   UserCheck,
//   UserPlus,
//   Shield,
//   ChevronDown,
//   FolderOpenDot,
//   LayersPlus
// } from "lucide-react";

// const menuItems = [
//   { icon: Home, label: "Dashboard", href: "/dashboard" },
//   { icon: BarChart3, label: "Analytics", href: "/analytics" },
//   { icon: Users, label: "Clients", href: "#clients" },
//   { icon: Folder, label: "Services", href: "#projects" },
//   { icon: Folder, label: "Portfolio", href: "#portfolio" },
//   // { icon: MessageSquare, label: "Messages", href: "/messages" },
//   // { icon: Bell, label: "Notifications", href: "/notifications" },
// ];

// const clientSubItems = [
//   { icon: UserCheck, label: "All", href: "/dashboard/clients" },
//   { icon: UserPlus, label: "New", href: "/dashboard/new/client" },
//   // { icon: Shield, label: "Roles", href: "/team/roles" },
// ];


// const projectsSubItems = [
//   { icon: FolderOpenDot, label: "All", href: "/dashboard/services" },
//   { icon: LayersPlus, label: "New", href: "/dashboard/service/new" }
// ];

// const portfoliosSubItems = [
//   { icon: FolderOpenDot, label: "All", href: "/dashboard/portfolio" },
//   { icon: LayersPlus, label: "New", href: "/dashboard/portfolio/new" }
// ];

// export function Sidebar({ collapsed, setCollapsed }) {
//   // const [isCollapsed, setIsCollapsed] = useState(false);
//   const [activeItem, setActiveItem] = useState("/");
//   const [teamOpen, setTeamOpen] = useState(false);
//   const [projectOpen, setProjectOpen] = useState(false);
//   const [portfolioOpen, setPortfolioOpen] = useState(false);
//   const { user, logout } = useAuth();

//   return (
//     <aside
//       className={`ib-sidebar fixed h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
//         collapsed ? "w-16" : "w-60"
//       }`}
//     >
//       {/* Logo */}
//       <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
//         <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
//           <span className="text-sidebar-primary-foreground font-bold text-sm">
//             P
//           </span>
//         </div>
//         {!collapsed && (
//           <span className="font-semibold text-sidebar-foreground">
//             ProSidebar
//           </span>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-3 py-2 space-y-1">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isTeam = item.href === "#clients";
//           const isProject = item.href === "#projects";
//           const isPortfolio = item.href === "#portfolio";
//           // const isActive = activeItem === item.href;
//           const isActive =
//             activeItem === item.href ||
//             (isTeam && clientSubItems.some((s) => activeItem === s.href)) || (isProject && projectsSubItems.some((s) => activeItem === s.href)) || (isPortfolio && portfoliosSubItems.some((s) => activeItem === s.href));

//           return (
//             <div key={item.href}>
//               <Link
//               to={item.href}
//                 onClick={() => {
//                   if (isTeam && !collapsed) {
//                     setTeamOpen(!teamOpen);
//                   } else {
//                     setActiveItem(item.href);
//                   }
//                   if (isProject && !collapsed) {
//                     setProjectOpen(!projectOpen);
//                   } else {
//                     setProjectOpen(item.href);
//                   }
//                   if (isPortfolio && !collapsed) {
//                     setPortfolioOpen(!portfolioOpen);
//                   } else {
//                     setPortfolioOpen(item.href);
//                   }
//                 }}
//                 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
//                   isActive
//                     ? "bg-sidebar-accent text-sidebar-foreground font-medium"
//                     : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
//                 } ${collapsed ? "justify-center" : ""}`}
//               >
//                 <Icon
//                   className={`w-5 h-5 shrink-0 ${isActive ? "text-sidebar-primary" : ""}`}
//                 />
//                 {!collapsed && (
//                   <>
//                     <span className="text-sm flex-1 text-left">
//                       {item.label}
//                     </span>
//                     {isTeam && (
//                       <ChevronDown
//                         className={`w-4 h-4 shrink-0 transition-transform duration-200 ${teamOpen ? "rotate-180" : ""}`}
//                       />
//                     )}
//                     {isProject && (
//                       <ChevronDown
//                         className={`w-4 h-4 shrink-0 transition-transform duration-200 ${projectOpen ? "rotate-180" : ""}`}
//                       />
//                     )}
//                   </>
//                 )}
//               </Link>
//               {isTeam && teamOpen && !collapsed && (
//                 <div className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
//                   {clientSubItems.map((sub) => {
//                     const SubIcon = sub.icon;
//                     const isSubActive = activeItem === sub.href;
//                     return (
//                       <Link
//                         key={sub.href}
//                         to={sub.href}
//                         onClick={() => setActiveItem(sub.href)}
//                         className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
//                           isSubActive
//                             ? "bg-sidebar-accent text-sidebar-foreground font-medium"
//                             : "text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground"
//                         }`}
//                       >
//                         <SubIcon
//                           className={`w-4 h-4 shrink-0 ${isSubActive ? "text-sidebar-primary" : ""}`}
//                         />
//                         <span>{sub.label}</span>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//               {isProject && projectOpen && !collapsed && (
//                 <div className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
//                   {projectsSubItems.map((sub) => {
//                     const SubIcon = sub.icon;
//                     const isSubActive = activeItem === sub.href;
//                     return (
//                       <Link
//                         key={sub.href}
//                         to={sub.href}
//                         onClick={() => setActiveItem(sub.href)}
//                         className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
//                           isSubActive
//                             ? "bg-sidebar-accent text-sidebar-foreground font-medium"
//                             : "text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground"
//                         }`}
//                       >
//                         <SubIcon
//                           className={`w-4 h-4 shrink-0 ${isSubActive ? "text-sidebar-primary" : ""}`}
//                         />
//                         <span>{sub.label}</span>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//               {isPortfolio && portfolioOpen && !collapsed && (
//                 <div className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
//                   {portfoliosSubItems.map((sub) => {
//                     const SubIcon = sub.icon;
//                     const isSubActive = activeItem === sub.href;
//                     return (
//                       <Link
//                         key={sub.href}
//                         to={sub.href}
//                         onClick={() => setActiveItem(sub.href)}
//                         className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
//                           isSubActive
//                             ? "bg-sidebar-accent text-sidebar-foreground font-medium"
//                             : "text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground"
//                         }`}
//                       >
//                         <SubIcon
//                           className={`w-4 h-4 shrink-0 ${isSubActive ? "text-sidebar-primary" : ""}`}
//                         />
//                         <span>{sub.label}</span>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* Settings */}
//       <div className="px-3 py-2 border-t border-sidebar-border">
//         <button
//           onClick={() => setActiveItem("/settings")}
//           className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
//             activeItem === "/settings"
//               ? "bg-sidebar-accent text-sidebar-foreground font-medium"
//               : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
//           } ${collapsed ? "justify-center" : ""}`}
//         >
//           <Settings
//             className={`w-5 h-5 shrink-0 ${activeItem === "/settings" ? "text-sidebar-primary" : ""}`}
//           />
//           {!collapsed && <span className="text-sm">Settings</span>}
//         </button>
//       </div>

//       {/* User */}
//       <div className="p-3 border-t border-sidebar-border">
//         <div
          
//           className={`flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer ${collapsed ? "justify-center" : ""}`}
//         >
//           <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center shrink-0">
//             <span className="text-sidebar-primary-foreground text-xs font-medium">
//               {user?.name ? user.name.slice(0, 2) : "JD"}
//             </span>
//           </div>
//           {!collapsed && (
//             <>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-sidebar-foreground font truncate">
//                   {user?.name || ""}
//                 </p>
//                 <p className="text-xs text-sidebar-foreground/50 truncate">
//                   {user?.email || ""}
//                 </p>
//               </div>
//               <LogOut onClick={()=>logout()} className="w-4 h-4 text-sidebar-foreground/40" />
//             </>
//           )}
//         </div>
//       </div>

//       {/* Collapse Toggle */}
//       <div className="p-3 border-t border-sidebar-border">
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
//         >
//           {collapsed ? (
//             <ChevronRight className="w-4 h-4" />
//           ) : (
//             <>
//               <ChevronLeft className="w-4 h-4" />
//               <span className="text-sm">Collapse</span>
//             </>
//           )}
//         </button>
//       </div>
//     </aside>
//   );
// }


import { useState } from "react";
import useAuth from './../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Home,
  Settings,
  Users,
  BarChart3,
  Folder,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCheck,
  UserPlus,
  ChevronDown,
  FolderOpenDot,
  LayersPlus,
  Briefcase,
} from "lucide-react";

const clientSubItems = [
  { icon: UserCheck, label: "All",  href: "/dashboard/clients" },
  { icon: UserPlus,  label: "New",  href: "/dashboard/new/client" },
];

const projectsSubItems = [
  { icon: FolderOpenDot, label: "All", href: "/dashboard/services" },
  { icon: LayersPlus,    label: "New", href: "/dashboard/services/new" },
];

const portfoliosSubItems = [
  { icon: FolderOpenDot, label: "All", href: "/dashboard/portfolio" },
  { icon: LayersPlus,    label: "New", href: "/dashboard/portfolio/new" },
];

// Top-level menu items
// type: "link" → plain navigation
// type: "group" → toggleable with sub-items
const menuItems = [
  { icon: Home,     label: "Dashboard", href: "/dashboard",  type: "link" },
  // { icon: BarChart3,label: "Analytics", href: "/analytics",  type: "link" },
  { icon: Users,    label: "Clients",   key: "clients",      type: "group", subItems: clientSubItems },
  { icon: Folder,   label: "Services",  key: "projects",     type: "group", subItems: projectsSubItems },
  { icon: Briefcase,label: "Portfolio", key: "portfolio",    type: "group", subItems: portfoliosSubItems },
];

export function Sidebar({ collapsed, setCollapsed }) {
  const [activeItem,  setActiveItem]  = useState("/dashboard");
  const [openGroup,   setOpenGroup]   = useState(null); // key of open group
  const { user, logout } = useAuth();

  const toggleGroup = (key) =>
    setOpenGroup((prev) => (prev === key ? null : key));

  return (
    <aside
      className={`ib-sidebar fixed h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
          <span className="text-sidebar-primary-foreground font-bold text-sm">P</span>
        </div>
        {!collapsed && (
          <span className="font-semibold text-sidebar-foreground">ProSidebar</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.type === "link") {
            const isActive = activeItem === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setActiveItem(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-sidebar-primary" : ""}`} />
                {!collapsed && <span className="text-sm flex-1 text-left">{item.label}</span>}
              </Link>
            );
          }

          // type === "group"
          const isOpen     = openGroup === item.key;
          const isActive   = item.subItems.some((s) => activeItem === s.href);

          return (
            <div key={item.key}>
              {/* Group header button */}
              <button
                onClick={() => !collapsed && toggleGroup(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                    : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-sidebar-primary" : ""}`} />
                {!collapsed && (
                  <>
                    <span className="text-sm flex-1 text-left">{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              </button>

              {/* Sub-items */}
              {isOpen && !collapsed && (
                <div className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
                  {item.subItems.map((sub) => {
                    const SubIcon   = sub.icon;
                    const isSubActive = activeItem === sub.href;
                    return (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        onClick={() => setActiveItem(sub.href)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                          isSubActive
                            ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                            : "text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                        }`}
                      >
                        <SubIcon className={`w-4 h-4 shrink-0 ${isSubActive ? "text-sidebar-primary" : ""}`} />
                        <span>{sub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 py-2 border-t border-sidebar-border">
        <button
          onClick={() => setActiveItem("/settings")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            activeItem === "/settings"
              ? "bg-sidebar-accent text-sidebar-foreground font-medium"
              : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          } ${collapsed ? "justify-center" : ""}`}
        >
          <Settings className={`w-5 h-5 shrink-0 ${activeItem === "/settings" ? "text-sidebar-primary" : ""}`} />
          {!collapsed && <span className="text-sm">Settings</span>}
        </button>
      </div>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <div
          className={`flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center shrink-0">
            <span className="text-sidebar-primary-foreground text-xs font-medium">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "JD"}
            </span>
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name || ""}
                </p>
                <p className="text-xs text-sidebar-foreground/50 truncate">
                  {user?.email || ""}
                </p>
              </div>
              <LogOut
                onClick={() => logout()}
                className="w-4 h-4 text-sidebar-foreground/40 hover:text-red-400 transition-colors"
              />
            </>
          )}
        </div>
      </div>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}