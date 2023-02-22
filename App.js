import 'expo-dev-client'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from "react";

import Connexion from "./src/screens/Connexion";
import Home from "./src/screens/Home";

//SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'PollerOne': require('./assets/fonts/PollerOne-Regular.ttf'),
    'PPTelegraf-Regular': require('./assets/fonts/PPTelegraf-Regular.otf'),
    'PPTelegraf-Bold': require('./assets/fonts/PPTelegraf-UltraBold.otf'),
    'PPTelegraf-Light': require('./assets/fonts/PPTelegraf-UltraLight.otf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
