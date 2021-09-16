import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import {
  Input,
  Box,
  Fab,
  Button,
  IconButton,
  Checkbox,
  Text,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  NativeBaseProvider,
  extendTheme,
  Actionsheet,
  PresenceTransition,
  Spinner,
  Pressable,
} from "native-base";
import moment from "moment";
import {
  FontAwesome5,
  AntDesign,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Platform,
  KeyboardAvoidingView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebase } from "../../firebase/config";
import CalendarStrip from "react-native-calendar-strip";

export default function ({ navigation }) {
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
      orange: {
        700: "#fed7aa",
      },
      green: {
        700: "#bbf7d0",
      },
      red: {
        700: "#fecaca",
      },
      // Redefinig only one shade, rest of the color will remain same.
    },
  });

  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [date2, setDate] = useState(new Date(Date.now()));
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

  let datesWhitelist = [
    {
      start: moment(),
      end: moment().add(3, "days"), // total 4 days enabled
    },
  ];
  let datesBlacklist = [moment().add(1, "days")]; // 1 day disabled

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
  }, [isMounted]); // removed lists from subscription []

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
      date: moment(date2).format(
        "DD.MM.YYYY, h:mm a                                   "
      ),
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

  const handleStatusChange = (index, item) => {
    var updt = { isCompleted: !item.isCompleted };
    firebase
      .database()
      .ref("/users/" + uid + "/tasks/" + item.key)
      .update(updt);
    const temp = list.map((item, itemI) =>
      itemI !== index
        ? item
        : {
            ...item,
            isCompleted: !item.isCompleted,
          }
    );
    setList(temp);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const onChange = (event, selectedDate) => {
    setIsMounted(!isMounted);
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

  const handleLevelColor = (level) => {
    if (level == "easy") return "#bbf7d0";
    else if (level == "medium") return "#fed7aa";
    else if (level == "hard") return "#fecaca";
    else return "white";
  };

  const getMarketDates = () => {
    const temp = list.map((item) =>
      itemI !== index
        ? item
        : {
            ...item,
            isCompleted: !item.isCompleted,
          }
    );
  };

  /// Swipe functions ///

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    firebase
      .database()
      .ref("/users/" + uid + "/tasks/" + rowKey)
      .remove();

    closeRow(rowMap, rowKey);
    const newData = [...list];
    const prevIndex = list.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setList(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = ({ item, index }) => (
    <Box>
      <Pressable
        alignItems="center"
        justifyContent="center"
        height={50}
        marginTop={2}
        style={{
          backgroundColor: handleLevelColor(item.level),
          borderRadius: 10,
        }}
      >
        <HStack
          h={9}
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          key={item.task}
        >
          <Checkbox
            size="md"
            color="primary.300"
            left={1}
            isChecked={item.isCompleted}
            onChange={() => handleStatusChange(index, item)}
            value={item.task}
          >
            <Text fontSize="2xl" mx={2} strikeThrough={item.isCompleted}>
              {item.task}
            </Text>
          </Checkbox>
          <Text mr={2}>{item.time}</Text>
        </HStack>
      </Pressable>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack
      flex={1}
      pl={2}
      marginTop={2}
      style={{
        backgroundColor: handleLevelColor(data.item.level),
        borderRadius: 10,
      }}
    >
      <Pressable
        px={4}
        ml="auto"
        bg="dark.500"
        justifyContent="center"
        onPress={() => closeRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Icon as={<Ionicons name="close" />} color="white" />
      </Pressable>
      <Pressable
        px={4}
        bg="#ef4444"
        justifyContent="center"
        style={{
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
        }}
        onPress={() => deleteRow(rowMap, data.item.key)}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <Icon as={<MaterialIcons name="delete" />} color="white" />
      </Pressable>
    </HStack>
  );

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
              <CalendarStrip
                scrollable
                style={{
                  height: 150,
                  paddingTop: 50,
                  paddingBottom: 2,
                  width: "120%",
                }}
                daySelectionAnimation={{
                  type: "background",
                  duration: 200,
                  borderWidth: 1,
                  borderHighlightColor: "white",
                  highlightColor: "white",
                }}
                responsiveSizingOffset={9}
                calendarColor={"#4d5eff"}
                calendarHeaderStyle={{ color: "white", fontSize: 20 }}
                dateNumberStyle={{ color: "white" }}
                dateNameStyle={{ color: "white" }}
                iconContainer={{ flex: 0.1 }}
                leftSelector={[]}
                rightSelector={[]}
                selectedDate={date2}
              />
              <VStack space={4} flex={1} w="90%" mt={5}>
                <Heading color="#4d5eff" size="lg">
                  All tasks
                </Heading>
                <SwipeListView
                  data={list}
                  renderItem={renderItem}
                  renderHiddenItem={renderHiddenItem}
                  rightOpenValue={-130}
                  previewRowKey={"0"}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                  onRowDidOpen={onRowDidOpen}
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
