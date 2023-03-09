import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { textDate } from "../utils/dateFormating";
import BottomForm from "../components/BottomForm";
import NewStep from "../components/NewStep";

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
        <TouchableOpacity
          onPress={() => navigation.navigate("Home", route.params.user)}
        >
          <Entypo name="chevron-left" size={36} color="#8A4F1C" />
        </TouchableOpacity>
        <Text style={styles.title}>Planification</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.checklistButton}>
          Ma valise pour {route.params.destination}
        </Text>
      </TouchableOpacity>
      <View style={styles.steps}>
        <Text style={styles.date}>{startDate}</Text>
      </View>

      <TouchableOpacity style={styles.add} onPress={() => setIsOpen(true)}>
        <Text style={styles.plus}>+</Text>
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
    flex: 1,
    backgroundColor: "#FEFAE0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 20,
  },
  title: {
    fontFamily: "PollerOne",
    color: "#3D7838",
    fontSize: 36,
    marginLeft: 20,
  },
  checklistButton: {
    textAlign: "center",
    fontFamily: "PPTelegraf-Regular",
    fontSize: 20,
    color: "#8A4F1C",
    textDecorationStyle: "solid",
    textDecorationColor: "#8A4F1C",
    textDecorationLine: 1,
    marginVertical: 8,
  },
  date: {
    fontFamily: "PPTelegraf-Bold",
    fontSize: 16,
    color: "#3D7838",
    textAlign: "center",
    marginTop: 30,
  },
  add: {
    border: "",
    position: "absolute",
    zIndex: 2,
    right: 25,
    bottom: 60,
    width: 60,
    height: 60,
    borderColor: "#8A4F1C",
    borderWidth: 3,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8A4F1C",
    shadowRadius: 0,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    backgroundColor: "#FEFAE0",
  },
  plus: {
    fontSize: 36,
    fontFamily: "PPTelegraf-Bold",
    color: "#8A4F1C",
  },
});
