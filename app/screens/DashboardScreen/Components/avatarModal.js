import React from "react";
import { Modal, HStack, VStack, Text, Button, Avatar } from "native-base";
import { TouchableOpacity } from "react-native";
function avatarModal(props) {
  return (
    <Modal
      isOpen={props.showModal}
      onClose={() => props.setShowModal(false)}
      size="lg"
    >
      <Modal.Content width="95%" height={500}>
        <Modal.CloseButton />
        <Modal.Header>Avatars</Modal.Header>
        <Modal.Body>
          <VStack space={6} mt={5}>
            <HStack alignItems="center" justifyContent="space-between">
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_1.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_1.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_2.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_2.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_3.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_3.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_4.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_4.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_5.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_5.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_6.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_6.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_7.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_7.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_8.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_8.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_9.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_9.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_10.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_10.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_11.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_11.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_12.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_12.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_13.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_13.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_14.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_14.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_15.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_15.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUserAvatar("Dog_16.png")}
              >
                <Avatar
                  alignSelf="center"
                  source={require("../../../assets/avatars/Dog_16.png")}
                  style={{ width: 80, height: 80 }}
                ></Avatar>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            mb={4}
            mr={4}
            flex="1"
            onPress={() => {
              props.updateAvatar();
            }}
          >
            Done
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default avatarModal;
