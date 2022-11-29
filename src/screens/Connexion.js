import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

function Connexion({ navigation }) {
  const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
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
    marginVertical: "20%",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  header: {
      
  },
  title: {
    fontSize: 52,
    fontWeight: '600',
    color: "#E97777",
    textAlign: 'center',
    lineHeight: 52,
    fontFamily:'DancingScript'
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#808B97",
  },
  footerLink: {
    color: "#78B7BB",
    fontWeight: "600",
    fontSize: 20,
    marginTop: 6,
  },
});
