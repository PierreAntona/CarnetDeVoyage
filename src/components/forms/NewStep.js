import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

function NewStep({ user, setIsOpen }) {
  const [stepType, setStepType] = useState();
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [error, setError] = useState(null);

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
        <TextInput
          style={styles.input}
          value={departureAirport}
          placeholder="Aéroport de départ"
          onChangeText={setDepartureAirport}
        />
        <TextInput
          style={styles.input}
          value={""}
          placeholder="Aéroport d'arrivé"
          onChangeText={setArrivalAirport}
        />
        <TextInput
          style={styles.input}
          value={arrivalAirport}
          placeholder="Heure de départ"
          onChangeText={""}
        />
        <TextInput
          style={styles.input}
          value={""}
          placeholder="Heure d'arrivé"
          onChangeText={""}
        />
      </>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <SelectDropdown
        data={types}
        defaultButtonText={"Type d'étape"}
        buttonStyle={[styles.input, { backgroundColor: "transparent" }]}
        dropdownOverlayColor="transparent"
        buttonTextStyle={{
          color: "#000",
          fontSize: 18,
          textAlign: "left",
          marginLeft: -5,
          fontFamily: "NotoSans-Light",
        }}
        dropdownStyle={{
          backgroundColor: "#100D05",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10
        }}
        rowStyle={{
          borderBottomColor: "#E5CA93",
        }}
        rowTextStyle={{
          textAlign: "left",
          fontFamily: "NotoSans-Light",
          color: "#E5CA93",
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
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ajouter</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default NewStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 18,
    marginBottom: 18,
    fontFamily: "NotoSans-Light",
    width: "100%",
    marginBottom: 50,
    height: 50,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Playfair-Regular",
  },
  arrow: {
    fontSize: 20,
    fontFamily: "NotoSans-Light",
    marginLeft: 10,
  },
});
