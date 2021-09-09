import React from "react";
import { useState } from "react";
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
  Modal,
  extendTheme,
  Actionsheet
} from "native-base";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

export default function () {
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
  const instState = [
    { title: "code", isCompleted: true },
    { title: "sleep", isCompleted: false },
    { title: "repeat", isCompleted: false },
  ];
  const [list, setList] = React.useState(instState);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = React.useState("");
  const [showModal, setShowModal] = useState(false);

  const addItem = (title: string) => {
    setList([
      ...list,
      {
        title: title,
        isCompleted: false,
      },
    ]);
  };
  const handleDelete = (index: number) => {
    const temp = list.filter((_, itemI) => itemI !== index);
    setList(temp);
  };
  const handleStatusChange = (index: number) => {
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
  return (
    <NativeBaseProvider theme={theme}>
      <Center flex={1}>
        <VStack space={4} flex={1} w="90%" mt={8}>
          <Heading color="#4d5eff" size="2xl">
            Todo List
          </Heading>
          <Input
            variant="filled"
            InputRightElement={
              <IconButton
                icon={
                  <Icon as={FontAwesome5} color="grey" name="search" size={4} />
                }
                color="primary.300"
                ml={1}
                onPress={() => {
                  addItem(searchValue);
                  setSearchValue("");
                }}
                mr={1}
              />
            }
            onChangeText={(v) => setSearchValue(v)}
            value={searchValue}
            placeholder="Search"
          />
          <VStack>
            {list.map((item, itemI) => (
              <HStack
                h={9}
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.title + itemI.toString()}
              >
                <Checkbox
                  size="md"
                  color="primary.300"
                  isChecked={item.isCompleted}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.title}
                >
                  <Text fontSize="2xl" mx={2} strikeThrough={item.isCompleted}>
                    {item.title}
                  </Text>
                </Checkbox>
                <IconButton
                  color="primary.300"
                  icon={
                    <Icon
                      as={FontAwesome5}
                      color="gray.600"
                      name="trash"
                      size={5}
                    />
                  }
                  onPress={() => handleDelete(itemI)}
                />
              </HStack>
            ))}
          </VStack>
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
            
        <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
          <Actionsheet.Content style={{ height: 300}}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', right: 115  }}>New Task</Text>
            <Actionsheet.Item> <Input
              style={{ width: 350}}
              variant="underlined"
              placeholder="Add a Task"
              _light={{
                placeholderTextColor: "primary.300",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              onChangeText={(text) => setInputValue(text)}
              value={inputValue}
          />  </Actionsheet.Item>
            <Actionsheet.Item>
            <Button
            style={{ left: 300}}
            onPress={() => {
              setShowModal(false);
              addItem(inputValue);
              setInputValue("");
            }}
          >
            ADD
          </Button>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      </Center>
    </NativeBaseProvider>
  );
}
