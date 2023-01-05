import axios from "axios";
import { useState, useEffect } from "react";
import { HOME_BASE_URL } from "../../../config";

export const useAdminRickrollsFetch = () => {
  const [res, setRes] = useState<RickrollsResponseData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getAdminRickrolls = async () => {
    try {
      setError(false);
      setLoading(true);

      const rickrolls = await axios.get<RickrollsResponseData>(HOME_BASE_URL)

      setRes(rickrolls.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial
  useEffect(() => {
    getAdminRickrolls();
  }, []);

  return { res, loading, error };
};