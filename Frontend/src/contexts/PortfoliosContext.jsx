

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import api from "../api/axios";
const PortfoliosContext = createContext();
export function PortfoliosProvider({
  children,
}) {
  const [portfolios, setPortfolios] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // ── GET PORTFOLIOS ─────────────────────────────
  const fetchPortfolios = useCallback(
    async () => {
      setLoading(true);

      setError(null);

      try {
        const res = await api.get(
          "/portfolios"
        );
        console.log("portfolios:",res.data)

        setPortfolios(res.data);

        return res.data;
      } catch (err) {
        console.log(err);

        setError(
          err.response?.data ||
            err.message
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ── ADD PORTFOLIO ──────────────────────────────
  const addPortfolio = useCallback(
    async (payload) => {
      try {
        const res = await api.post(
          "/portfolios",
          payload
        );

        setPortfolios((prev) => [
          res.data,
          ...prev,
        ]);

        return res.data;
      } catch (err) {
        console.log(err);

        throw err;
      }
    },
    []
  );

  // ── UPDATE PORTFOLIO ───────────────────────────
  const updatePortfolio =
    useCallback(async (id, payload) => {
      try {
        const res = await api.put(
          `/portfolios/${id}`,
          payload
        );

        setPortfolios((prev) =>
          prev.map((portfolio) =>
            portfolio.id === id
              ? res.data
              : portfolio
          )
        );

        return res.data;
      } catch (err) {
        console.log(err);

        throw err;
      }
    }, []);

  // ── DELETE PORTFOLIO ───────────────────────────
  const deletePortfolio =
    useCallback(async (id) => {
      try {
        await api.delete(
          `/portfolios/${id}`
        );

        setPortfolios((prev) =>
          prev.filter(
            (portfolio) =>
              portfolio.id !== id
          )
        );
      } catch (err) {
        console.log(err);

        throw err;
      }
    }, []);
  return (
    <PortfoliosContext.Provider
      value={{
        portfolios,

        loading,

        error,

        fetchPortfolios,

        addPortfolio,

        updatePortfolio,

        deletePortfolio
      }}
    >
      {children}
    </PortfoliosContext.Provider>
  );
}

export default function usePortfolios() {
  const context = useContext(
    PortfoliosContext
  );

  if (!context) {
    throw new Error(
      "usePortfolios must be used inside PortfoliosProvider"
    );
  }

  return context;
}