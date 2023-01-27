import axios from "axios";
import { useState, useEffect } from "react";
import { API_KEY, RICKROLL_BASE_URL } from "../../config";

export const useAdminRickrollFetch = (id: string) => {
  const [res, setRes] = useState<RickrollResponseData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchRickroll = async () => {
    try {
      setLoading(true);
      setError(false);

      const rickroll = await axios.get<RickrollResponseData>(`${RICKROLL_BASE_URL}${id}`, {
        params: {
          api_key: API_KEY
        }
      });

      setRes(rickroll.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRickroll();
  }, [id]);

  return { res, loading, error };
};