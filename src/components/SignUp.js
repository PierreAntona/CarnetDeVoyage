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
      <Text style={styles.label}>Nom d'utilisateur</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
        autoCapitalize="none"
        placeholder="Aventurier123"
      />
      <Text style={styles.label}>Adresse e-mail</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setAdress(text)}
        value={adress}
        autoCapitalize="none"
        placeholder="exemple@mail.fr"
      />
      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize="none"
        placeholder="••••••••••••"
      />
      <Text style={styles.label}>Confimer le mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        secureTextEntry
        autoCapitalize="none"
        placeholder="••••••••••••"
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => register()} style={styles.button}>
        <Text style={styles.buttonText}>Inscription</Text>
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
    marginBottom: "10%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#234520",
    height: 50,
    width: "84%",
    fontSize: 18,
    paddingLeft: 8,
    borderRadius: 4,
    marginBottom: 18,
    color: "#234520",
    fontFamily: "PPTelegraf-Regular",
  },
  label: {
    alignSelf: "flex-start",
    color: "#808B97",
    marginBottom: 6,
    marginLeft: "8%",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "PPTelegraf-Regular",
    color: "#234520",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  button: {
    borderRadius: 6,
    borderColor: "#8A4F1C",
    borderWidth: 2,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  buttonText: {
    color: "#8A4F1C",
    fontWeight: "600",
    fontFamily: "PPTelegraf-Bold",
    fontSize: 18,
  },
});
