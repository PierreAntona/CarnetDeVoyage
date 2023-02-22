import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function TravelCard({ destination, start, end }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image />
      <View style={styles.header}>
        <Text style={styles.title}>{destination}</Text>
        <Text style={styles.date}>
          <Text style={styles.lightText}>Du </Text>
          {start}
          <Text style={styles.lightText}> au </Text>
          {end}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default TravelCard;

const styles = StyleSheet.create({
  container: {
    borderColor: "#3D7838",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FEFAE0",
    marginHorizontal: 25,
    marginBottom: 30,
    shadowColor: "#3D7838",
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
  },
  header: {
    padding: 10
  },
  title: {
    color: "#3D7838",
    fontFamily: "PPTelegraf-Bold",
    fontSize: 24,
    paddingBottom: 10
  },
  date: {
    fontFamily: "PPTelegraf-Regular",
    fontSize: 16
  },
  lightText: {
    fontFamily: 'PPTelegraf-Light'
  }
});
