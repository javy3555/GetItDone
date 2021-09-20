import { StyleSheet } from "react-native";

export default StyleSheet.create({
  calendarContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    width: "117%",
    left: 15,
  },
  calendarStyle: {
    height: 190,
    paddingTop: 50,
  },
  headerStyle: {
    color: "#3f3f46",
    fontSize: 22,
    marginBottom: 5,
  },
});
