import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import BottomForm from "../components/animated/BottomForm";
import NewStep from "../components/forms/NewStep";
import { LinearGradient } from "expo-linear-gradient";
import StepCard from "../components/cards/StepCard";
import Panel from "../components/animated/Panel";
import Checklist from "../components/Checklist";
import { refreshPlanning } from "../utils/signals";
import { textDate } from "../utils/dateFormating";

function Planning({ navigation, route }) {
  const [planning, setPlanning] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const [startDate, setStartDate] = useState();

  useEffect(() => {
    if (!planning.length > 0) {
      getPlanning();
    }

    const showPlanning = refreshPlanning.add(refreshSteps);
    return () => {
      refreshPlanning.detach(showPlanning);
    };
  }, []);

  const refreshSteps = () => {
    setPlanning([]);
    getPlanning();
  };

  const getPlanning = async () => {
    const docRef = collection(
      db,
      route.params.user,
      route.params.destination,
      "planning"
    );
    const querySnapshot = await getDocs(docRef);

    const planningData = [];

    querySnapshot.forEach((doc) => {
      planningData.push(doc.data());
    });

    planningData.sort(function (x, y) {
      return x.date - y.date;
    })

    setPlanning(planningData)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Planification</Text>
        <TouchableOpacity style={styles.button} onPress={() => setPanelIsOpen(true)}>
          <Text style={styles.buttonText}>
            Ma valise
          </Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      <Panel
        panelIsOpen={panelIsOpen}
        setPanelIsOpen={setPanelIsOpen}
        children={<Checklist user={route.params.user} destination={route.params.destination} />}
        title={"Ma valise"}
      />

      <FlatList
        style={styles.list}
        data={planning}
        renderItem={(step) => (
          <StepCard
            index={step.index}
            data={step.item}
            previousDate={planning[step.index - 1] ? textDate(planning[step.index - 1].date) : null}
          />
        )}
        keyExtractor={(step) => step.reference ?? step.name ?? step.line}
      />

      <LinearGradient
        colors={["#100D05", "rgba(16, 13, 5, 0)"]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0.5, y: 0 }}
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            position: "absolute",
            zIndex: 2,
            bottom: 50,
          },
        ]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.buttonText}>Nouvelle étape</Text>
        <Text style={styles.arrow}>↑</Text>
      </TouchableOpacity>

      <BottomForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        children={
          <NewStep
            setIsOpen={setIsOpen}
            user={route.params.user}
            destination={route.params.destination}
            startDate={startDate}
          />
        }
        title={"Nouvelle étape"}
      />
    </SafeAreaView>
  );
}

export default Planning;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#100D05",
    flex: 1,
  },
  header: {
    paddingHorizontal: 18,
    marginBottom: 30,
  },
  title: {
    fontFamily: "Playfair-Black",
    fontSize: 56,
    color: "#E5CA93",
  },
  list: {
    marginBottom: 40
  },
  button: {
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "center",
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
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    zIndex: 0,
  },
});
