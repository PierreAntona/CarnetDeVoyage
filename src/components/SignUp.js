import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import { app } from "../firebase/config";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

function SignUp({ navigation }) {
  const [adress, setAdress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth(app);

  const register = () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Les mots de passe ne sont pas identiques");
      return;
    } else {
      createUserWithEmailAndPassword(auth, adress, password)
        .then(() => {
          navigation.navigate("Home", adress);
        })
        .catch((e) => {
          if (e.code == "auth/invalid-email") {
            setError("Adresse ou mot de passe incorrect");
          } else if (e.code == "auth/weak-password") {
            setError(
              "Le mot de passe doit être composé d'au moins 6 caractères"
            );
          } else if (e.code == "auth/missing-email") {
            setError("Veuillez saisir une adresse valide");
          } else setError(e.message);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        secureTextEntry
        autoCapitalize="none"
      />
      <Text style={styles.label}>Confimer le mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => register()} style={styles.button}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {},
  input: {
    borderWidth: 1,
    borderColor: "#808B97",
    height: 50,
    fontSize: 18,
    paddingLeft: 8,
    paddingVertical: 8,
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
