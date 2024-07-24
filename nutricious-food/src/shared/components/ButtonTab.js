import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import Indicator from "../../../assets/indicator.png";
import PoppinsText from "./PoppinsText";

const { width } = Dimensions.get("window");

const WIDTH_SCREEN = width;

export default function MeasurementSlider({ min, max, unit, setUnit }) {
  const [units, setUnits] = useState(Number(min));

  const onValueChange = (value) => {
    setUnits(Number(value.toFixed(1)));
    setUnit(Number(value.toFixed(1)));
  };

  const renderBalanceLines = () => {
    const lineCount = 10;
    const margin = 15;

    return [...Array(lineCount + 1)].map((_, i) => {
      const marginLeft = (i / lineCount) * (WIDTH_SCREEN - 2 * margin) + margin;

      return <View key={i} style={[styles.balanceLine, { marginLeft }]} />;
    });
  };

  const renderBalanceMiddleLines = () => {
    const lineCount = 40;
    const margin = 15;

    return [...Array(lineCount + 1)].map((_, i) => {
      const marginLeft = (i / lineCount) * (WIDTH_SCREEN - 2 * margin) + margin;

      return (
        <View key={i} style={[styles.balanceMiddleLine, { marginLeft }]} />
      );
    });
  };

  return (
    <>
      <View
        style={styles.container}
        // contentContainerStyle={styles.contentContainerStyle}
      >
        <PoppinsText weight="800" style={styles.kilograms}>{units.toFixed(1)} {unit}</PoppinsText>
        <View style={styles.balance}>
          {renderBalanceLines()}
          {renderBalanceMiddleLines()}
          <Slider
            style={[
              styles.containerSlider,
              { left: units >= 55 ? 1.5 : 0 },
            ]}
            minimumValue={min}
            maximumValue={max}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            step={0.1}
            value={units}
            onValueChange={onValueChange}
            thumbImage={Indicator}
            lowerLimit={0.3}
            upperLimit={max}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  containerSlider: {
    width: WIDTH_SCREEN,
    height: 40,
    zIndex: 3,
  },
  balance: {
    position: "relative",
    marginTop: -10
  },
  balanceLine: {
    position: "absolute",
    width: 2,
    height: 40,
    backgroundColor: "#A0AEC0",
    zIndex: 2,
  },
  balanceMiddleLine: {
    position: "absolute",
    width: 2,
    height: 20,
    backgroundColor: "#606873",
    top: 10,
  },
  kilograms: {
    color: "#5a645e",
    marginBottom: 15,
    fontSize: 65,
  },
  containerImage: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  thumbImage: {
    width: 10, // Set the width you want for the thumb image
    height: 10, // Set the height you want for the thumb image
    resizeMode: 'contain', // Ensure the image scales properly
  },
});