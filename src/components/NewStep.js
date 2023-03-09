import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";

function NewStep({ user, setIsOpen }) {
  const [stepType, setStepType] = useState();
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");

  const types = [
    "Vol",
    "Logement",
    "Transport",
    "Restaurant",
    "Visite",
    "Activité",
  ];

  const FlightForm = () => {
    return (
      <>
        <Text style={styles.label}>Aéroport de départ</Text>
        <TextInput
          style={styles.input}
          value={departureAirport}
          placeholder="Paris CDG"
          onChangeText={setDepartureAirport}
        />
        <Text style={styles.label}>Aéroport d'arrivé</Text>
        <TextInput
          style={styles.input}
          value={arrivalAirport}
          placeholder="Sydney Airport"
          onChangeText={setArrivalAirport}
        />
      </>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Type d'étape</Text>
      <SelectDropdown
        data={types}
        defaultButtonText={""}
        buttonStyle={[styles.input, { backgroundColor: "#FEFAE0" }]}
        buttonTextStyle={{
          color: "#234520",
          fontFamily: "PPTelegraf-Regular",
          fontSize: 18,
        }}
        renderDropdownIcon={(isOpened) => {
          return (
            <Entypo
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#234520"}
              size={24}
            />
          );
        }}
        dropdownStyle={{
          backgroundColor: "#FEFAE0",
          borderRadius: 6,
          height: 225,
        }}
        rowStyle={{
          borderBottomColor: "#234520",
        }}
        rowTextStyle={{
          fontFamily: "PPTelegraf-Regular",
          fontSize: 18,
          color: "#234520",
        }}
        onSelect={(selectedItem, index) => {
          setStepType(index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      {stepType === 0 && <FlightForm />}
    </View>
  );
}

export default NewStep;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  label: {
    alignSelf: "flex-start",
    color: "#808B97",
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "PPTelegraf-Regular",
    color: "#234520",
  },
  input: {
    borderWidth: 1,
    borderColor: "#234520",
    height: 50,
    width: "100%",
    fontSize: 18,
    paddingLeft: 14,
    borderRadius: 6,
    marginBottom: 24,
    color: "#234520",
    fontFamily: "PPTelegraf-Regular",
  },
});
