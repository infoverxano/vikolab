import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./layout/Dashboard";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Unauthorized from "./pages/auth/Unauthorized";
import Home from "./pages/Home";
import Profile from "./pages/settings/Profile";
import Clients from "./pages/clients/Clients";
import { ClinetsProvider } from "./contexts/ClientsContext";
import { ServicesProvider } from "./contexts/ServicesContext";
import { PortfoliosProvider } from "./contexts/PortfoliosContext";
import NewClient from "./pages/clients/NewClient";
import Services from "./pages/services/Services";
import NewService from "./pages/services/NewService";
import NewPortfolio from "./pages/portfolio/NewPortfolio";
import { LanguageProvider } from './contexts/LanguageContext';
import Portfolio from "./pages/portfolio/Portfolio";
import PortfolioView from "./pages/portfolio/PortfolioView";
import EditPortfolio from "./pages/portfolio/EditPortfolio";

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <AuthProvider>
      <LanguageProvider>
        <ClinetsProvider>
          <ServicesProvider>
            <PortfoliosProvider>
              <BrowserRouter>
                <Routes>
                  <Route element={<Dashboard />}>
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <Home />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/profile"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <Profile />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/clients"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <Clients />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/new/client"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <NewClient />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/services"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <Services />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/services/new"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <NewService />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/portfolio"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <Portfolio />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/portfolio/new"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <NewPortfolio />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/portfolio/:id"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <PortfolioView />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/dashboard/portfolio/:id/edit"
                      element={
                        <ProtectedRoute
                          roles={["admin", "super_admin"]}
                        >
                          <EditPortfolio />
                        </ProtectedRoute>
                      } />
                  </Route>
                  <Route path="/" element={<App />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                </Routes>
              </BrowserRouter>
            </PortfoliosProvider>
          </ServicesProvider>
        </ClinetsProvider>
      </LanguageProvider>
    </AuthProvider>

  </StrictMode>,
)
