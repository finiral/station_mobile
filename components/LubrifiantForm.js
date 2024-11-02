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
const LubrifiantForm = () => {
  const [pompeData, setPompeData] = useState([]);
  const [pompisteData, setPompisteData] = useState([]);
  const [lubrifiantData, setLubrifiantData] = useState([]);
  const [pompe, setPompe] = useState(null);
  const [pompiste, setPompiste] = useState(null);
  const [lubrifiant, setLubrifiant] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [qte, setQte] = useState(""); // State for quantity input

  useEffect(() => {
    fetchPompes().then((data) => {
      setPompeData(
        data.map((pompe) => ({
          label: pompe.numeroPompe,
          value: pompe.idPompe,
        }))
      );
    });
    fetchPompistes().then((data) => {
      setPompisteData(
        data.map((pompiste) => ({
          label: pompiste.nomPompiste,
          value: pompiste.idPompiste,
        }))
      );
    });
    fetchLubrifiants().then((data) => {
      setLubrifiantData(
        data.map((lubrifiant) => ({
          label: lubrifiant.nom,
          value: lubrifiant.id,
        }))
      );
    });
  }, []);

  const validateAndSubmit = async () => {
    if (!pompe || !pompiste || !lubrifiant || !date || !qte) {
      alert("Validation Error : Please fill all fields");
      return;
    }

    // Prepare data to send
    const payload = {
      pompe: pompe,
      pompiste: pompiste,
      lubrifiant: lubrifiant,
      dateTime: dayjs(date).format("YYYY-MM-DDTHH:mm:ssZ"), // ISO format
      qte: parseFloat(qte), // Use the quantity from input
      pu: 2000.0, // Set a fixed unit price for demonstration
    };
    console.log("Payload:", payload);

    try {
      const response = await fetch(`${url}/prelev_lub`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response;
        message = await result.text();
        alert("Success: " + message); // Optionally alert the success message
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
    <ScrollView contentContainerStyle={styles.container} >
      <View style={styles.panel}>
        <Text style={styles.title}>Prelevement de lubrifiant</Text>

        {/* Select Pompe */}
        <DropdownComponent
          label="Select Pompe"
          data={pompeData}
          value={pompe}
          onChange={setPompe}
        />

        {/* Select Pompiste */}
        <DropdownComponent
          label="Select Pompiste"
          data={pompisteData}
          value={pompiste}
          onChange={setPompiste}
        />

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
              scrollEnabled={false}
              />
          </View>
        )}

        {/* Submit Button */}
        <View style={styles.button}>
          <Button title="Prelever" color="#28eb76" onPress={validateAndSubmit} />
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

export default LubrifiantForm;
