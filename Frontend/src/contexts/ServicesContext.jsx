// frontend/contexts/ServicesContext.jsx
import { createContext, useContext, useState, useCallback } from "react";

const ServicesContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function ServicesProvider({ children }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState(null);

  // Better Auth uses an httpOnly session cookie.
  // credentials: "include" sends it automatically — no Bearer token needed.
  const jsonHeaders = () => ({ "Content-Type": "application/json" });

  // ── CRUD ──────────────────────────────────────────────────────────────────

  /** GET /api/services */
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/services`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setServices(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** POST /api/services — userId is set server-side from req.user.id */
  const addService = useCallback(async (payload) => {
    const res = await fetch(`${API_BASE}/api/services`, {
      method:      "POST",
      credentials: "include",
      headers:     jsonHeaders(),
      body:        JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    const created = await res.json();
    setServices((prev) => [created, ...prev]);
    return created;
  }, []);

  /** PUT /api/services/:id */
  const updateService = useCallback(async (id, payload) => {
    const res = await fetch(`${API_BASE}/api/services/${id}`, {
      method:      "PUT",
      credentials: "include",
      headers:     jsonHeaders(),
      body:        JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    const updated = await res.json();
    setServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
    return updated;
  }, []);

  /** DELETE /api/services/:id */
  const deleteService = useCallback(async (id) => {
    const res = await fetch(`${API_BASE}/api/services/${id}`, {
      method:      "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error(await res.text());
    setServices((prev) => prev.filter((s) => s.id !== id));
  }, []);


  return (
    <ServicesContext.Provider
      value={{ services, loading, error, fetchServices, addService, updateService, deleteService }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export default function useServices() {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error("useServices must be used inside <ServicesProvider>");
  return ctx;
}