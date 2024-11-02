import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Stocks from "./Stocks";
import StockForm from "./StockForm";
import { fetchStock } from "../services/services";

const StockScreen = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadStocks = async () => {
    setLoading(true);
    try {
      const data = await fetchStock();
      setStocks(data);
    } catch (error) {
      console.error("Error loading stocks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch to populate stocks
    loadStocks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Reload stocks each time the screen is focused
      loadStocks();
    }, [])
  );

  return (
    <ScrollView>
      <View>
        <StockForm onStockAdded={loadStocks}></StockForm>
        <Stocks stocks={stocks} loading={loading}></Stocks>
      </View>
    </ScrollView>
  );
};

export default StockScreen;
