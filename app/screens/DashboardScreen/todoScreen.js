import React from "react";
import { useState, useEffect } from "react";
import {
  Input,
  Box,
  Fab,
  Button,
  Text,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  NativeBaseProvider,
  Actionsheet,
  PresenceTransition,
  Spinner,
} from "native-base";
import moment from "moment";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import {
  Platform,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebase } from "../../firebase/config";
import Calendar from "./Components/calendar";
import Swipe from "./Components/swipe";
import theme from "../styles";

export default function ({ navigation }) {
  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [date2, setDate] = useState(new Date(Date.now()));
  const [calendarDate, setCalendarDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleted, setIscompleted] = useState(false);
  const [taskName, setTaskName] = React.useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [level, setLevel] = useState("");
  const [isMounted, setIsMounted] = useState(true);

  const userData = [];
  var user = firebase.auth().currentUser;
  var uid;

  if (user != null) {
    uid = user.uid;
  }

  const fetchList = async () => {
    const response = firebase.database().ref("users/" + uid + "/tasks");
    await response.once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        userData.push({
          ...childSnapshot.val(),
          key: childSnapshot.key,
        });
      });
    });
    setList(userData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, [isMounted, calendarDate]); // removed lists from subscription []

  /**
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */

  const addItem = (e) => {
    setIsMounted(!isMounted);

    var task = {
      task: taskName,
      level: level,
      isCompleted: isCompleted,
      date: moment(date2).format("YYYY-MM-DD"),
      time: moment(date2).format("h:mm A"),
      userId: uid,
    };

    firebase
      .database()
      .ref("/users/" + uid + "/tasks")
      .push(task);

    setDate(new Date(Date.now()));
    setTaskName("");
    setLevel("");
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const onChange = (event, selectedDate) => {
    //setIsMounted(!isMounted);
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (flag) => {
    setIsOpen(flag);
    setShow(true);
  };

  const handleLevel = (level) => {
    setLevel(level);
  };

  return (
    <>
      {isLoading && (
        <NativeBaseProvider theme={theme}>
          <Center flex={1}>
            <HStack space={2}>
              <Heading color="primary.300"></Heading>
              <Spinner accessibilityLabel="Loading posts" />
            </HStack>
          </Center>
        </NativeBaseProvider>
      )}
      {!isLoading && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}
        >
          <NativeBaseProvider theme={theme} safeArea>
            <Center flex={1}>
              <Calendar
                date={date2}
                list={list}
                setCalendarDate={setCalendarDate}
                calendarDate={calendarDate}
              />
              <VStack space={4} flex={1} w="90%" mt={5}>
                <Heading color="#4d5eff" size="lg">
                  All tasks
                </Heading>
                <Swipe
                  list={list}
                  setList={setList}
                  firebase={firebase}
                  uid={uid}
                  calendarDate={calendarDate}
                />
              </VStack>
              <Box position="relative" h={200} w="100%">
                <Fab
                  position="absolute"
                  right={5}
                  bottom={30}
                  bg="primary.300"
                  icon={<Icon color="white" as={<AntDesign name="plus" />} />}
                  onPress={() => {
                    handleModal();
                  }}
                />
              </Box>
              <Actionsheet
                isOpen={showModal}
                onClose={() => setShowModal(false)}
              >
                <Actionsheet.Content style={{ height: 460 }}>
                  <Text
                    style={{ fontSize: 25, fontWeight: "bold", right: 129 }}
                  >
                    New Task
                  </Text>{" "}
                  <Input
                    w="100%"
                    mx={3}
                    placeholder="Add a task..."
                    placeholderTextColor="primary.300"
                    variant="underlined"
                    autoCorrect={false}
                    onChangeText={(v) => setTaskName(v)}
                    value={taskName}
                  />{" "}
                  <Text
                    style={{
                      right: 130,
                      fontSize: 18,
                      bottom: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Dificulty level
                  </Text>{" "}
                  <View style={{ flexDirection: "row", bottom: 20 }}>
                    <TouchableOpacity
                      style={{
                        right: 10,
                        width: "30%",
                        height: 100,
                        borderWidth: 1.5,
                        borderColor: "#86efac",
                        backgroundColor:
                          level == "easy" ? "#bbf7d0" : "transparent",
                      }}
                      onPress={() => handleLevel("easy")}
                    >
                      <Image
                        style={{ height: 100, width: 122, right: 3 }}
                        source={require("../../assets/easy-icon.png")}
                      ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 100,
                        width: "30%",
                        borderWidth: 1.5,
                        borderColor: "#fdba74",
                        backgroundColor:
                          level == "medium" ? "#fed7aa" : "transparent",
                      }}
                      onPress={() => handleLevel("medium")}
                    >
                      <Image
                        style={{ height: 100, width: 122, right: 3 }}
                        source={require("../../assets/medium-icon.png")}
                      ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        left: 10,
                        width: "30%",
                        height: 100,
                        borderWidth: 1.5,
                        borderColor: "#fca5a5",
                        backgroundColor:
                          level == "hard" ? "#fecaca" : "transparent",
                      }}
                      onPress={() => handleLevel("hard")}
                    >
                      <Image
                        style={{ height: 100, width: 122, right: 3 }}
                        source={require("../../assets/hard-icon.png")}
                      ></Image>
                    </TouchableOpacity>
                  </View>
                  <Button
                    style={{ width: "90%", top: 100 }}
                    onPress={() => {
                      setShowModal(false);
                      addItem();
                    }}
                  >
                    ADD
                  </Button>
                  <Text
                    style={{
                      right: 129,
                      fontSize: 18,
                      bottom: 45,
                      fontWeight: "bold",
                    }}
                  >
                    Date and time
                  </Text>{" "}
                  <Button
                    bg="transparent"
                    style={{
                      width: "90%",
                      bottom: 50,
                      borderWidth: 1.5,
                      borderColor: "#4d5eff",
                    }}
                    onPress={() => {
                      showMode(true);
                    }}
                  >
                    <Text
                      style={{
                        color: "#4d5eff",
                        right: 4,
                      }}
                    >
                      {moment(date2).format(
                        "DD.MM.YYYY, h:mm A                                   "
                      )}
                      <Icon
                        as={FontAwesome5}
                        color="primary.300"
                        name="calendar"
                        size={5}
                      />
                    </Text>
                  </Button>
                  {show && (
                    <PresenceTransition
                      visible={isOpen}
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 250,
                        },
                      }}
                      style={{
                        width: "100%",
                        height: 300,
                        bottom: 250,
                        backgroundColor: "white",
                        borderRadius: 10,
                        shadowColor: "#000000",
                        shadowOpacity: 0.3,
                        elevation: 6,
                        shadowRadius: 5,
                        shadowOffset: { width: 0.2, height: 0.2 },
                      }}
                    >
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date2}
                        mode={"datetime"}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChange}
                      />
                      <Button
                        style={{
                          width: "90%",
                          alignSelf: "center",
                        }}
                        onPress={() => {
                          showMode(false);
                        }}
                      >
                        Done
                      </Button>
                    </PresenceTransition>
                  )}
                </Actionsheet.Content>
              </Actionsheet>
            </Center>
          </NativeBaseProvider>
        </KeyboardAvoidingView>
      )}
    </>
  );
}
