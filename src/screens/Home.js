import { StatusBar } from "expo-status-bar";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
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
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Mes voyages</Text>
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
        <Text style={styles.addText}>Nouveau voyage</Text>
        <Text style={styles.arrow}>↑</Text>
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
    backgroundColor: "#100D05",
    flex: 1,
  },
  header: {
    marginBottom: 40,
    paddingHorizontal: 18,
  },
  title: {
    fontFamily: "Playfair-Black",
    fontSize: 56,
    color: "#E5CA93",
  },
  add: {
    position: "absolute",
    zIndex: 2,
    right: 18,
    bottom: 60,
    flexDirection: "row",
    justifyContent: "center"
  },
  addText: {
    fontSize: 20,
    color: "#E5CA93",
    fontFamily: "Playfair-Regular",
  },
  arrow: {
    color: "#E5CA93",
    fontSize: 20,
    fontFamily: "NotoSans-Light",
    marginLeft: 10
  }
});
