import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const Stocks = ({stocks,loading}) => {

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.idProduitLib}</Text>
      <Text style={styles.cell}>{item.entree}</Text>
      <Text style={styles.cell}>{item.sortie}</Text>
      <Text style={styles.cell}>{item.reste}</Text>
      <Text style={styles.cell}>{item.puVente}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock de lubrifiant</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>IdProduit</Text>
        <Text style={styles.headerCell}>Entree</Text>
        <Text style={styles.headerCell}>Sortie</Text>
        <Text style={styles.headerCell}>Reste</Text>
        <Text style={styles.headerCell}>PuVente</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#34eb7d" style={styles.loading} />
      ) : (
        <FlatList
        scrollEnabled={false} 
          data={stocks}
          renderItem={renderItem}
          keyExtractor={(item) =>item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#d6f6ee",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  headerCell: {
    flex: 1,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 12,  // Adjusted padding for larger rows
    borderBottomWidth: 1,
    borderColor: "#ccc",
    minHeight: 40, // Ensures rows are a minimum height
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  loading: {
    marginTop: 20,
  },
});

export default Stocks;
