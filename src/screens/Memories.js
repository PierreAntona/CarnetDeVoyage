import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import BottomForm from "../components/BottomForm";
import { LinearGradient } from "expo-linear-gradient";
import NewMemory from "../components/forms/NewMemory";

function Memories({ navigation, route }) {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Souvenirs</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Partager
          </Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
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
        <Text style={styles.buttonText}>Nouveau souvenir</Text>
        <Text style={styles.arrow}>↑</Text>
      </TouchableOpacity>

      <BottomForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={<NewMemory setIsOpen={setIsOpen} user={route.params} />}
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
