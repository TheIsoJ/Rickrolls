import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY, RICKROLL_BASE_URL } from "../../../config";

const useAdminRickrollUpdate = (id: string) => {
    const [res, setRes] = useState<RickrollResponseData>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
  
    const fetchRickroll = async () => {
      try {
        setLoading(true);
        setError(false);
  
        const rickroll = await axios.put<RickrollResponseData>(`${RICKROLL_BASE_URL}${id}?api_key=${API_KEY}`, {
          id
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

  export default useAdminRickrollUpdate