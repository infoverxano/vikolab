import React, { useEffect, useState } from "react";
import { Navbar } from './../components/Navbar';
import { Sidebar } from './../components/Sidebar';
import useAuth from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import '../App.css'
function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { getUser } = useAuth();

  useEffect(() => {
    const infoUser = async () => {
      await getUser()
    }
    infoUser();
  }, [])

  return (
    <div className="dashboard-layout">
      <div className="flex min-h-screen bg-background">
        {/* MOBILE OVERLAY */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
          lg:block ${mobileSidebarOpen ? "block" : "hidden"}
          fixed left-0 top-0 h-full z-50
          transition-all duration-300
          ${sidebarCollapsed ? "w-20" : "w-64"}  
        `}
        >
          <Sidebar
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </div>

        {/* MAIN WRAPPER */}
        <div
          className={`
          w-full transition-all duration-300
          ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"}
        `}
        >
          <Navbar
            onMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            sidebarOpen={mobileSidebarOpen}
            setCollapsed={setSidebarCollapsed}
            collapsed={sidebarCollapsed}
          />

          {/* MAIN CONTENT */}
          <main className="min-h-screen p-4 sm:p-8 font-sans relative overflow-hidden ibi-background-main" >
            <Outlet />

          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


