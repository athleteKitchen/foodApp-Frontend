import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getCurrentWeekDates, isToday } from "../../../shared/helpers/WeekDates";
import PoppinsText from "../../../shared/components/PoppinsText";

const CalenderNavigation = ({ navigation }) => {
  const weekDates = getCurrentWeekDates();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={20} color="#f3efef" />
        </TouchableOpacity>
        <Text style={styles.title}>Journal</Text>
        <View>
          <Text>{"      "}</Text>
        </View>
      </View>
      <View style={styles.calendar}>
        {weekDates.map((date, index) => (
          <View key={index} style={[styles.calendarItem, isToday(date) && styles.currentDayCircle]}>
            <PoppinsText weight="700" style={[styles.calendarText]}>
              {date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase()}
            </PoppinsText>
            <View
              style={[
                styles.dateCircle,
                isToday(date) && styles.currentDateCircle,
              ]}
            >
              <PoppinsText weight="600" style={[styles.calendarText, isToday(date) && {color: "#236b41"}]}>{date.getDate()}</PoppinsText>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 30,
    backgroundColor: "#236b41",
    paddingTop: hp(7),
    zIndex: -10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(2),
  },
  backButton: {
    color: "#fff",
    fontSize: 24,
  },
  title: {
    color: "rgb(255, 253, 239)",
    fontSize: 20,
  },
  calendar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: hp(4),
  },
  calendarItem: {
    alignItems: "center",
  },
  calendarText: {
    color: "rgb(255, 253, 239)",
  },
  dateCircle: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  currentDayCircle: {
    backgroundColor: "#08080878",
    padding: 10,
    borderRadius: 20,
    marginTop: -hp(1.25)
  },
  currentDateCircle: {
    backgroundColor: "rgb(255, 253, 239)",
  },
});

export default CalenderNavigation;
