import React, { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";

const Panel = ({
    panelIsOpen,
    setPanelIsOpen,
    children,
    title,
}) => {

    const slideAnim = useRef(new Animated.Value(0)).current;
    const { height: screenHeight } = useWindowDimensions();

    useEffect(() => {
        panelIsOpen ? slideLeft() : slideRight();
    }, [panelIsOpen])

    const slideLeft = () => {
        Animated.timing(slideAnim, {
            toValue: -300,
            duration: 400,
            easing: Easing.bezier(0.28, 0, 0.63, 1),
            useNativeDriver: true,
        }).start();
    }

    const slideRight = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 400,
            easing: Easing.cubic,
            useNativeDriver: true,
        }).start();
    }

    return (
        <>
            <Pressable
                onPress={() => setPanelIsOpen(false)}
                style={[
                    styles.outerOverlay,
                    { height: screenHeight },
                    panelIsOpen ? { display: "flex" } : { display: "none" }
                ]}
            >
            </Pressable>
            <Animated.View
                style={[
                    styles.container,
                    { height: screenHeight },
                    {
                        transform: [{ translateX: slideAnim }]
                    }
                ]}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                {children}
            </Animated.View>
        </>
    )
}

export default Panel;

const styles = StyleSheet.create({
    outerOverlay: {
        position: "absolute",
        width: "100%",
        zIndex: 1,
    },
    container: {
        position: "absolute",
        width: 300,
        zIndex: 3,
        backgroundColor: "#E5CA93",
        paddingHorizontal: 12,
        paddingVertical: 32,
        top: 0,
        right: -300
    },
    title: {
        fontSize: 32,
        fontFamily: 'Playfair-Regular',
        marginBottom: 30,
        textAlign: "center"
    }
})