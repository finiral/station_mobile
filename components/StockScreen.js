import React from "react";
import { View, Text, ScrollView } from "react-native";
import Stocks from "./Stocks";
import StockForm from "./StockForm";
const StockScreen = () => (
  <ScrollView>
    <View>
      <StockForm></StockForm>
      <Stocks></Stocks>
    </View>
  </ScrollView>
);

export default StockScreen;
