import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

function Planning({ navigation, route }) {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home", route.params.user)}>
          <Entypo name="chevron-left" size={36} color="#8A4F1C" />
        </TouchableOpacity>
        <Text style={styles.title}>Planification</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.checklistButton}>Ma valise</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Planning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFAE0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 10
  },
  title: {
    fontFamily: "PollerOne",
    color: "#3D7838",
    fontSize: 36,
    marginLeft: 20,
  },
  checklistButton: {
   textAlign: "center",
   fontFamily: 'PPTelegraf-Regular',
   fontSize: 20,
   color: '#8A4F1C',
   textDecorationStyle: "solid",
   textDecorationColor: "#8A4F1C",
   textDecorationLine: 1
  }
});
