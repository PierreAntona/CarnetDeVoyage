import { createUserWithEmailAndPassword } from "firebase/auth";
import { app, db, auth } from "./../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

function SignUp({ navigation }) {
  const [username, setUsername] = useState("");
  const [adress, setAdress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const register = () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Les mots de passe ne sont pas identiques");
      return;
    } else {
      createUserWithEmailAndPassword(auth, adress, password)
        .then(() => {
          setDoc(doc(db, adress, "user"), { name: username, travels: [] });
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize="none"
        placeholder="Nom d'utilisateur"
        placeholderTextColor="rgba(229, 202, 147, 0.35)"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setAdress(text)}
        value={adress}
        autoCapitalize="none"
        placeholder="Adresse e-mail"
        placeholderTextColor="rgba(229, 202, 147, 0.35)"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
        placeholder="Mot de passe"
        placeholderTextColor="rgba(229, 202, 147, 0.35)"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholder="Confimer le mot de passe"
        placeholderTextColor="rgba(229, 202, 147, 0.35)"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => register()} style={styles.button}>
        <Text style={styles.buttonText}>Inscription</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 18,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5CA93",
    fontSize: 18,
    marginBottom: 18,
    fontFamily: "NotoSans-Light",
    width: "100%",
    color: "#E5CA93",
    marginBottom: 50,
    height: 50,
  },
  error: {
    color: "red",
    textAlign: "center",
    fontFamily: "NotoSans-Light",
    marginBottom: 20,
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center"
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
    marginLeft: 10
  }
});
