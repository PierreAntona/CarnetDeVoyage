import { LinearGradient } from "expo-linear-gradient";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { db } from "../firebase/config";
import { refreshMemories } from "../utils/signals";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

const MemoryCard = ({
  user,
  destination,
  name,
  description,
  photos,
  index,
  focusedMemoryCard,
  setFocusedMemoryCard,
}) => {
  const [newMemory, setNewMemory] = useState(null);

  const docRef = doc(db, user, destination, "memories", name);

  useEffect(() => {
    newMemory &&
      updateDoc(docRef, {
        images: arrayUnion(newMemory),
      }).then(() => refreshMemories.dispatch());
  }, [newMemory]);

  const deleteMemories = async () => {
    await deleteDoc(doc(db, user, destination, "memories", name)).then(() => {
      setFocusedMemoryCard(null);
      refreshMemories.dispatch();
    });
  };

  const deleteMemory = async (image) => {
    await updateDoc(docRef, {
      images: arrayRemove(image),
    }).then(() => refreshMemories.dispatch());
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setNewMemory(result.assets[0].uri);
    }
  };

  return focusedMemoryCard !== index ? (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setFocusedMemoryCard(index)}
    >
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <LinearGradient
          colors={["#100D05", "rgba(16, 13, 5, 0)"]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>

      {photos && (
        <FlatList
          style={[styles.list, { top: -8 }]}
          horizontal
          data={photos}
          renderItem={(image) => (
            <Image source={{ uri: image.item }} style={styles.defaultImage} />
          )}
          keyExtractor={(image) => image.item}
        />
      )}
    </TouchableOpacity>
  ) : (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setFocusedMemoryCard(null)}
      >
        <View style={styles.nameAndDelete}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={() => deleteMemories()}>
            <Text style={styles.delete}>Supprimer</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>

      {photos && (
        <>
          <FlatList
            style={[styles.list, { top: 0 }]}
            horizontal
            data={photos}
            renderItem={(image) => (
              <>
                <TouchableOpacity
                  style={styles.deleteImage}
                  onPress={() => deleteMemory(image.item)}
                >
                  <Text style={styles.deleteImageCross}>-</Text>
                </TouchableOpacity>
                <Image
                  source={{ uri: image.item }}
                  style={styles.focusedImage}
                />
              </>
            )}
            keyExtractor={(image) => image.item}
          />
          <TouchableOpacity
            style={styles.addMemory}
            onPress={() => pickImage()}
          >
            <Text style={styles.addMemoryText}>+ Ajouter une image</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default MemoryCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 25,
  },
  header: {
    position: "relative",
    zIndex: 20,
    paddingHorizontal: 18,
  },
  name: {
    fontSize: 36,
    fontFamily: "Playfair-Bold",
    color: "#FFF",
    zIndex: 30,
  },
  description: {
    fontSize: 13,
    fontFamily: "NotoSans-Light",
    color: "#FFF",
    marginVertical: 8,
    top: -4,
    zIndex: 30,
  },
  delete: {
    color: "#E5CA93",
    fontSize: 16,
    fontFamily: "Playfair-Regular",
  },
  nameAndDelete: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  gradient: {
    position: "absolute",
    top: 40,
    width: "100%",
    height: 40,
  },
  list: {
    position: "relative",
    zIndex: 0,
  },
  defaultImage: {
    width: 100,
    height: 100,
    marginRight: 6,
  },
  focusedImage: {
    width: undefined,
    height: 220,
    aspectRatio: 3 / 2,
    marginRight: 8,
  },
  deleteImage: {
    position: "absolute",
    zIndex: 30,
    right: 14,
    top: 6,
    width: 26,
    height: 26,
    backgroundColor: "#E5CA93",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteImageCross: {
    fontSize: 24,
    lineHeight: 24,
    fontFamily: "Playfair-Regular",
    color: "#000",
  },
  addMemory: {
    marginTop: 8,
    paddingHorizontal: 8,
    alignItems: "flex-end",
  },
  addMemoryText: {
    color: "#E5CA93",
    fontSize: 16,
    fontFamily: "Playfair-Regular",
  },
});
