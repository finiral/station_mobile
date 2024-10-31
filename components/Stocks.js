// Stocks.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Stocks = () => {
  // Sample data
  const stockData = [
    { id: 'PRD001', IdProduit: 'PRD001', Entree: 50, Sortie: 20, Reste: 30, PuVente: 500 },
    { id: 'PRD002', IdProduit: 'PRD002', Entree: 70, Sortie: 10, Reste: 60, PuVente: 700 },
    { id: 'PRD003', IdProduit: 'PRD003', Entree: 30, Sortie: 5, Reste: 25, PuVente: 400 },
    { id: 'PRD004', IdProduit: 'PRD004', Entree: 90, Sortie: 30, Reste: 60, PuVente: 800 },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.IdProduit}</Text>
      <Text style={styles.cell}>{item.Entree}</Text>
      <Text style={styles.cell}>{item.Sortie}</Text>
      <Text style={styles.cell}>{item.Reste}</Text>
      <Text style={styles.cell}>{item.PuVente}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Etat de stock</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>IdProduit</Text>
        <Text style={styles.headerCell}>Entree</Text>
        <Text style={styles.headerCell}>Sortie</Text>
        <Text style={styles.headerCell}>Reste</Text>
        <Text style={styles.headerCell}>PuVente</Text>
      </View>
      <FlatList
        data={stockData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d6f6ee',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Stocks;
