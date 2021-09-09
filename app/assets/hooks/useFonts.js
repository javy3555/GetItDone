import * as Font from "expo-font";

const useFonts = async () => {
  await Font.loadAsync({
    MontserratAlternatesRegular: require("../fonts/MontserratAlternates-Regular.ttf"),
    MontserratAlternatesBold: require("../fonts/MontserratAlternates-Bold.ttf"),
    MontserratAlternatesMedium: require("../fonts/MontserratAlternates-Medium.ttf"),
  });
};

export default useFonts;
