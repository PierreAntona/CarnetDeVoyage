import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { app } from "../../firebase/config";
import React, { useState } from "react";
import * as SecureStore from 'expo-secure-store';
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

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const login = () => {
    signInWithEmailAndPassword(auth, adress, password)
      .then(() => {
        save("_adress", adress);
        navigation.navigate("Home", adress);
        setError("");
        setAdress("");
        setPassword("");
      })
      .catch((e) => {
        setError("Adresse ou mot de passe incorrect");
      });
  };

  return (
    <View style={styles.container}>
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
        autoCapitalize="none"
        placeholder="Mot de passe"
        placeholderTextColor="rgba(229, 202, 147, 0.35)"
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => login()} style={styles.button}>
        <Text style={styles.buttonText}>Connexion</Text>
        <Text style={styles.arrow}>→</Text>
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
