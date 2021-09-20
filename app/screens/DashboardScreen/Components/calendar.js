import React from "react";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import { Box } from "native-base";
import styles from "../../../assets/styles/calendarStyles";

function calendar({
  date,
  list,
  setCalendarDate,
  calendarDate,
  setEmptyMessage,
}) {
  const userDate = [];

  const getMarkedDates = () => {
    list.map((item) => {
      userDate.push({
        date: item.date,
        dots: [
          {
            color: "#4d5eff",
            selectedColor: "white",
          },
        ],
      });
    });
    return userDate;
  };

  const handleOnSelectedDate = (date) => {
    setCalendarDate(moment(date).format("YYYY-MM-DD"));
    for (var i = 0; i < list.length; i++) {
      if (list[i].date == moment(date).format("YYYY-MM-DD")) {
        setEmptyMessage(false);
        return;
      }
    }
    setEmptyMessage(true);
  };

  return (
    <Box style={styles.calendarContainer}>
      <CalendarStrip
        scrollable
        style={styles.calendarStyle}
        daySelectionAnimation={{
          type: "background",
          duration: 20,
          borderWidth: 2,
          highlightColor: "#4d5eff",
        }}
        responsiveSizingOffset={4}
        calendarColor={"#F2F2F2"}
        calendarHeaderStyle={styles.headerStyle}
        dateNumberStyle={{ color: "#3f3f46" }}
        dateNameStyle={{ color: "#52525b" }}
        highlightDateNameStyle={{ color: "white" }}
        highlightDateNumberStyle={{ color: "white" }}
        iconContainer={{ flex: 0.1 }}
        leftSelector={[]}
        rightSelector={[]}
        selectedDate={calendarDate}
        startingDate={moment(date).subtract(3, "days").format("YYYY-MM-DD")}
        markedDates={getMarkedDates()}
        onDateSelected={handleOnSelectedDate}
      />
    </Box>
  );
}

export default calendar;
