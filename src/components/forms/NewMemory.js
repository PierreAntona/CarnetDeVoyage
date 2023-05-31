import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { refreshMemories } from "../../utils/signals";

function NewMemory({ user, destination, setIsOpen }) {
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const addMemories = async () => {
    const docRef = doc(db, user, destination);

    await setDoc(doc(docRef, "memories", `${category}`), {
      description: description,
      images: images,
    })
    setIsOpen(false);
    refreshMemories.dispatch();
    setImages([]);
    setCategory("");
    setDescription("");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([
        ...images,
        result.assets[0].uri,
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        value={category}
        placeholder="Catégorie"
        onChangeText={(cat) => setCategory(cat)}
        placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
      />
      <TextInput
        style={styles.input}
        value={description}
        placeholder="Description"
        onChangeText={(desc) => setDescription(desc)}
        placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
      />
      <View style={styles.import}>
        <View style={styles.picContainer}>
          {images.map((image, index) => (
            <Image
              style={{ height: 104, width: 200 / images.length }}
              key={index}
              source={{ uri: image }}
            />
          ))}
        </View>
        <View>
          <TouchableOpacity
            style={[styles.formButton, { marginBottom: 4 }]}
            onPress={pickImage}
          >
            <Text style={styles.formButtonText}>Importer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => setImages([])}
          >
            <Text style={styles.formButtonText}>
              Supprimer [ {images.length} ]
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={() => addMemories()}>
        <Text style={styles.buttonText}>Ajouter</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default NewMemory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 18,
    marginBottom: 18,
    fontFamily: "NotoSans-Light",
    width: "100%",
    marginBottom: 50,
    height: 50,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  button: {
    alignSelf: "flex-end",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Playfair-Regular",
  },
  arrow: {
    fontSize: 20,
    fontFamily: "NotoSans-Light",
    marginLeft: 10,
  },
  import: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  picContainer: {
    width: 200,
    height: 104,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    justifyContent: "center",
  },
  formButton: {
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    width: 160,
    height: 50,
  },
  formButtonText: {
    fontSize: 18,
    fontFamily: "Playfair-Regular",
    color: "#E5CA93",
    textAlign: "center",
  },
});
