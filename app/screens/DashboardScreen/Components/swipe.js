import React from "react";
import {
  Box,
  Checkbox,
  Text,
  HStack,
  Icon,
  Pressable,
  VStack,
  Divider,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import styles from "../../../assets/styles/swipeStyles";

function swipe({ list, firebase, uid, setList, calendarDate, refresh }) {
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

  const handleLevelColor = (level) => {
    if (level == "easy") return "#86efac";
    else if (level == "medium") return "#fdba74";
    else if (level == "hard") return "#fca5a5";
    else return "transparent";
  };

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

  const onRowDidOpen = (rowKey) => {};

  const renderItem = ({ item, index }) => (
    <Box>
      {calendarDate === item.date && (
        <VStack>
          <Pressable style={styles.pressableStyle}>
            <HStack>
              <HStack style={styles.hContainer} key={item.task}>
                <Checkbox
                  size="md"
                  style={styles.checkboxStyle}
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(index, item)}
                  value={item.task}
                  accessibilityLabel={item.task}
                ></Checkbox>
                <Icon
                  as={<MaterialIcons name="circle" />}
                  size={4}
                  left={340}
                  alignSelf="center"
                  style={{
                    color: handleLevelColor(item.level),
                  }}
                />
              </HStack>
              <VStack ml={2}>
                <Text style={styles.task} strikeThrough={item.isCompleted}>
                  {item.task}
                </Text>
                <HStack mt={0.5} mb={1}>
                  <Icon
                    as={<MaterialIcons name="schedule" />}
                    size={4}
                    style={styles.timeIcon}
                  />
                  <Text style={styles.timeText}>{item.time}</Text>
                </HStack>
              </VStack>
            </HStack>
            <Divider mt={1} />
          </Pressable>
        </VStack>
      )}
    </Box>
  );

  const renderHiddenItem = (data, rowMap) =>
    calendarDate === data.item.date && (
      <HStack style={styles.hContainer2}>
        <Pressable
          style={styles.pressable2}
          onPress={() => deleteRow(rowMap, data.item.key)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Icon
            as={<MaterialIcons name="delete" />}
            style={styles.deleteIcon}
          />
        </Pressable>
      </HStack>
    );

  return (
    <SwipeListView
      data={list}
      extraData={refresh}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-90}
      previewRowKey={"0"}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
    />
  );
}

export default swipe;
