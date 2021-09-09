import React, { useState } from "react";
import { Image, Text, StyleSheet, View } from "react-native";
import {
  Icon,
  Button,
  Input,
  NativeBaseProvider,
  Heading,
  Box,
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../firebase/config";
import Toast from "react-native-easy-toast";

function landingScreen({ navigation }) {
  return (
    <NativeBaseProvider safeArea>
      <View style={styles.background}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>GetItDone</Text>
          <Image
            style={styles.logo}
            source={require("../assets/checkmark.png")}
          ></Image>
          <Image
            style={styles.centerImage}
            source={require("../assets/landingCenter.png")}
          ></Image>
          <Text style={styles.header}>The only to-do app you need</Text>
          <Text style={styles.header2}>
            Planning the daily work has never been to simple
          </Text>
        </View>
        <Button
          style={styles.loginButton}
          onPress={() => navigation.navigate("WelcomeScreen")}
        >
          Login
        </Button>
        <Button
          style={styles.registerButton}
          onPress={() => navigation.navigate("Register")}
        >
          {" "}
          <Text style={{ color: "#5061FF", bottom: 8, fontWeight: "bold" }}>
            Registration
          </Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

export default landingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  header: {
    top: 150,
    fontSize: 25,
    color: "#575757",
  },
  header2: {
    top: 155,
    fontSize: 13,
    color: "#8B8B8B",
  },
  loginButton: {
    height: 50,
    width: "80%",
    bottom: 100,
    backgroundColor: "#5061FF",
    borderRadius: 25,
  },
  registerButton: {
    height: 50,
    width: "80%",
    bottom: 80,
    backgroundColor: "#ffffff",
    borderColor: "#5061FF",
    borderRadius: 25,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 30,
    bottom: 145,
    right: 115,
    fontWeight: "bold",
    color: "#0ea5e9",
  },
  forgotPasswordText: {
    bottom: 70,
    left: 90,
    fontSize: 20,
    color: "#a1a1aa",
  },
  signUpText: {
    bottom: 95,
    right: 90,
    fontSize: 20,
    color: "#a1a1aa",
  },
  logo: {
    width: 70,
    height: 71,
    top: 35,
    left: 130,
  },
  centerImage: {
    width: 206,
    height: 127,
    top: 100,
  },
  title: {
    top: 100,
    right: 35,
    fontSize: 45,
    fontFamily: "MontserratAlternatesMedium",
    color: "#5F5F5F",
  },
  logoContainer: {
    position: "absolute",
    top: 5,
    alignItems: "center",
  },
});
