import axios from "axios";
import { useState, useEffect } from "react";
import { PRODUCTS_BASE_URL } from "../../../config";

export const useProductsFetch = () => {
  const [res, setRes] = useState<ProductsResponseData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(false);

      const products = await axios.get<ProductsResponseData>(`${PRODUCTS_BASE_URL}`);

      setRes(products.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { res, loading, error };
};