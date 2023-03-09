import { SafeAreaView, StyleSheet, Text } from "react-native";

function Memories({ route }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>MEMORIES {route.params.destination}</Text>
    </SafeAreaView>
  );
}

export default Memories;

const styles = StyleSheet.create({
  container: {},
});
