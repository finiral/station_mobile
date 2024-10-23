import { StyleSheet, SafeAreaView, View } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";

import LubrifiantForm from "./components/LubrifiantForm";
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
    <Header />
    <View style={styles.content}>
      <LubrifiantForm/>
      {/* Main content of the app can go here */}
    </View>
    <Footer />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1, // Expands to take up available space between header and footer
  },
});
