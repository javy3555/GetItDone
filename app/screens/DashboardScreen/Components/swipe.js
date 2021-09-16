import React from "react";
import { Box, Checkbox, Text, HStack, Icon, Pressable } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";

function swipe({ list, firebase, uid, setList, calendarDate }) {
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
    if (level == "easy") return "#bbf7d0";
    else if (level == "medium") return "#fed7aa";
    else if (level == "hard") return "#fecaca";
    else return "white";
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
      {calendarDate == item.date && (
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
      )}
    </Box>
  );

  const renderHiddenItem = (data, rowMap) =>
    calendarDate == data.item.date && (
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
  );
}

export default swipe;
