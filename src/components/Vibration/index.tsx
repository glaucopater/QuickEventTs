import React from "react";
import { View, Vibration, Button } from "react-native";

const DURATION = 10000;
const PATTERN = [0, 250, 250, 1250]; // zzz zzzzzzzz

export const VibrationButton = () => {
  const handleStartVibration = () => {
    Vibration.vibrate(DURATION);
  };
  const handleStartVibrationPattern = () => {
    Vibration.vibrate(PATTERN);
  };
  const handleStopVibration = () => {
    Vibration.cancel();
  };

  return (
    <View style={{ margin: 10 }}>
      <Button title=" Start Vibration " onPress={handleStartVibration} />
      <Button
        title=" Start Vibration Pattern "
        onPress={handleStartVibrationPattern}
      />
      <Button title=" Stop Vibration " onPress={handleStopVibration} />
    </View>
  );
};
