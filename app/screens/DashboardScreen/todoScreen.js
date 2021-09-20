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
import { FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  Platform,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebase } from "../../firebase/config";
import Calendar from "./Components/calendar";
import Swipe from "./Components/swipe";
import theme from "../styles";
import styles from "../../assets/styles/todoStyles";

export default function ({ navigation }) {
  const [refresh, setRefresh] = useState("");
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
  const [emptyMessage, setEmptyMessage] = useState(false);

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
    setRefresh({});
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
      .ref("/users/" + uid + "/tasks/")
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

  const handleEmptyMessage = () => {
    return (
      <VStack>
        <Center alignItems="center" marginBottom={180}>
          <Text color="#a1a1aa" marginTop={0}>
            All clear
          </Text>
          <Text color="#a1a1aa" marginTop={1}>
            Looks like you have no task for{" "}
            {moment(calendarDate).format("MMM Do YY")}
          </Text>
          <Text color="#a1a1aa" marginTop={1}>
            Tap + to add a task
          </Text>
        </Center>
      </VStack>
    );
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
              <HStack>
                <Calendar
                  date={date2}
                  list={list}
                  setCalendarDate={setCalendarDate}
                  calendarDate={calendarDate}
                  setEmptyMessage={setEmptyMessage}
                />
                <Icon
                  as={<MaterialIcons name="menu" />}
                  style={styles.menuIcon}
                />
              </HStack>
              <VStack space={4} flex={1} w="100%" mt={3}>
                <Heading color="#4d5eff" size="lg" ml={3}>
                  All tasks
                </Heading>
                <Swipe
                  list={list}
                  setList={setList}
                  firebase={firebase}
                  uid={uid}
                  calendarDate={calendarDate}
                  refresh={refresh}
                  setEmptyMessage={setEmptyMessage}
                />
                {emptyMessage && handleEmptyMessage()}
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
                <Actionsheet.Content style={{ height: 400 }}>
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
                  <Text style={styles.priorityText}>Priority level</Text>{" "}
                  <View style={styles.priorityContainer}>
                    <TouchableOpacity
                      style={{
                        alignSelf: "center",
                        right: 10,
                        width: "25%",
                        height: 35,
                        backgroundColor:
                          level == "easy" ? "#bbf7d0" : "#4ade80",
                        borderRadius: 7,
                      }}
                      onPress={() => handleLevel("easy")}
                    >
                      <Text style={styles.lowText}>Low</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignSelf: "center",
                        justifySelf: "center",
                        width: "25%",
                        height: 35,
                        backgroundColor:
                          level == "medium" ? "#fed7aa" : "#fb923c",
                        borderRadius: 7,
                      }}
                      onPress={() => handleLevel("medium")}
                    >
                      <Text style={styles.mediumText}>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        left: 10,
                        width: "25%",
                        height: 35,
                        borderRadius: 7,
                        backgroundColor:
                          level == "hard" ? "#fecaca" : "#f87171",
                      }}
                      onPress={() => handleLevel("hard")}
                    >
                      <Text style={styles.highText}>High</Text>
                    </TouchableOpacity>
                  </View>
                  <Button
                    style={styles.addButtom}
                    onPress={() => {
                      setShowModal(false);
                      addItem();
                    }}
                  >
                    ADD
                  </Button>
                  <Text style={styles.dateTimeText}>Date and time</Text>{" "}
                  <Button
                    bg="transparent"
                    style={styles.dateTimeButton}
                    onPress={() => {
                      showMode(true);
                    }}
                  >
                    <Text style={styles.buttonText}>
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
                      style={styles.dateTimeModal}
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
                        style={styles.doneButton}
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
