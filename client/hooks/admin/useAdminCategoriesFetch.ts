import axios from "axios";
import { useState, useEffect } from "react";
import { ADMIN_CATEGORIES_BASE_URL } from "../../config";

export const useAdminCategoriesFetch = () => {
  const [res, setRes] = useState<CategoriesResponseData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getAdminCategories = async () => {
    try {
      setError(false);
      setLoading(true);

      const categories = await axios.get<CategoriesResponseData>(ADMIN_CATEGORIES_BASE_URL)

      setRes(categories.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  // Initial
  useEffect(() => {
    getAdminCategories();
  }, []);

  return { res, loading, error };
};