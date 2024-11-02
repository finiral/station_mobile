import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import DropdownComponent from "./DropdownComponent";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import {
  fetchLubrifiants,
  fetchPompes,
  fetchPompistes,
} from "../services/services";
import { url } from "../services/url";
import { Alert } from "react-native";
const StockForm = ({onStockAdded}) => {
  const [lubrifiantData, setLubrifiantData] = useState([]);
  const [lubrifiant, setLubrifiant] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [qte, setQte] = useState(""); // State for quantity input

  useEffect(() => {
    fetchLubrifiants().then((data) => {
      setLubrifiantData(
        data.map((lubrifiant) => ({
          label: lubrifiant.nom,
          value: lubrifiant.idCentrale,
        }))
      );
    }
  );
  }, []);

  const validateAndSubmit = async () => {
    if (!lubrifiant || !date || !qte) {
      alert("Validation Error : Please fill all fields");
      return;
    }

    // Prepare data to send
    const mvtStocksFille = [
      {
        idProduit: lubrifiant,
        entree: qte
      }
    ];
    const idMagasin="POMP001";
    const timestamp=date.getTime();
    console.log("mvtStocksFille:", mvtStocksFille);
    console.log("DATY : ",timestamp);

    try {
      const response = await fetch(`${url}/stocks?idMagasin=${idMagasin}&timestamp=${timestamp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mvtStocksFille),
      });

      if (response.ok) {
        const result = await response;
        message = await result.text();
        alert("Success: " + message); // Optionally alert the success message
        onStockAdded();
      } else {
        const error = await response.text();
        alert("Error: " + error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Network Error " + error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} nestedScrollEnabled={true}>
      <View style={styles.panel}>
        <Text style={styles.title}>Insertion stock</Text>
        {/* Select Lubrifiant */}
        <DropdownComponent
          label="Select Lubrifiant"
          data={lubrifiantData}
          value={lubrifiant}
          onChange={setLubrifiant}
        />

        {/* Input for Quantity */}
        <TextInput
          style={styles.input}
          placeholder="Enter Quantity"
          keyboardType="numeric"
          value={qte}
          onChangeText={setQte}
        />

        {/* Button to toggle DatePicker visibility */}
        <Button
          title={showDatePicker ? "Hide Date Picker" : "Show Date Picker"}
          onPress={() => setShowDatePicker(!showDatePicker)}
        />

        {/* Date Picker Section */}
        {showDatePicker && (
          <View style={styles.datePickerContainer}>
            <Text style={styles.date}>Select Date</Text>
            <DateTimePicker
              mode="single"
              date={date}
              timePicker={true}
              onChange={(params) => setDate(params.date)}
            />
          </View>
        )}

        {/* Submit Button */}
        <View style={styles.button}>
          <Button title="Inserer stock" color="#28eb76" onPress={validateAndSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f7f7f7",
  },
  panel: {
    justifyContent: "center",
    width: "90%",
    maxWidth: 400,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom:20
  },
  datePickerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    tintColor:'#d6f6ee'
  },
});

export default StockForm;
