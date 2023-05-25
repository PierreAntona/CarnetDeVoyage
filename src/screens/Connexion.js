import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import SignIn from "../components/connexion/SignIn";
import SignUp from "../components/connexion/SignUp";
import * as SecureStore from 'expo-secure-store';

function Connexion({ navigation }) {
  const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(true);

  useEffect(() => {
    getValueFor("_adress");
  }, [])

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      navigation.navigate("Home", result)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Carnet</Text>
        <Text style={styles.title}>De Voyage</Text>
      </View>
      {alreadyHaveAccount ? (
        <SignIn navigation={navigation} />
      ) : (
        <SignUp navigation={navigation} />
      )}
      {alreadyHaveAccount ? (
        <TouchableOpacity
          style={styles.footer}
          onPress={() => setAlreadyHaveAccount(false)}
        >
          <Text style={styles.footerText}>Inscription</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setAlreadyHaveAccount(true)}
          style={styles.footer}
        >
          <Text style={styles.footerText}>Connexion</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

export default Connexion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#100D05",
  },
  header: {
    paddingHorizontal: 18,
    marginTop: 12,
  },
  title: {
    fontSize: 64,
    color: "#E5CA93",
    fontFamily: "Playfair-Black",
    lineHeight: 68,
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#E5CA93",
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 20,
    fontFamily: "Playfair-Regular",
  },
});
