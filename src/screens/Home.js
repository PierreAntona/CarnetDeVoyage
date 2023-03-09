import { StatusBar } from "expo-status-bar";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomForm from "../components/BottomForm";
import NewTravel from "../components/NewTravel";
import TravelCard from "../components/TravelCard";
import { db } from "../firebase/config";
import { digitalDate } from "../utils/dateFormating";
import { refreshTravels } from "../utils/signals";

function Home({ navigation, route }) {
  const [travels, setTravels] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!travels) {
      getTravels();
    }
    const showTravelsList = refreshTravels.add(refreshTravelsList);
    return () => {
      refreshTravels.detach(showTravelsList);
    };
  }, []);

  const getTravels = async () => {
    const docRef = doc(db, route.params, "user");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTravels(docSnap.data().travels);
    }
  };

  const refreshTravelsList = () => {
    setTravels(null);
    getTravels();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.title}>
          <Image
            style={styles.logo}
            source={require("../../assets/compass.png")}
          />
          <Text style={styles.text}>Mes voyages</Text>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.params}
            source={require("../../assets/settings.png")}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={travels}
        renderItem={({ item }) => (
          <TravelCard
            navigation={navigation}
            user={route.params}
            destination={item}
            start={digitalDate(item.start)}
            end={digitalDate(item.end)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.add} onPress={() => setIsOpen(true)}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>

      <BottomForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={<NewTravel setIsOpen={setIsOpen} user={route.params} />}
        title={"Nouveau voyage"}
      />
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEFAE0",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 60,
    height: 60,
    transform: [{ rotate: "15deg" }],
    position: "absolute",
    bottom: 10,
  },
  text: {
    fontFamily: "PollerOne",
    color: "#3D7838",
    fontSize: 36,
    textShadowColor: "#FEFAE0",
    textShadowOffset: { width: -1, height: -1 },
    textShadowRadius: 0,
    marginLeft: 38,
  },
  params: {
    width: 24,
    height: 24,
    bottom: 3,
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
