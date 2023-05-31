import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import BottomForm from "../components/animated/BottomForm";
import { LinearGradient } from "expo-linear-gradient";
import NewMemory from "../components/forms/NewMemory";
import MemoryCard from "../components/cards/MemoryCard.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { refreshMemories } from "../utils/signals";

import { LogBox } from 'react-native';

function Memories({ navigation, route }) {
  const [memories, setMemories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedMemoryCard, setFocusedMemoryCard] = useState(null);

  useEffect(() => {
    LogBox.ignoreAllLogs();

    if (!memories.length > 0) {
      getMemories();
    }

    const showMemoriesList = refreshMemories.add(refreshMemoriesList);
    return () => {
      refreshMemories.detach(showMemoriesList);
    };
  }, []);

  const refreshMemoriesList = () => {
    setMemories([]);
    getMemories();
  };

  const getMemories = async () => {
    const docRef = collection(
      db,
      route.params.user,
      route.params.destination,
      "memories"
    );
    const querySnapshot = await getDocs(docRef);

    querySnapshot.forEach((doc) => {
      setMemories((memories) => [
        ...memories,
        {
          id: doc.id,
          description: doc.data().description,
          images: doc.data().images,
        },
      ]);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Souvenirs</Text>
      </View>

      <FlatList
        style={styles.list}
        data={memories}
        renderItem={(memory) => (
          <MemoryCard
            user={route.params.user}
            destination={route.params.destination}
            index={memory.index}
            name={memory.item.id}
            description={memory.item.description}
            photos={memory.item.images}
            focusedMemoryCard={focusedMemoryCard}
            setFocusedMemoryCard={setFocusedMemoryCard}
            network={route.params.network}
          />
        )}
        keyExtractor={(memory) => memory.index}
      />

      <LinearGradient
        colors={["#100D05", "rgba(16, 13, 5, 0)"]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0.5, y: 0 }}
      />

      {route.params.network &&
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
          <Text style={styles.buttonText}>Nouveau souvenir</Text>
          <Text style={styles.arrow}>↑</Text>
        </TouchableOpacity>}

      <BottomForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={
          <NewMemory
            setIsOpen={setIsOpen}
            user={route.params.user}
            destination={route.params.destination}
          />
        }
        title={"Nouveau souvenir"}
      />
    </SafeAreaView>
  );
}

export default Memories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#100D05",
    flex: 1,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    zIndex: 0,
  },
  header: {
    paddingHorizontal: 18,
    marginBottom: 30,
  },
  title: {
    fontFamily: "Playfair-Black",
    fontSize: 64,
    color: "#E5CA93",
  },
  button: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
    right: 18,
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
});
