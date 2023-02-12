import axios from "axios";
import { useState, useEffect } from "react";
import { ADMIN_CATEGORY_BASE_URL, API_KEY } from "../../config";

export const useAdminCategoryFetch = (id: string) => {
  const [res, setRes] = useState<CategoryResponseData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      setError(false);

      const category = await axios.get<CategoryResponseData>(`${ADMIN_CATEGORY_BASE_URL}${id}`, {
        params: {
          api_key: API_KEY
        }
      });

      setRes(category.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  return { res, loading, error };
};