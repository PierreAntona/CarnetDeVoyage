import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Home({ navigation, route }) {
  // console.log(route.params);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.title}>
          <Image style={styles.logo} source={require("../../assets/compass.png")}/>
          <Text style={styles.text}>Mes voyages</Text>
        </View>
        <TouchableOpacity>
          <Image style={styles.params} source={require("../../assets/settings.png")}/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.add}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
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
    marginVertical: 20
  },
  title: {
    flexDirection: "row",
    alignItems: "center"
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
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 0,
    marginLeft: 38
  },
  params: {
    width: 30,
    height: 30
  },
  add: {
    border: "",
    position: "absolute",
    zIndex: 10,
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
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    backgroundColor: "#FEFAE0"
  },
  plus: {
    fontSize: 36,
    fontFamily: "PPTelegraf-Bold",
    color: "#8A4F1C"
  }
});
