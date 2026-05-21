import { useState, useRef, useEffect } from "react";
import {Link} from 'react-router-dom'
import {
  Menu,
  Search,
  Bell,
  X,
  User,
  Settings,
  LogOut,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import useAuth from './../contexts/AuthContext';

export function Navbar({ onMenuToggle, sidebarOpen, collapsed, setCollapsed }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { profile,user ,logout} = useAuth();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="ibi-container-colapsed flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors`}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-accent/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-2 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <span className="text-primary-foreground text-xs font-semibold">
                {user?.name ? user.name.slice(0, 2) : "JD"}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border">
                  <p className="text-sm font-medium text-foreground">
                    {profile?.name || ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || ""}
                  </p>
                </div>
                <div className="py-1">
                  {[
                    { icon: User, label: "My Profile" ,path:"/dashboard/profile"},
                    { icon: Settings, label: "Settings" ,path:"/dashboard/profile"},
                    { icon: HelpCircle, label: "Help & Support" ,path:"/dashboard/profile"},
                  ].map((item, i) => (
                    <Link 
                      to={item.path}
                      key={i}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      <item.icon className="w-4 h-4 text-muted-foreground" />
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-border py-1">
                  <button onClick={()=>logout()} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-accent transition-colors">
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
