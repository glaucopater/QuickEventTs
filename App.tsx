import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { EventCreator } from "./src/components/EventCreator";
import PushNotificactionCreator from "./src/components/PushNotificationCreator";
import SoundPlayer from "./src/components/SoundPlayer";
import { VibrationButton } from "./src/components/Vibration";

export default function App() {
  return (
    <View style={styles.container}>
      <EventCreator />
      <PushNotificactionCreator />
      <VibrationButton />
      <SoundPlayer/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
