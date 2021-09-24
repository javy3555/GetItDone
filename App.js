import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import "./app/firebase/config";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { KeyboardAvoidingView, Platform } from "react-native";
import Login from "./app/screens/LoginRegisterScreen/login";
import Register from "./app/screens/LoginRegisterScreen/register";
import Drawer from "./app/screens/DashboardScreen/drawer";
import landingScreen from "./app/screens/landingScreen";
import Support from "./app/screens/DashboardScreen/support";
import profile from "./app/screens/DashboardScreen/profile";
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
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerShown: false,
          }}
          component={Register}
        />
        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Support"
          component={Support}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          component={profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
