import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { FREE_CURRENCY_API } from "@env";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const CardDetails = ({ destination, start, end, navigation, user, network }) => {
  const [exchangeRate, setExchangeRate] = useState("");

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

  return (
    <View style={cdStyles.container}>
      <Text style={cdStyles.title}>{destination.destination.name}</Text>
      <Text style={cdStyles.date}>
        {start} - {end}
      </Text>
      <View style={cdStyles.details}>
        {destination.timezone === 0 ?
          <Text style={cdStyles.detailsText}>Heure de Paris</Text> :
          <Text style={cdStyles.detailsText}>
            {destination.timezone > 0 && "+"}
            {destination.timezone}
            {destination.timezone > 1 || destination.timezone < -1
              ? " heures"
              : " heure"}
          </Text>
        }
        {destination.currency === "EUR" ?
          <Text style={cdStyles.detailsText}>Euro</Text> :
          <Text style={cdStyles.detailsText}>
            1 EUR = {exchangeRate} {destination.currency}
          </Text>
        }
      </View>
      <View style={cdStyles.buttons}>
        <TouchableOpacity
          style={cdStyles.button}
          onPress={() =>
            navigation.navigate("Planning", {
              destination: destination.destination.name,
              user: user,
              network: network
            })
          }
        >
          <Text style={cdStyles.buttonText}>Planification</Text>
          <Text style={cdStyles.arrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={cdStyles.button}
          onPress={() =>
            navigation.navigate("Memories", {
              destination: destination.destination.name,
              user: user,
              network: network
            })
          }
        >
          <Text style={cdStyles.buttonText}>Souvenirs</Text>
          <Text style={cdStyles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const cdStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingHorizontal: 13,
  },
  title: {
    fontSize: 36,
    fontFamily: "Playfair-Bold",
    color: "#FFF",
  },
  date: {
    fontSize: 18,
    fontFamily: "NotoSans-Light",
    color: "#FFF",
  },
  details: {
    borderLeftColor: "#FFF",
    borderLeftWidth: 1,
    marginVertical: 13,
    paddingLeft: 8,
  },
  detailsText: {
    fontFamily: "NotoSans-Light",
    fontSize: 14,
    color: "#FFF",
  },
  buttons: {
    flexDirection: "row",
    zIndex: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 30,
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
    marginLeft: 10,
  },
});

function TravelCard({ navigation, user, destination, start, end, network }) {
  const [destinationNameWidth, setDestinationNameWidth] = useState(0);
  const [isSlide, setIsSlide] = useState(false);
  const [index, setIndex] = useState(1);

  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const { width } = useWindowDimensions();

  const slideRight = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: width - 150,
        duration: 800,
        easing: Easing.bezier(0.28, 0, 0.63, 1),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
    ]).start();
    setIsSlide(true);
    setTimeout(() => {
      setIndex(0);
    }, 700);
  };

  const slideLeft = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
    ]).start();
    setIsSlide(false);
    setTimeout(() => {
      setIndex(1);
    }, 100);
  };

  return (
    <TouchableOpacity onPress={() => (!isSlide && network ? slideRight() : slideLeft())}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateX: slideAnim }],
              zIndex: network ? index : 0,
            },
          ]}
        >
          <Animated.Text
            onLayout={(e) => setDestinationNameWidth(e.nativeEvent.layout.width)}
            numberOfLines={1}
            style={[
              styles.destinationName,
              {
                transform: [
                  { translateX: -1 * (destinationNameWidth / 2) },
                  { rotate: "-90deg" },
                  { translateX: destinationNameWidth / 2 },
                ],
                opacity: network ? fadeAnim : 0,
              },
            ]}
          >
            {destination.destination.name}
          </Animated.Text>
          <LinearGradient
            colors={["#100D05", "rgba(16, 13, 5, 0)"]}
            style={styles.gradient}
            start={{ x: 0.125, y: 0.5 }}
            end={{ x: 0.75, y: 0.2 }}
          />
          <Image style={[styles.image,{opacity: network ? 1 : 0}]} source={{ uri: destination.photoUrl }} />
        </Animated.View>
      <CardDetails
        destination={destination}
        start={start}
        end={end}
        navigation={navigation}
        user={user}
        network={network}
      />
    </TouchableOpacity>
  );
}

export default TravelCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 34,
  },
  image: {
    width: "100%",
    height: 165,
  },
  destinationName: {
    color: "#FFF",
    position: "absolute",
    bottom: -35,
    maxWidth: 165,
    left: 18,
    zIndex: 3,
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
  gradient: {
    position: "absolute",
    width: "100%",
    height: 165,
    zIndex: 2,
  },
});
