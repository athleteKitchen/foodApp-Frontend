import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import PoppinsText from '../../../shared/components/PoppinsText'

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.featuredText}>--- FEATURED FOR YOU ---</Text>
      <PoppinsText weight="800" style={[styles.bigText, {color: "#236b41"}]}>Live</PoppinsText>
      <PoppinsText weight="800" style={[styles.bigText, {color: "#faa41a"}]}>it Up!</PoppinsText>
      <PoppinsText weight="600" style={[styles.featuredText, {marginTop: heightPercentageToDP(3)}]}>Developed with ❣️ in Bengaluru, India</PoppinsText>
      <Text>{'\n'}</Text>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    featuredText: {
        textAlign: "center",
        marginBottom: heightPercentageToDP(2),
        color :"gray"
    },
    bigText: {
        fontSize: 50,
        paddingHorizontal: widthPercentageToDP(5),
        lineHeight: 60
    }
})