import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GOOGLE_PLACES_API_KEY, FREE_CURRENCY_API } from "@env";
import axios from "axios";
import countryToCurrency from "country-to-currency";

function TravelCard({ destination, start, end, image, place_id }) {
  const [isVerso, setIsVerso] = useState(false);
  const [timeZone, setTimeZone] = useState();
  const [country, setCountry] = useState();
  const [currency, setCurrency] = useState();

  useEffect(() => {
    if (!country) {
      axios(configTimezone)
        .then((res) => {
          setTimeZone(parseInt(res.data.result.utc_offset - 60) / 60);
          res.data.result.address_components.forEach((element) => {
            if (element.types[0] === "country")
              setCountry(countryToCurrency[element.short_name]);
          });
        })
        .catch((e) => console.log(e));
    }

    // if (!currency) {
    //   axios(configCurrency)
    //     .then((res) => {
    //       console.log(res);
    //     })
    //     .catch((e) => console.log(e));
    // }
  }, [country, currency]);

  const configTimezone = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_PLACES_API_KEY}`,
    Headers: {},
  };

  const configCurrency = {
    method: "get",
    url: `https://api.freecurrencyapi.com/v1/latest?apikey=${FREE_CURRENCY_API}&currencies=USD%2EUR%2${country}`,
    Headers: {},
  };

  const RectoCard = () => {
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: "#FEFAE0" }]}
        onPress={() => setIsVerso(!isVerso)}
      >
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.header}>
          <Text style={[styles.title, { color: "#3D7838" }]}>
            {destination}
          </Text>
          <Text style={[styles.date, { color: "#234520" }]}>
            <Text style={styles.lightText}>Du </Text>
            {start}
            <Text style={styles.lightText}> au </Text>
            {end}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const VersoCard = () => {
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: "#3D7838" }]}
        onPress={() => setIsVerso(!isVerso)}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: "#FEFAE0" }]}>
            {destination}
          </Text>
          <Text style={[styles.date, { color: "#FEFAE0" }]}>
            <Text style={styles.lightText}>Du </Text>
            {start}
            <Text style={styles.lightText}> au </Text>
            {end}
          </Text>
        </View>
        <View style={styles.bottomPart}>
          <View style={styles.informationsRow}>
            <Image
              source={require("../../assets/icon_time.png")}
              style={styles.icon}
            />
            <Text style={styles.informations}>
              {timeZone} heure(s) de différence avec la France
            </Text>
          </View>
          <View style={styles.informationsRow}>
            <Image
              source={require("../../assets/icon_currency.png")}
              style={styles.icon}
            />
            <Text style={styles.informations}>1 EUR vaut {country}</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Planification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Souvenirs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return isVerso ? <VersoCard /> : <RectoCard />;
}

export default TravelCard;

const styles = StyleSheet.create({
  container: {
    borderColor: "#3D7838",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 30,
    marginBottom: 30,
    shadowColor: "#3D7838",
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
  },
  header: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 105,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontFamily: "PPTelegraf-Bold",
    fontSize: 24,
    paddingBottom: 10,
  },
  date: {
    fontFamily: "PPTelegraf-Regular",
    fontSize: 16,
  },
  lightText: {
    fontFamily: "PPTelegraf-Light",
  },
  bottomPart: {
    height: 105,
    backgroundColor: "#FEFAE0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: "space-between",
  },
  informationsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  informations: {
    color: "#234520",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: 160,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#3D7838",
    borderRadius: 5,
  },
  buttonText: {
    color: "#3D7838",
    fontFamily: "PPTelegraf-Bold",
    fontSize: 16,
  },
});
