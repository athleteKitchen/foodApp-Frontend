import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PoppinsText from '../../shared/components/PoppinsText'

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <PoppinsText style={styles.text}>Favorites Screen</PoppinsText>
    </View>
  )
}

export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
})