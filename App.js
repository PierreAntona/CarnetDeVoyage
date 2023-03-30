import "expo-dev-client";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-url-polyfill/auto";
import Connexion from "./src/screens/Connexion";
import Home from "./src/screens/Home";
import Planning from "./src/screens/Planning";
import Memories from "./src/screens/Memories";
import useFonts from "./src/hooks/useFonts";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts();
      } catch (e) {
        console.warn(e);
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
    return null;
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
