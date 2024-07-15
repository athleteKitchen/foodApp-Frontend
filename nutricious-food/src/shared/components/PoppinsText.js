import React from 'react';
import { Text, StyleSheet } from 'react-native';

const PoppinsText = ({ children, style, weight }) => {
  let fontWeight;

  // Set font weight based on the provided weight prop or default to regular (400)
  switch (weight) {
    case '100':
      fontWeight = 'Poppins_100Thin';
      break;
    case '200':
      fontWeight = 'Poppins_200ExtraLight';
      break;
    case '300':
      fontWeight = 'Poppins_300Light';
      break;
    case '400':
      fontWeight = 'Poppins_400Regular';
      break;
    case '500':
      fontWeight = 'Poppins_500Medium';
      break;
    case '600':
      fontWeight = 'Poppins_600SemiBold';
      break;
    case '700':
      fontWeight = 'Poppins_700Bold';
      break;
    case '800':
      fontWeight = 'Poppins_800ExtraBold';
      break;
    case '900':
      fontWeight = 'Poppins_900Black';
      break;
    default:
      fontWeight = 'Poppins_400Regular'; // Default to regular (400)
      break;
  }

  return <Text style={[styles.text, { fontFamily: fontWeight }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    // Add other default text styles here if needed
    padding:0,
    margin:0,
    // lineHeight:20
  },
});

export default PoppinsText;