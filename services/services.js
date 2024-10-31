// Fetch functions for each service
import { url } from "./url";
export const fetchPompes = async () => {
    try {
      const response = await fetch(`${url}/pompes`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pompes:", error);
    }
  };

export const fetchPompistes = async () => {
    try {
      const response = await fetch(`${url}/pompistes`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pompistes:", error);
    }
  };

export const fetchLubrifiants = async () => {
    try {
      const response = await fetch(`${url}/lubrifiants`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching lubrifiants:", error);
    }
  };

  export const fetchStock = async () => {
    try {
      const response = await fetch(`${url}/stocks/lubrifiants`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching stock lubrifiants:", error);
    }
  };