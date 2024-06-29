import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";

const LoadingModal = ({ loading }) => {
  return (
    <Modal isVisible={loading} backdropOpacity={0.8}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2ECC71" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#2ECC71",
  },
});

export default LoadingModal;
