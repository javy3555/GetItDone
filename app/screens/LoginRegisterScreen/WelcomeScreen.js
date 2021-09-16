import React, { useState } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import {
  Icon,
  Button,
  Input,
  NativeBaseProvider,
  Heading,
  Box,
  extendTheme,
  Center,
  VStack,
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../../firebase/config";
import Toast from "react-native-easy-toast";

function WelcomeScreen({ navigation }) {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#e3e8ff",
        100: "#b2baff",
        200: "#7f8cff",
        300: "#4d5eff",
        400: "#1d30fe",
        500: "#4d5eff",
        600: "#0011b3",
        700: "#000c81",
        800: "#000650",
        900: "#000120",
      },
      // Redefinig only one shade, rest of the color will remain same.
    },
  });
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <NativeBaseProvider safeArea theme={theme}>
        <Center flex={1}>
          <Box p={2} mt={5} w="90%" mx="auto">
            <VStack space={3} alignItems="center">
              <View style={styles.logoContainer}>
                <Text style={styles.title}>GetItDone</Text>
                <Image
                  style={styles.logo}
                  source={require("../../assets/checkmark.png")}
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
                        color: "primary.300",
                      }}
                      _dark={{
                        color: "gray.300",
                      }}
                    />
                  }
                  borderColor="primary.300"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  variant="rounded"
                  placeholder="Email"
                  _light={{
                    placeholderTextColor: "primary.300",
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
                        color: "primary.300",
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
                  borderColor="primary.300"
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
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    </KeyboardAvoidingView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  header2: {
    top: 50,
    fontSize: 30,
    color: "#575757",
  },
  inputText1: {
    height: 60,
    width: "90%",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginButton: {
    height: 52,
    width: "90%",
    borderRadius: 25,
  },
  forgotPasswordText: {
    left: 90,
    fontSize: 15,
    bottom: 20,
    color: "#a1a1aa",
  },
  signUpText: {
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
    alignItems: "center",
    bottom: 120,
    marginBottom: 50,
  },
});
