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

function WelcomeScreen({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  const doLogin = (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const user = firebase.auth().currentUser;

        navigation.navigate("homeScreen");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.toast.show(errorMessage, 600);
      });
  };

  return (
    <NativeBaseProvider afeArea>
      <View style={styles.background}>
        <View style={styles.logoContainer}>
          <Text style={styles.title}>GetItDone</Text>
          <Image
            style={styles.logo}
            source={require("../assets/checkmark.png")}
          ></Image>
          <Text style={styles.header2}>Log in</Text>
        </View>
        <View style={styles.inputText1}>
          <Input
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size="md"
                m={2}
                _light={{
                  color: "#5061FF",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            borderColor="#5061FF"
            onChangeText={(text) => setEmail(text)}
            value={email}
            variant="rounded"
            placeholder="Email"
            _light={{
              placeholderTextColor: "#5061FF",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
        </View>
        <View style={styles.inputText1}>
          <Input
            type={show ? "text" : "password"}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="lock" />}
                size="md"
                m={2}
                _light={{
                  color: "#5061FF",
                }}
                _dark={{
                  color: "gray.300",
                }}
              />
            }
            InputRightElement={
              <Button
                size="sm"
                bg="#5061FF"
                mr={2}
                roundedLeft="md"
                roundedRight="md"
                onPress={handleClick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            }
            borderColor="#5061FF"
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            variant="rounded"
            _light={{
              placeholderTextColor: "#5061FF",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
        </View>
        <Text
          style={styles.forgotPasswordText}
          onPress={() => navigation.navigate("Register")}
        >
          Forgot password?
        </Text>
        <Button style={styles.loginButton} onPress={doLogin}>
          Log in
        </Button>
        {/*}
        <Toast
          ref={(toast) => (this.toast = toast)}
          style={{ backgroundColor: "red", padding: 15 }}
          position="bottom"
          positionValue={250}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.9}
          textStyle={{ color: "white" }}
        />
          */}
        <View>
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("Register")}
          >
            Registration
          </Text>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  background2: {
    top: 340,
    width: "100%",
  },
  header2: {
    top: 50,
    fontSize: 30,
    color: "#575757",
  },
  inputText1: {
    height: 60,
    bottom: 200,
    width: "84%",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginButton: {
    height: 52,
    width: "84%",
    bottom: 180,
    backgroundColor: "#5061FF",
    borderRadius: 25,
  },
  registerButton: {
    borderRadius: 10,
    height: 50,
    width: "75%",
    bottom: 100,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 0.2, height: 0.2 },
  },
  buttonText: {
    fontSize: 30,
    bottom: 145,
    right: 115,
    fontWeight: "bold",
    color: "#0ea5e9",
  },
  forgotPasswordText: {
    bottom: 205,
    left: 110,
    fontSize: 15,
    color: "#a1a1aa",
  },
  signUpText: {
    bottom: 140,
    fontSize: 20,
    color: "#5061FF",
    alignItems: "center",
  },
  logo: {
    width: 70,
    height: 71,
    top: 35,
    left: 130,
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
