import axios from "axios";
import { useState, useEffect } from "react";
import { API_KEY, PRODUCT_BASE_URL } from "../../config";

export const useProductFetch = (id: string) => {
  const [res, setRes] = useState<ProductResponseData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(false);

      const product = await axios.get<ProductResponseData>(`${PRODUCT_BASE_URL}${id}?api_key=${API_KEY}`);

      setRes(product.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return { res, loading, error };
};