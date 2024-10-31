// Stocks.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchStock } from '../services/services';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchStock().then((data) => {
      setStocks(data);
      setLoading(false);
    });
  }, []);

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
          data={stocks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    flex: 1,
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
  loading: {
    marginTop: 20,
  },
});

export default Stocks;
