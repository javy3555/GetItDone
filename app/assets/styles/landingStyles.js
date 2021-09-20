import { StyleSheet } from "react-native";

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  header: {
    top: 150,
    fontSize: 25,
    color: "#575757",
  },
  header2: {
    top: 155,
    fontSize: 13,
    color: "#8B8B8B",
  },
  loginButton: {
    height: 50,
    width: "80%",
    bottom: 100,
    backgroundColor: "#5061FF",
    borderRadius: 25,
  },
  registerButton: {
    height: 50,
    width: "80%",
    bottom: 80,
    backgroundColor: "#ffffff",
    borderColor: "#5061FF",
    borderRadius: 25,
    borderWidth: 1,
  },
  registerText: {
    color: "#5061FF",
    bottom: 8,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    bottom: 70,
    left: 90,
    fontSize: 20,
    color: "#a1a1aa",
  },
  signUpText: {
    bottom: 95,
    right: 90,
    fontSize: 20,
    color: "#a1a1aa",
  },
  logo: {
    width: 70,
    height: 71,
    top: 35,
    left: 130,
  },
  centerImage: {
    width: 206,
    height: 127,
    top: 100,
  },
  title: {
    top: 100,
    right: 35,
    fontSize: 45,
    fontFamily: "MontserratAlternatesMedium",
    color: "#5F5F5F",
  },
  logoContainer: {
    position: "absolute",
    top: 5,
    alignItems: "center",
  },
});
