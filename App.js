import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import "./app/firebase/config";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { KeyboardAvoidingView, Platform } from "react-native";
import WelcomeScreen from "./app/screens/LoginRegisterScreen/WelcomeScreen";
import RegisterScreen from "./app/screens/LoginRegisterScreen/RegisterScreen";
import homeScreen from "./app/screens/DashboardScreen/homeScreen";
import landingScreen from "./app/screens/landingScreen";
import settingsScreen from "./app/screens/DashboardScreen/settingsScreen";
import profileScreen from "./app/screens/DashboardScreen/profileScreen";
import useFonts from "./app/assets/hooks/useFonts";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const LoadFonts = async () => {
    await useFonts(); // We have to await this call here
  };

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="landingScreen"
          component={landingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerShown: false,
          }}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="homeScreen"
          component={homeScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="settingsScreen"
          component={settingsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profileScreen"
          component={profileScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
