import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { textDate } from "../utils/dateFormating";
import BottomForm from "../components/BottomForm";
import NewStep from "../components/forms/NewStep";
import { LinearGradient } from "expo-linear-gradient";

function Planning({ navigation, route }) {
  const [travel, setTravel] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    if (!travel) {
      getTravel();
    } else {
      setStartDate(textDate(travel.start));
    }
  }, [travel]);

  const getTravel = async () => {
    const docRef = doc(db, route.params.user, route.params.destination);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTravel(docSnap.data());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Planification</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Ma valise pour {route.params.destination}
          </Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.steps}>
        <Text style={styles.date}>{startDate}</Text>
      </View>

      <LinearGradient
        colors={["#100D05", "rgba(16, 13, 5, 0)"]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0.5, y: 0 }}
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            position: "absolute",
            zIndex: 2,
            bottom: 50,
          },
        ]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.buttonText}>Nouvelle étape</Text>
        <Text style={styles.arrow}>↑</Text>
      </TouchableOpacity>

      <BottomForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={<NewStep setIsOpen={setIsOpen} user={route.params} />}
        title={"Nouvelle étape"}
      />
    </SafeAreaView>
  );
}

export default Planning;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#100D05",
    flex: 1,
  },
  header: {
    paddingHorizontal: 18,
    marginBottom: 30,
  },
  title: {
    fontFamily: "Playfair-Black",
    fontSize: 56,
    color: "#E5CA93",
  },
  date: {
    fontSize: 20,
    fontFamily: "Playfair-Bold",
    color: "#FFF",
    textAlign: "center",
  },
  button: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#E5CA93",
    fontSize: 20,
    fontFamily: "Playfair-Regular",
  },
  arrow: {
    color: "#E5CA93",
    fontSize: 20,
    fontFamily: "NotoSans-Light",
    marginLeft: 10,
  },
});
