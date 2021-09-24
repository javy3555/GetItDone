import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import { Avatar, Title, Divider } from "react-native-paper";
import todoScreen from "./todoScreen";
import profile from "./profile";
import Avatars from "../DashboardScreen/Components/avatars";
import { firebase } from "../../firebase/config";
import React from "react";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet, View } from "react-native";

function DoLogout(props) {
  const user = firebase.auth().currentUser;
  var uid;

  if (user != null) {
    uid = user.uid;
  }

  const email = user.email;
  const name = user.displayName;

  const doLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Sign-out successful.");
        props.navigation.reset({
          index: 0,
          routes: [{ name: "WelcomeScreen" }],
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 20 }}>
          <Avatar.Image source={getAvatar()} size={100} />
          <View
            style={{
              marginLeft: 15,
              flexDirection: "column",
              marginTop: 10,
            }}
          >
            <Title style={styles.title} numberOfLines={1}>
              {name}
            </Title>
            <Text style={styles.caption} numberOfLines={1}>
              {email}
            </Text>
          </View>
        </View>
        <Divider />

        <DrawerItemList {...props} />
        <DrawerItem
          marginTop={300}
          label="Logout"
          activeTintColor="#5061FF"
          inactiveTintColor="#5061FF"
          icon={({ focused, size }) => (
            <Ionicons
              name="log-out-outline"
              size={30}
              color={focused ? "#5061FF" : "#5061FF"}
            />
          )}
          onPress={() => {
            doLogout();
          }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function homeScreen({ navigation }) {
  const user = firebase.auth().currentUser;
  const userAvatar = user.photoURL;
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "white",
          width: 280,
        },
      }}
      drawerContent={(props) => <DoLogout userAvatar={userAvatar} {...props} />}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={todoScreen}
        options={{
          headerShown: false,
          drawerActiveTintColor: "#5061FF",
          drawerInactiveTintColor: "#5061FF",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="home-outline"
              size={30}
              color={focused ? "#5061FF" : "#5061FF"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={profile}
        options={{
          headerShown: false,
          drawerActiveTintColor: "#5061FF",
          drawerInactiveTintColor: "#5061FF",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="person-outline"
              size={30}
              color={focused ? "#5061FF" : "#5061FF"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={profile}
        options={{
          headerShown: false,
          drawerActiveTintColor: "#5061FF",
          drawerInactiveTintColor: "#5061FF",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="settings-outline"
              size={30}
              color={focused ? "#5061FF" : "#5061FF"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Support"
        component={profile}
        options={{
          headerShown: false,
          drawerActiveTintColor: "#5061FF",
          drawerInactiveTintColor: "#5061FF",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={30}
              color={focused ? "#5061FF" : "#5061FF"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default homeScreen;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 26,
    marginTop: 3,
    fontWeight: "bold",
    width: 150,
    right: 4,
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    width: 150,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
