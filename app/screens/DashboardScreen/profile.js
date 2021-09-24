import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  NativeBaseProvider,
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Center,
  HStack,
  Spinner,
  Icon,
  Avatar,
  Image,
} from "native-base";
import Avatars from "../DashboardScreen/Components/avatars";
import { firebase } from "../../firebase/config";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../styles";
import styles from "../../assets/styles/registerStyles";
import AvatarModal from "./Components/avatarModal";

function profile({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [showModal, setShowModal] = useState(false);

  var user = firebase.auth().currentUser;
  var uid;

  if (user != null) {
    uid = user.uid;
  }

  const fetchList = async () => {
    setFullName(user.displayName);
    setEmail(user.email);
  };

  useEffect(() => {
    fetchList();
  }, [reauthenticateUser]); // removed lists from subscription []

  const changePassword = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    user.updatePassword(password);
  };

  const reauthenticateUser = () => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        if (fullName !== "") changeName();
        if (email !== "") changeEmail();
        if (password !== confirmPassword) {
          Alert.alert("Passwords do not match");
          return;
        }
        user.updatePassword(password);
        Alert.alert("Credentials changed successfully ");
      })
      .catch((error) => {
        console.log(error);
        // ...
      });
  };

  const changeEmail = () => {
    user.updateEmail(email);
  };

  const changeName = () => {
    user.updateProfile({ displayName: fullName });
  };

  const saveChanges = () => {
    reauthenticateUser();
  };

  const updateAvatar = async () => {
    setShowModal(false);
    await user.updateProfile({ photoURL: userAvatar });
    getAvatar();
    setUserAvatar("");
  };

  const getAvatar = () => {
    if ("Dog_1.png" == user.photoURL) return Avatars.dog1;
    if ("Dog_2.png" == user.photoURL) return Avatars.dog2;
    if ("Dog_3.png" == user.photoURL) return Avatars.dog3;
    if ("Dog_4.png" == user.photoURL) return Avatars.dog4;
    if ("Dog_5.png" == user.photoURL) return Avatars.dog5;
    if ("Dog_6.png" == user.photoURL) return Avatars.dog6;
    if ("Dog_7.png" == user.photoURL) return Avatars.dog7;
    if ("Dog_8.png" == user.photoURL) return Avatars.dog8;
    if ("Dog_9.png" == user.photoURL) return Avatars.dog9;
    if ("Dog_10.png" == user.photoURL) return Avatars.dog10;
    if ("Dog_11.png" == user.photoURL) return Avatars.dog11;
    if ("Dog_12.png" == user.photoURL) return Avatars.dog12;
    if ("Dog_13.png" == user.photoURL) return Avatars.dog13;
    if ("Dog_14.png" == user.photoURL) return Avatars.dog14;
    if ("Dog_15.png" == user.photoURL) return Avatars.dog15;
    if ("Dog_16.png" == user.photoURL) return Avatars.dog16;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <NativeBaseProvider safeArea theme={theme}>
        <Center style={{ paddingBottom: 110 }}>
          <Box w="90%" mx="auto" my="auto">
            <ImageBackground
              resizeMode="cover"
              source={getAvatar()}
              blurRadius={17}
              style={{
                width: "106%",
                height: 350,
                right: 21,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                style={{
                  flex: 1,
                  width: "110%",
                  backgroundColor: "rgba(0, 0, 0, .1)",
                }}
              >
                <Center>
                  <Text
                    style={{
                      color: "white",
                      marginTop: 90,
                      marginBottom: 20,
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    EDIT PROFILE
                  </Text>
                  <TouchableOpacity onPress={() => setShowModal(true)}>
                    <Avatar alignSelf="center" source={getAvatar()} size={150}>
                      <Avatar.Badge
                        h={10}
                        w={10}
                        bg="white"
                        style={{
                          marginBottom: 5,
                          marginRight: 5,
                        }}
                      >
                        <Icon
                          as={<MaterialIcons name="add-a-photo" />}
                          size={6}
                          ml="2"
                          color="muted.400"
                          alignSelf="center"
                          mt={1.5}
                          ml={0}
                        />
                      </Avatar.Badge>
                    </Avatar>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "white",
                      marginTop: 15,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {user.displayName}
                  </Text>
                </Center>
              </Box>
            </ImageBackground>
            <VStack space={5} pt={1}>
              <AvatarModal
                setUserAvatar={setUserAvatar}
                setShowModal={setShowModal}
                showModal={showModal}
                updateAvatar={() => updateAvatar()}
              />
              <View style={styles.inputText1}>
                <Input
                  borderColor="#5061FF"
                  onChangeText={(text) => setFullName(text)}
                  value={fullName}
                  placeholder="Username"
                  variant="underlined"
                  _light={{
                    placeholderTextColor: "muted.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              </View>
              <View style={styles.inputText1}>
                <Input
                  borderColor="#5061FF"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  placeholder="Email"
                  variant="underlined"
                  _light={{
                    placeholderTextColor: "muted.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="email" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              </View>
              <View style={styles.inputText1}>
                <Input
                  borderColor="#5061FF"
                  onChangeText={(text) => setCurrentPassword(text)}
                  value={currentPassword}
                  placeholder="Current Password"
                  variant="underlined"
                  _light={{
                    placeholderTextColor: "muted.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              </View>
              <View style={styles.inputText1}>
                <Input
                  borderColor="#5061FF"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  placeholder="New Password"
                  variant="underlined"
                  _light={{
                    placeholderTextColor: "muted.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              </View>
              <View style={styles.inputText1}>
                <Input
                  borderColor="#5061FF"
                  onChangeText={(text) => setConfirmPassword(text)}
                  value={confirmPassword}
                  placeholder="Confirm password"
                  variant="underlined"
                  _light={{
                    placeholderTextColor: "muted.400",
                  }}
                  _dark={{
                    placeholderTextColor: "blueGray.50",
                  }}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="lock" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
              </View>
              <Button
                style={styles.registerButton}
                onPress={() => saveChanges()}
              >
                Save
              </Button>
            </VStack>
          </Box>
        </Center>
      </NativeBaseProvider>
    </KeyboardAvoidingView>
  );
}

export default profile;
