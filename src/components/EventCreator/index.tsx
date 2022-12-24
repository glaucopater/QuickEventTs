import React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Button } from "react-native";
import Constants from "expo-constants";
import * as Calendar from "expo-calendar";
import { DEFAULT_START_TIME, DEFAULT_END_TIME } from "../../config";
import moment from "moment";

const getAppointementDate = (date: moment.MomentInput) =>
  moment(date, "YYYY-MM-DD'T'HH:mm:ss.sssZ").toDate();

export const EventCreator = () => {
  const [calendarIds, setCalendarIds] = useState([]);
  const [calendarPermissionStatus, setCalendarPermissionStatus] = useState("");

  const refreshCalendars = async () => {
    const calendars: any = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    console.log("Number of calendars available: ", calendars.length);
    setCalendarIds(calendars.map((cal: any) => cal.id));
  };

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        setCalendarPermissionStatus(status);
        refreshCalendars();
      }
    })();
  }, []);

  const createCustomAlarm = async () => {
    Alert.alert("Created alarm");
  };

  const createEvent = async () => {
    if (calendarPermissionStatus === "granted") {
      const calendarId = await Calendar.createCalendarAsync({
        title: "test",
        color: "#00AAEE",
        source: {
          isLocalAccount: false,
          name: "Phone",
          type: "com.android.huawei.phone",
        },
        name: "Phone Owner",
        ownerAccount: "phoneowner@test.com",
        accessLevel: "owner",
        //  method: Calendar.AlarmMethod.ALARM,
        //  relativeOffset: 5,
      });

      try {
        const momentDate = moment();
        const startDate = momentDate
          .add(moment.duration(DEFAULT_START_TIME, "minutes"))
          .toISOString();
        const endDate = momentDate
          .add(moment.duration(DEFAULT_END_TIME, "minutes"))
          .toISOString();
        const title = "QuickEvent Test Event " + startDate;
        const res = await Calendar.createEventAsync(calendarId, {
          endDate,
          startDate,
          title,
          alarms: [
            {
              // method: Calendar.AlarmMethod.ALARM,
              relativeOffset: -1, // 1 minutes before the event
            },
          ],
        });
        console.log(res);
        Alert.alert(
          "Created event #" +
            res +
            " starting in " +
            DEFAULT_START_TIME +
            " minutes." +
            "Alarm is set 1 minute before the event!"
        );
        refreshCalendars();
      } catch (e) {
        console.log({ e });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Number of events: {calendarIds.length} </Text>
      <Button title="Create Event" onPress={createEvent} />
      <Button title="Create Alarm" onPress={createCustomAlarm} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 16,
  },
  label: {
    fontWeight: "700",
  },
});
