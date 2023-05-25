import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-url-polyfill/auto";
import Connexion from "./src/screens/Connexion";
import Home from "./src/screens/Home";
import Planning from "./src/screens/Planning";
import Memories from "./src/screens/Memories";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Image, View } from "react-native";
import * as Font from "expo-font";
import * as Network from 'expo-network';

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // SplashScreen.preventAutoHideAsync();
    async function prepare() {
      try {
        await Font.loadAsync({
          "Playfair-Regular": require("./assets/fonts/PlayfairDisplay-Regular.ttf"),
          "Playfair-Bold": require("./assets/fonts/PlayfairDisplay-Bold.ttf"),
          "Playfair-Black": require("./assets/fonts/PlayfairDisplay-Black.ttf"),
          "NotoSans-Light": require("./assets/fonts/NotoSans-Light.ttf"),
          "NotoSans-Regular": require("./assets/fonts/NotoSans-Regular.ttf")
        });
        await new Promise(resolve => setTimeout(resolve, 800));
      } catch (e) {
        console.log(e);
      } finally {
        setAppIsReady(true);
      }
    }
    
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#100D05",
          justifyContent: "center",
          alignItems: "center"
        }}
        onLayout={onLayoutRootView}
      >
        <Image source={require('./assets/splash.png')} style={{ width: "100%", height: "100%" }} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Connexion"
          component={Connexion}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Planning"
          component={Planning}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Memories"
          component={Memories}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
