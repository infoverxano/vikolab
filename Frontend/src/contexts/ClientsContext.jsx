import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const ClientsContext = createContext();

export function ClinetsProvider({ children }) {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(true);

  const getClients = async () => {
    try {
      const res = await api.get("/clients/");
      console.log(res.data);
      if (res.data) {
        setClients(res.data);
      } else {
        setClients(null);
      }
    } catch {
      setClients(null);
    } finally {
      setLoading(false);
    }
  };

  const updateClients = async (id, body) => {
    try {
      setLoading(true); 

      const res = await api.put(`/clients/${id}`, body);
      
      if (res.data) {
        await getClients();
      }
    } catch (error) {
      console.error(error);
      setClients(null);
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (body) => {
    try {
      setLoading(true); 

      const res = await api.post(`/clients`, body);
      
      if (res.data) {
        await getClients();
      }
    } catch (error) {
      console.error(error);
      setClients(null);
    } finally {
      setLoading(false);
    }
  };
  const deleteClient = async (id) => {
    try {
      setLoading(true); 

      const res = await api.delete(`/clients/${id}`);
      
      if (res.data) {
        await getClients();
      }
    } catch (error) {
      console.error(error);
      setClients(null);
    } finally {
      setLoading(false);
    }
  };


  async function uploadToCloudinary(file) {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: fd }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Image upload failed");

    return data.secure_url;
  }
  useEffect(() => {
    getClients();
  }, []);

  return (
    <ClientsContext.Provider value={{
        getClients,
        clients,loading,updateClients,deleteClient,addClient,uploadToCloudinary
    }}>
      {children}
    </ClientsContext.Provider>
  );
}

export default function useClients() {
  return useContext(ClientsContext);
}