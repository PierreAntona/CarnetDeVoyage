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
        placeholder="exemple@mail.fr"
      />
      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCapitalize="none"
        placeholder="••••••••••••"
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => login()} style={styles.button}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20%"
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
    fontFamily: "PPTelegraf-Regular"
  },
  label: {
    alignSelf: "left",
    color: "#808B97",
    marginBottom: 6,
    marginLeft: "8%",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "PPTelegraf-Regular",
    color: "#234520"
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
    fontFamily: 'PPTelegraf-Bold',
    fontSize: 18,
  },
});
