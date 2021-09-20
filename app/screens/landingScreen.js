import React from "react";
import { Image, Text, View } from "react-native";
import { Button, NativeBaseProvider } from "native-base";
import styles from "../assets/styles/landingStyles";

function landingScreen({ navigation }) {
  return (
    <NativeBaseProvider safeArea>
      <View style={styles.background}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>GetItDone</Text>
          <Image
            style={styles.logo}
            source={require("../assets/icons/checkmark.png")}
          ></Image>
          <Image
            style={styles.centerImage}
            source={require("../assets/images/landingCenter.png")}
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
          <Text style={styles.registerText}>Registration</Text>
        </Button>
      </View>
    </NativeBaseProvider>
  );
}

export default landingScreen;
