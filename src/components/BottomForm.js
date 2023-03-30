import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  useWindowDimensions,
  Pressable,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const DEFAULT_HEIGHT = 560;

function useAnimatedBottom(isOpen, height = DEFAULT_HEIGHT) {
  const AnimatedValue = useRef(new Animated.Value(0));

  const bottom = AnimatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-height, 0],
  });

  useEffect(() => {
    if (isOpen) {
      Animated.timing(AnimatedValue.current, {
        toValue: 1,
        duration: 350,
        easing: Easing.bezier(0.28, 0, 0.63, 1),
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(AnimatedValue.current, {
        toValue: 0,
        duration: 250,
        easing: Easing.cubic,
        useNativeDriver: false,
      }).start();
    }
  }, [isOpen]);

  return bottom;
}

function bottomForm({
  isOpen,
  setIsOpen,
  height = DEFAULT_HEIGHT,
  children,
  title,
}) {
  const { height: screenHeight } = useWindowDimensions();
  const bottom = useAnimatedBottom(isOpen, height);

  return (
    <>
      <Pressable
        onPress={() => setIsOpen(false)}
        style={[
          styles.outerOverlay,
          { height: screenHeight },
          isOpen ? { display: "flex" } : { display: "none" },
        ]}
      >
        <View />
      </Pressable>
      <Animated.View style={[styles.container, { height, bottom }]}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={() => setIsOpen(false)}>
            <Entypo name="chevron-down" size={36} color="#8A4F1C" />
          </TouchableOpacity>
        </View>
        {children}
      </Animated.View>
    </>
  );
}

export default bottomForm;

const styles = StyleSheet.create({
  outerOverlay: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  container: {
    position: "absolute",
    width: "100%",
    zIndex: 3,
    backgroundColor: "#FEFAE0",
    borderColor: "#8A4F1C",
    borderWidth: 2,
    borderRadius: 50,
    padding: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 20,
  },
  title: {
    color: "#3D7838",
    fontSize: 24,
  },
});
