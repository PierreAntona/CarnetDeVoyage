import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FREE_CURRENCY_API } from "@env";
// import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";

function TravelCard({ navigation, user, destination, start, end }) {
  const [isVerso, setIsVerso] = useState(false);
  const [exchangeRate, setExchangeRate] = useState("");
  const [destinationNameWidth, setDestinationNameWidth] = useState(0);

  useEffect(() => {
    if (exchangeRate === "") {
      if (destination.currency !== "EUR") {
        axios(configCurrency)
          .then((res) => {
            setExchangeRate(Object.values(res.data.data)[0].toFixed(2));
          })
          .catch((e) => console.log(e));
      } else {
        setExchangeRate("1");
      }
    }
  }, [destination.currency]);

  const configCurrency = {
    method: "get",
    url: `https://api.freecurrencyapi.com/v1/latest?apikey=${FREE_CURRENCY_API}&currencies=${destination.currency}&base_currency=EUR`,
    Headers: {},
  };

  const RectoCard = () => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsVerso(!isVerso)}
      >
        <Text
          onLayout={(e) => setDestinationNameWidth(e.nativeEvent.layout.width)}
          numberOfLines={2}
          style={[
            styles.destinationName,
            {
              transform: [
                { translateX: -1 * (destinationNameWidth / 2) },
                { rotate: "-90deg" },
                { translateX: destinationNameWidth / 2 },
              ],
            },
          ]}
        >
          {destination.destination.name}
        </Text>
        {/* <LinearGradient 
          colors={["#100D05", "rgba(16, 13, 5, 0)"]}
        /> */}
        <Image style={styles.image} source={{ uri: destination.photoUrl }} />
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
            {destination.destination.name}
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
            <Text style={styles.informations}>
              {destination.timezone} heure(s) de différence avec la France
            </Text>
          </View>
          <View style={styles.informationsRow}>
            <Text style={styles.informations}>
              {exchangeRate === "1"
                ? "La devise utilisée est l'euro"
                : `1 EUR vaut ${exchangeRate} ${destination.currency}`}
            </Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Planning", {
                  destination: destination.destination.name,
                  user: user,
                })
              }
            >
              <Text style={styles.buttonText}>Planification</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("Memories", {
                  destination: destination.destination.name,
                  user: user,
                })
              }
            >
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
    marginBottom: 34,
  },
  image: {
    width: "100%",
    height: 155,
  },
  destinationName: {
    color: "#FFF",
    position: "absolute",
    bottom: -35,
    maxWidth: 155,
    left: 18,
    zIndex: 10,
    fontFamily: "Playfair-Bold",
    fontSize: 36,
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
    fontSize: 16,
  },
});
