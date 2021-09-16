import React from "react";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
function calendar({ date, list, setCalendarDate, calendarDate }) {
  const userDate = [];

  const handleLevelColor = (level) => {
    if (level == "easy") return "#bbf7d0";
    else if (level == "medium") return "#fed7aa";
    else if (level == "hard") return "#fecaca";
    else return "white";
  };

  const getMarkedDates = () => {
    list.map((item) => {
      userDate.push({
        date: item.date,
        dots: [
          {
            color: "white",
            selectedColor: "black",
          },
        ],
      });
    });
    return userDate;
  };

  const handleSelectedDate = (date) => {
    setCalendarDate(moment(date).format("YYYY-MM-DD"));
  };
  return (
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
      selectedDate={calendarDate}
      markedDates={getMarkedDates()}
      onDateSelected={handleSelectedDate}
    />
  );
}

export default calendar;
