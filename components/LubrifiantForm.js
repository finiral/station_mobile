import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import DropdownComponent from "./DropdownComponent";
import DateTimePicker from "react-native-ui-datepicker"; // Assurez-vous d'importer le bon DatePicker
import dayjs from "dayjs";

const pompeData = [
  { label: "Pompe 1", value: "pompe1" },
  { label: "Pompe 2", value: "pompe2" },
];

const pompisteData = [
  { label: "Pompiste 1", value: "pompiste1" },
  { label: "Pompiste 2", value: "pompiste2" },
];

const lubrifiantData = [
  { label: "AC 1", value: "ac1" },
  { label: "QTE 100", value: "100" },
  { label: "QTE 200", value: "200" },
];

const LubrifiantForm = () => {
  const [pompe, setPompe] = useState(null);
  const [pompiste, setPompiste] = useState(null);
  const [lubrifiant, setLubrifiant] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // New state for controlling date picker visibility

  const validateAndSubmit = () => {
    if (!pompe || !pompiste || !lubrifiant || !date) {
      alert("Please fill all fields");
      return;
    }
    alert(`Form submitted successfully! \nDate: ${dayjs(date).format("YYYY-MM-DD")}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.panel}>
        <Text style={styles.title}>Lubrifiant Form</Text>

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
        onChange={(params) => setDate(params.date)}
            />
          </View>
        )}

        {/* Submit Button */}
        <View style={styles.button}>
          <Button title="Validate" onPress={validateAndSubmit} />
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
    width: "90%",
    maxWidth: 400,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
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
  },
});

export default LubrifiantForm;
