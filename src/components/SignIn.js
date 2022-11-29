import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { app } from "../firebase/config";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

function SignIn({ navigation }) {
  const [adress, setAdress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth(app);

  const login = () => {
    signInWithEmailAndPassword(auth, adress, password)
      .then(() => {
        navigation.navigate("Home", adress);
      })
      .catch((e) => {
        setError("Adresse ou mot de passe incorrect");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Adresse e-mail</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setAdress(text)}
        value={adress}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCapitalize="none"
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => login()} style={styles.button}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderColor: "#808B97",
    height: 50,
    fontSize: 18,
    paddingHorizontal: 4,
    paddingLeft: 8,
    borderRadius: 6,
    marginBottom: 14,
    color: "#808B97",
  },
  label: {
    color: "#808B97",
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "500",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  button: {
    borderRadius: 6,
    borderColor: "#78B7BB",
    borderWidth: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  buttonText: {
    color: "#78B7BB",
    fontWeight: "600",
    fontSize: 18,
  },
});
