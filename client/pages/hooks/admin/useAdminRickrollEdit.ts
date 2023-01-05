import axios from "axios";
import { useState, useEffect } from "react";
import { API_KEY, HOME_BASE_URL } from "../../../config";

export const useAdminRickrollEdit = (name: string, description: string, link: string) => {
  const [res, setRes] = useState<RickrollsResponseData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const updateRickroll = async () => {
    try {
      setError(false);
      setLoading(true);

      const rickrolls = await axios.put<RickrollsResponseData>(HOME_BASE_URL, {
        name,
        description,
        link
      }, {
        params: {
          api_key: API_KEY
        }
      })

      setRes(rickrolls.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial
  useEffect(() => {
    updateRickroll();
  }, []);

  return { res, loading, error };
};