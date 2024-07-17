import { Text, StyleSheet } from "react-native";

const InterText = ({ children, style, weight }) => {
  let fontWeight;

  // Set font weight based on the provided weight prop or default to regular (400)
  switch (weight) {
    case "300":
      fontWeight = "Inter_300Light";
      break;
    case "400":
      fontWeight = "Inter_400Regular";
      break;
    case "500":
      fontWeight = "Inter_500Medium";
      break;
    case "700":
      fontWeight = "Inter_700Bold";
      break;
    default:
      fontWeight = "Inter_400Regular"; // Default to regular (400)
      break;
  }

  return (
    <Text style={[styles.text, { fontFamily: fontWeight }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    
  },
});

export default InterText;
