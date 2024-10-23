import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      {/* Replace this with your actual logo */}
      <Text style={styles.title}>Lub.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#25f3c1",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  logo: {
    width: 60, 
    height: 60, 
    marginBottom: 10, // Adds space between logo and title
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Header;
