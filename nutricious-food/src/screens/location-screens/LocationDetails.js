import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome6,
  FontAwesome5,
} from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import PoppinsText from "../../shared/components/PoppinsText";

const LocationDetails = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View style={{ padding: 20, marginTop: hp(2) }}>
        <View style={styles.headerLocation}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="down" size={20} color="black" />
          </TouchableOpacity>
          <PoppinsText weight="700" style={styles.headerText}>Select a location</PoppinsText>
        </View>
        <View style={styles.currentLocation}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                justifyContent: "flex-start",
              }}
            >
              <MaterialCommunityIcons
                name="crosshairs-gps"
                size={20}
                color="#FF0000"
              />
              <Text style={styles.currentLocationText}>Use current location</Text>
            </View>
            <TouchableOpacity>
              <View style={{}}>
                <FontAwesome5 name="arrow-right" size={19} color="#bbbbbb" />
              </View>
            </TouchableOpacity>
          </View>
          <Text style={styles.currentLocationAddress}>
            Kirloskar Layout, Soundarya Layout, Bengaluru 
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 15,
            backgroundColor: "#fff",
            elevation: 3,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            alignItems: "center",
          }}
        >
          <View style={styles.addAddress}>
            <FontAwesome6 name="plus" size={20} color="#FF0000" />
            <Text style={styles.addAddressText}>Add Address</Text>
          </View>
          <TouchableOpacity style={{}} onPress={() => navigation.navigate("MapView")}>
            <FontAwesome5 name="arrow-right" size={19} color="#bbbbbb" />
          </TouchableOpacity>
        </View>
        <PoppinsText weight="700" style={styles.sectionHeader}>SAVED ADDRESS</PoppinsText>
        <View style={styles.savedAddress}>
          <Text style={styles.savedAddressName}>Home</Text>
          <Text style={styles.savedAddressDetails}>
            #52 2nd cross kirloskar layout, Bangalore 560073, 1st floor,
            Kirloska...
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LocationDetails;

const styles = StyleSheet.create({
  currentLocation: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 3,
  },
  currentLocationText: {
    marginLeft: 8,
    color: "#FF0000",
  },
  currentLocationAddress: {
    marginLeft: 8,
    color: "#888",
  },
  addAddress: {
    flexDirection: "row",
    alignItems: "center",
  },
  addAddressText: {
    marginLeft: 8,
    color: "#FF0000",
  },
  sectionHeader: {
    marginVertical: 15,
    fontSize: 16,
  },
  savedAddress: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 15,
    elevation: 3,
    marginBottom: 16,
  },
  savedAddressName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  savedAddressDetails: {
    color: "#888",
  },
  locationItem: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationDistance: {
    color: "#888",
  },
  locationAddress: {
    color: "#888",
  },
  headerLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    gap: 10,
  },
  headerText: {
    fontSize: 18,
  },
  backButton: {
    marginRight: 8,
  },
});
