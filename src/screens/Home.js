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
import BottomForm from "../components/animated/BottomForm";
import NewTravel from "../components/forms/NewTravel";
import TravelCard from "../components/cards/TravelCard";
import { db } from "../firebase/config";
import { digitalDate } from "../utils/dateFormating";
import { refreshTravels } from "../utils/signals";
import { LinearGradient } from "expo-linear-gradient";
import Panel from "../components/animated/Panel";
import Account from "../components/Account";
import { checkNetworkStatus } from "../utils/network";
import { getValueFor } from "../utils/localStorage";

function Home({ navigation, route }) {
  const [travels, setTravels] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const [network, setNetwork] = useState(true);

  useEffect(() => {
    getValueFor("_adress", route.params);

    if (!travels.length > 0) {
      getTravels();
    }

    // checkNetworkStatus();

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
      setUsername(docSnap.data().name)
    }
  };

  const refreshTravelsList = () => {
    setTravels([]);
    getTravels();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Mes voyages</Text>
        <TouchableOpacity style={styles.button} onPress={() => setPanelIsOpen(true)}>
          <Text style={styles.buttonText}>
            Mon compte
          </Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
        {!network && <Text style={styles.offline}>Hors ligne</Text>}
      </View>

      <Panel
        panelIsOpen={panelIsOpen}
        setPanelIsOpen={setPanelIsOpen}
        children={<Account username={username} adress={route.params} number={travels.length} navigation={navigation} />}
        title={"Mon compte"}
      />

      <FlatList
        style={styles.list}
        data={travels}
        renderItem={({ item }) => (
          <TravelCard
            network={network}
            navigation={navigation}
            user={route.params}
            destination={item}
            start={digitalDate(item.start)}
            end={digitalDate(item.end)}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <LinearGradient
        colors={["#100D05", "rgba(16, 13, 5, 0)"]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0.5, y: 0 }}
      />


      {network &&
        <TouchableOpacity style={styles.add} onPress={() => setIsOpen(true)}>
          <Text style={styles.addText}>Nouveau voyage</Text>
          <Text style={styles.arrow}>↑</Text>
        </TouchableOpacity>
      }

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
    marginBottom: 30,
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
    bottom: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  offline: {
    textAlign: "center",
    marginTop: 20,
    color: "#000",
    fontSize: 20,
    backgroundColor: "#E5CA93",
    fontFamily: "Playfair-Regular",
  },
  addText: {
    fontSize: 20,
    color: "#E5CA93",
    fontFamily: "Playfair-Regular",
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
  list: {
    marginBottom: 40,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    zIndex: 0,
  },
});
