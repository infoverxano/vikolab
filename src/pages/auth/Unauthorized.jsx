import React, { useEffect } from "react";
import useAuth from "../../contexts/AuthContext";

export default function Unauthorized() {
  const { getUser } = useAuth();

  useEffect(() => {
    const infoUser = async () => {
      await getUser();
    };
    infoUser(); 
  }, []);
  return <h1>403 - You are not allowed to access this page</h1>;
}
