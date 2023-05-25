import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  Easing,
  useWindowDimensions,
  Pressable,
  View,
  Text,
} from "react-native";

const DEFAULT_HEIGHT = 675;

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

function BottomForm({
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
      </Pressable>
      <Animated.View style={[styles.container, { height, bottom }]}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
        {children}
      </Animated.View>
    </>
  );
}

export default BottomForm;

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
    backgroundColor: "#E5CA93",
    padding: 13,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Playfair-Regular',
    marginBottom: 30
  }
});
