import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import axios from "axios";
import countryToCurrency from "country-to-currency";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_PLACES_API_KEY, UNSPLASH_ACCESS_KEY } from "@env";
import { createApi } from "unsplash-js";
import { digitalDate } from "../../utils/dateFormating";
import { refreshTravels } from "../../utils/signals";

function NewTravel({ user, setIsOpen }) {
  const [startDate, setStartDate] = useState(new Date());
  const [openStartDateModal, setOpenStartDateModal] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [openEndDateModal, setOpenEndDateModal] = useState(false);
  const [error, setError] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [timezone, setTimezone] = useState("");
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState(null);
  const [destination, setDestination] = useState({
    place_id: "",
    name: "",
  });

  useEffect(() => {
    if (currency) {
      async function saveTravel() {
        const docRef = doc(db, user, "user");
        const docSnap = await getDoc(docRef);
        const id = JSON.stringify(docSnap.data().travels.length + 1);

        await updateDoc(docRef, {
          travels: arrayUnion({
            id: id,
            destination: destination,
            country: country,
            timezone: timezone,
            currency: currency,
            photoUrl: photoUrl,
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
            setDestination({
              place_id: "",
              name: "",
            })
            setStartDate(new Date());
            setEndDate(new Date());
            refreshTravels.dispatch();
          })
          .catch((e) => {
            setError(e.message);
          });

        setCurrency(null);
      }

      saveTravel();
    }
  }, [currency]);

  const unsplashApi = createApi({
    accessKey: UNSPLASH_ACCESS_KEY,
  });

  const configTimezone = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${destination.place_id}&key=${GOOGLE_PLACES_API_KEY}`,
    Headers: {},
  };

  const setUpTravel = () => {
    axios(configTimezone)
      .then((res) => {
        setTimezone(parseInt(res.data.result.utc_offset - 60) / 60);
        res.data.result.address_components.forEach((element) => {
          if (element.types[0] === "country") {
            setCountry(element.short_name);
            setCurrency(countryToCurrency[element.short_name]);
          }
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <GooglePlacesAutocomplete
        placeholder="Destination"
        onPress={(data, details = null) => {
          setDestination({
            place_id: data.place_id,
            name: data.terms[0].value,
          });

          unsplashApi.search
            .getPhotos({
              query: data.terms[0].value.toLowerCase(),
              orientation: "landscape",
            })
            .then((result) => {
              setPhotoUrl(result.response.results[0].urls.regular);
            })
            .catch((error) => {
              console.log(error);
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
            marginBottom: 42
          },
          textInput: {
            borderBottomWidth: 1,
            fontSize: 18,
            fontFamily: "NotoSans-Light",
            width: "100%",
            height: 50,
            backgroundColor: 'transparent',
            paddingLeft: 0,
          },
          poweredContainer: {
            display: "none",
          },
          separator: {
            color: "#000",
            height: 0
          },
          row: {
            backgroundColor: "transparent",
            borderBottomWidth: 0.5,
            borderBottomColor: "#000"
          },
          description: {
            color: "#000",
            fontSize: 18,
            fontFamily: "NotoSans-Light",

          },
        }}
      />
      <TextInput
        style={styles.input}
        value={digitalDate(startDate)}
        onFocus={() => setOpenStartDateModal(true)}
        placeholder="Date de début"
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

      <TextInput
        style={styles.input}
        value={digitalDate(endDate)}
        onFocus={() => setOpenEndDateModal(true)}
        placeholder="Date de fint"
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
      <TouchableOpacity onPress={() => setUpTravel()} style={styles.button}>
        <Text style={styles.buttonText}>Ajouter</Text>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default NewTravel;

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
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "Playfair-Regular",
  },
  arrow: {
    fontSize: 20,
    fontFamily: "NotoSans-Light",
    marginLeft: 10
  }
});
