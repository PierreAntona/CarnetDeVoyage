import * as Font from "expo-font";

export default useFonts = async () => {
  await Font.loadAsync({
    "Playfair-Regular": require("../../assets/fonts/PlayfairDisplay-Regular.ttf"),
    "Playfair-Bold": require("../../assets/fonts/PlayfairDisplay-Bold.ttf"),
    "Playfair-Black": require("../../assets/fonts/PlayfairDisplay-Black.ttf"),
    "NotoSans-Light": require("../../assets/fonts/NotoSans-Light.ttf"),
  });
};
