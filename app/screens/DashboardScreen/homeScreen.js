import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  TouchableRipple,
  Switch,
  Divider,
} from "react-native-paper";
import todoScreen from "./todoScreen";
import profileScreen from "./profileScreen";
import { firebase } from "../../firebase/config";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet, View } from "react-native";

function DoLogout(props) {
  const user = firebase.auth().currentUser;
  const email = user.email;
  var username;

  var userId = firebase.auth().currentUser.uid;
  const ref = firebase.database().ref("users/" + userId + "/credentials/");
  ref.child("fullName").on("value", (snapshot) => {
    username = snapshot.val();
  });

  const changeAvatar = () => {
    console.log("Hello");
  };

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

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15, marginBottom: 20 }}>
          <Avatar.Image
            source={require("../../assets/avatars/Dog_4.png")}
            size={80}
          />
          <View
            style={{ marginLeft: 15, flexDirection: "column", marginTop: 10 }}
          >
            <Title style={styles.title} numberOfLines={1}>
              {username}
            </Title>
            <Text style={styles.caption} numberOfLines={1}>
              {email}
            </Text>
          </View>
        </View>
        <Divider />

        <DrawerItemList {...props} />
        <DrawerItem
          marginTop={360}
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
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "white",
          width: 280,
        },
      }}
      drawerContent={(props) => <DoLogout {...props} />}
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
        component={profileScreen}
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
        component={profileScreen}
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
