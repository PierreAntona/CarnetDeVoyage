import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RootTagContext,
} from "react-native";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function Connexion({ navigation }) {
  const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../../assets/compass.png")}
        />
        <Text style={styles.title}>Carnet</Text>
        <Text style={styles.title}>de voyage</Text>
      </View>
      {alreadyHaveAccount ? (
        <SignIn navigation={navigation} />
      ) : (
        <SignUp navigation={navigation} />
      )}
      {alreadyHaveAccount ? (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Vous n'êtes pas encore inscrit ?
          </Text>
          <TouchableOpacity onPress={() => setAlreadyHaveAccount(false)}>
            <Text style={styles.footerLink}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.footer}>
          <Text style={styles.footerText}>Vous possédez déjà un compte ?</Text>
          <TouchableOpacity onPress={() => setAlreadyHaveAccount(true)}>
            <Text style={styles.footerLink}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Connexion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FEFAE0",
  },
  header: {
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 8,
    transform: [{ rotate: "15deg" }],
  },
  title: {
    fontSize: 48,
    fontWeight: "600",
    color: "#3D7838",
    textAlign: "center",
    lineHeight: 48,
    fontFamily: "PollerOne",
    marginBottom: -4,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#234520",
    fontFamily: "PPTelegraf-Regular",
    fontSize: 18,
  },
  footerLink: {
    color: "#8A4F1C",
    fontFamily: "PPTelegraf-Bold",
    fontSize: 22,
    marginVertical: 8,
  },
});
