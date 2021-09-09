import React, { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Image, Text } from "react-native";
import { firebase } from "../firebase/config";
import Toast, { DURATION } from "react-native-easy-toast";
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Icon,
  IconButton,
  HStack,
} from "native-base";

function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const doRegister = (e) => {
    e.preventDefault(); // to prevent webpage from realoading on submit each time login is pressed.

    // If passwords don't match
    if (password !== confirmPassword) {
      //alert("Passwords don't match.")
      setMessage("Passwords don't match.");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          fullName,
        };

        // Add data to user's db reference
        firebase
          .database()
          .ref("users/" + uid)
          .set(data)
          .then(() => {})
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            //this.toast.show(errorMessage, 600);
          });
        navigation.navigate("WelcomeScreen");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        //this.toast.show(errorMessage, 600);
      });
  };

  return (
    <NativeBaseProvider>
      <Box safeArea flex={1} p={2} mt={16} w="90%" mx="auto">
        {/*<Toast
          ref={(toast) => (this.toast = toast)}
          style={{ backgroundColor: "red", padding: 15 }}
          position="bottom"
          positionValue={250}
          fadeInDuration={750}
          fadeOutDuration={1000}
          opacity={0.9}
          textStyle={{ color: "white" }}
        />*/}

        <VStack space={5} mt={2}>
          <Image
            style={styles.centerImage}
            source={require("../assets/registerCenter.png")}
          ></Image>
          <Heading size="2xl" style={styles.header}>
            Create account
          </Heading>
          <VStack space={5} mt={1}>
            <View style={styles.inputText1}>
              <Input
                borderColor="#5061FF"
                onChangeText={(text) => setFullName(text)}
                value={fullName}
                placeholder="Username"
                variant="rounded"
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
                borderColor="#5061FF"
                onChangeText={(text) => setEmail(text)}
                value={email}
                placeholder="Email"
                variant="rounded"
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
            <View style={styles.inputText1}>
              <Input
                borderColor="#5061FF"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                placeholder="Confirm password"
                variant="rounded"
                _light={{
                  placeholderTextColor: "#5061FF",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
              />
            </View>
            <Button style={styles.registerButton} onPress={doRegister}>
              Register
            </Button>
            <Text style={styles.bottomText}>Already have account?</Text>
            <Text
              style={styles.loginButton}
              onPress={() => navigation.navigate("WelcomeScreen")}
            >
              Login
            </Text>
          </VStack>
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 6,
    shadowRadius: 5,
    shadowOffset: { width: 0.5, height: 0.5 },
  },
  header: {
    color: "#5F5F5F",
  },
  registerButton: {
    height: 52,
    backgroundColor: "#5061FF",
    borderRadius: 25,
  },
  centerImage: {
    width: 351,
    height: 185,
    bottom: 40,
    left: 0,
  },
  bottomText: {
    left: 67,
    fontSize: 16,
    color: "#9A9A9A",
  },
  loginButton: {
    bottom: 39,
    left: 236,
    fontSize: 16,
    color: "#5061FF",
  },
});
