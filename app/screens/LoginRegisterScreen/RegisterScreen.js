import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Center,
} from "native-base";
import { firebase } from "../../firebase/config";
import theme from "../styles";
import styles from "../../assets/styles/registerStyles";

function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  var avatar;

  const doRegister = (e) => {
    e.preventDefault(); // to prevent webpage from realoading on submit each time login is pressed.

    avatar = `Dog_${Math.floor(Math.random() * 16) + 1}.png`;

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

        firebase.auth().currentUser.updateProfile({
          displayName: data.fullName,
          photoURL: avatar,
        });

        // Add data to user's db reference
        firebase
          .database()
          .ref("users/" + uid + "/credentials/")
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <NativeBaseProvider safeArea theme={theme}>
        <Center flex={1}>
          <Box p={2} mt={16} w="90%" mx="auto">
            <VStack space={5} mt={2}>
              <Image
                style={styles.centerImage}
                source={require("../../assets/images/registerCenter.png")}
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
        </Center>
      </NativeBaseProvider>
    </KeyboardAvoidingView>
  );
}

export default RegisterScreen;
