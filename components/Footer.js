import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.actionContainer} onPress={() => navigation.navigate('Prelevement')}>
        <View style={styles.action}>
          <MaterialIcons name="local-gas-station" size={24} color="black" />
          <Text style={styles.actionText}>Prélever</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionContainer} onPress={() => navigation.navigate('Ventes')}>
        <View style={styles.action}>
          <MaterialIcons name="attach-money" size={24} color="black" />
          <Text style={styles.actionText}>Ventes</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionContainer} onPress={() => navigation.navigate('Stock')}>
        <View style={styles.action}>
          <MaterialIcons name="inventory" size={24} color="black" />
          <Text style={styles.actionText}>État de stock</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "#d6f6ee",
    paddingVertical: 7,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  actionContainer: {
    flex: 1,
    backgroundColor: '#d6f6ee',
    paddingVertical: 1,
    paddingBottom: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  action: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    marginTop: 4,
    color: '#000',
  },
});

export default Footer;
