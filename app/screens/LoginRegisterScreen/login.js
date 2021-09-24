import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  Icon,
  Button,
  Input,
  NativeBaseProvider,
  Box,
  Center,
  VStack,
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../../firebase/config";
import theme from "../styles";
import styles from "../../assets/styles/loginStyles";

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

        navigation.navigate("Drawer");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorMessage);
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
                  source={require("../../assets/icons/checkmark.png")}
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
                    show ? (
                      <Icon
                        as={<MaterialIcons name="visibility" />}
                        size={7}
                        m={2}
                        mr={3}
                        color="muted.400"
                        onPress={handleClick}
                      />
                    ) : (
                      <Icon
                        as={<MaterialIcons name="visibility-off" />}
                        size={7}
                        m={2}
                        mr={3}
                        color="muted.400"
                        onPress={handleClick}
                      />
                    )
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
                <Text
                  style={{ fontSize: 15, color: "white", fontWeight: "bold" }}
                >
                  Log in
                </Text>
              </Button>
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
