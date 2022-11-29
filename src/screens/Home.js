import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

function Home({ navigation, route }) {
  console.log(route.params);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Text>HOME</Text>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {},
});
