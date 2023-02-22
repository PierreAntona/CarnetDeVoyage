import React, { useState } from "react";
import { db } from "./../firebase/config";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { refreshTravels } from "../utils/signals";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import { dateFormating } from "../utils/dateFormating";

function NewTravel({ user, setIsOpen }) {
  const [startDate, setStartDate] = useState(new Date());
  const [openStartDateModal, setOpenStartDateModal] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [openEndDateModal, setOpenEndDateModal] = useState(false);
  const [destination, setDestination] = useState({ place_id: "", name: "" });
  const [error, setError] = useState(null);

  const addTravel = async () => {
    const docRef = doc(db, user, "user");
    const docSnap = await getDoc(docRef);
    const id = JSON.stringify(docSnap.data().travels.length + 1);
    await updateDoc(docRef, {
      travels: arrayUnion({
        id: id,
        destination: destination,
        start: startDate,
        end: endDate,
      }),
    });

    await setDoc(doc(db, user, destination.name), {
      destination: destination,
      start: startDate,
      end: endDate,
    })
      .then(() => {
        setIsOpen(false);
        refreshTravels.dispatch();
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <Text style={styles.label}>Destination</Text>
      <GooglePlacesAutocomplete
        placeholder="Pays, ville..."
        onPress={(data, details = null) => {
          console.log(data);
          setDestination({
            place_id: data.place_id,
            name: data.terms[0].value,
          });
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "fr",
        }}
        filterReverseGeocodingByTypes={[
          "country",
          "locality",
          "administrative_area_level_3",
        ]}
        onFail={(error) => console.error(error)}
        listViewDisplayed={true}
        minLength={3}
        styles={{
          container: {
            marginBottom: 24,
          },
          textInput: {
            backgroundColor: "#FEFAE0",
            borderWidth: 1,
            borderColor: "#234520",
            height: 50,
            width: "100%",
            paddingLeft: 14,
            borderRadius: 6,
            color: "#234520",
            fontSize: 18,
            fontFamily: "PPTelegraf-Regular",
          },
          poweredContainer: {
            display: "none",
          },
          separator: {
            color: "#234520",
          },
          row: {
            backgroundColor: "#FEFAE0",
          },
          listView: {
            borderColor: "#234520",
            borderWidth: 1,
            borderRadius: 6,
          },
          description: {
            color: "#234520",
            fontSize: 18,
            fontFamily: "PPTelegraf-Regular",
          },
        }}
      />

      <Text style={styles.label}>Date début</Text>
      <TextInput
        style={styles.input}
        value={dateFormating(startDate)}
        onFocus={() => setOpenStartDateModal(true)}
        placeholder="00/00/0000"
      />
      <DatePicker
        modal
        open={openStartDateModal}
        style={styles.datePicker}
        date={startDate}
        onConfirm={(startDate) => {
          setOpenStartDateModal(false);
          setStartDate(startDate);
        }}
        onCancel={() => {
          setOpenStartDateModal(false);
        }}
        mode="date"
        title="Selectionner une date"
        confirmText="Confirmer"
        cancelText="Annuler"
        theme="auto"
      />

      <Text style={styles.label}>Date fin</Text>
      <TextInput
        style={styles.input}
        value={dateFormating(endDate)}
        onFocus={() => setOpenEndDateModal(true)}
        placeholder="00/00/0000"
      />
      <DatePicker
        modal
        open={openEndDateModal}
        style={styles.datePicker}
        date={endDate}
        onConfirm={(endDate) => {
          setOpenEndDateModal(false);
          setEndDate(endDate);
        }}
        onCancel={() => {
          setOpenEndDateModal(false);
        }}
        mode="date"
        title="Selectionner une date"
        confirmText="Confirmer"
        cancelText="Annuler"
        theme="auto"
      />

      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => addTravel()} style={styles.button}>
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default NewTravel;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#234520",
    height: 50,
    width: "100%",
    fontSize: 18,
    paddingLeft: 14,
    borderRadius: 6,
    marginBottom: 24,
    color: "#234520",
    fontFamily: "PPTelegraf-Regular",
  },
  label: {
    alignSelf: "flex-start",
    color: "#808B97",
    marginBottom: 8,
    fontSize: 20,
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
    marginBottom: 20,
  },
  buttonText: {
    color: "#8A4F1C",
    fontWeight: "600",
    fontFamily: "PPTelegraf-Bold",
    fontSize: 18,
  },
});
