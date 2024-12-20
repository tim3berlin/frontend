import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import apiClient from "../axios.js";

export default function useFilterData(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const token = Cookies.get("accessToken");
      const response = await apiClient.get("products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error.response || error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return {
    products,
    loading,
    error,
  };
}
