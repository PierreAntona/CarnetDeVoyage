import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FlightForm from "./stepsForm/flight";
import HousingForm from "./stepsForm/housing";
import RestaurantForm from "./stepsForm/restaurant";
import VisitForm from "./stepsForm/visit";
import OtherForm from "./stepsForm/other";
import TransportForm from "./stepsForm/transport";

function NewStep({ user, destination, setIsOpen, startDate }) {
  const [stepType, setStepType] = useState(null);

  const types = [
    "Vol",
    "Logement",
    "Transport",
    "Restaurant",
    "Visite",
    "Autre",
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.types}>
        {types.map((type, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.type, stepType === index && { backgroundColor: "#000" }]}
            onPress={() => setStepType(index)}
          >
            <Text style={[styles.typeText, stepType === index && { color: "#E5CA93" }]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {stepType === 0 && <FlightForm startDate={startDate} user={user} destination={destination} setIsOpen={setIsOpen} />}

      {stepType === 1 && <HousingForm startDate={startDate} user={user} destination={destination} setIsOpen={setIsOpen} />}

      {stepType === 2 && <TransportForm startDate={startDate} user={user} destination={destination} setIsOpen={setIsOpen} />}

      {stepType === 3 && <RestaurantForm startDate={startDate} user={user} destination={destination} setIsOpen={setIsOpen} />}

      {stepType === 4 && <VisitForm startDate={startDate} user={user} destination={destination} setIsOpen={setIsOpen} />}

      {stepType === 5 && <OtherForm startDate={startDate} user={user} destination={destination} setIsOpen={setIsOpen} />}

    </ScrollView>
  );
}

export default NewStep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40
  },
  types: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 12
  },
  type: {
    width: "30%",
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  typeText: {
    fontFamily: "NotoSans-Light",
    fontSize: 16
  }
});
