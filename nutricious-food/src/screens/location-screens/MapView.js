import React, { useState, useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { getLocationAddressAsync, getLocationCoordsAsync } from "../../shared/helpers/Permissions";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import PoppinsText from "../../shared/components/PoppinsText";
import { customStyle } from "./mapStyle";
import Header from "../../shared/components/Header";
import { FontAwesome6 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function MapViews({ navigation }) {
  const { longitude, latitude } = useSelector((state) => state.location);
  const [address, setAddress] = useState(null);

  const [region, setRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0043,
    longitudeDelta: 0.0034,
  });

  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const mapRef = useRef(null);
  
  const fetchAddress = async (longitude, latitude) => {
    try {
      const address = await getLocationAddressAsync(longitude, latitude);
      if(address.length > 0){
        setAddress(address[0]);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCoords = async () => {
    try {
      const coords = await getLocationCoordsAsync();
      setRegion({
        ...region,
        latitude: coords.latitude,
        longitude: coords.longitude
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  const onRegionChangeComplete = (newRegion) => {
    if (!isUserInteracting) {
      setRegion(newRegion);
      fetchAddress(newRegion.longitude, newRegion.latitude);
    }
  };

  const onPanDrag = () => {
    setIsUserInteracting(true);
  };
  
  const onMapPress = () => {
    setIsUserInteracting(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ zIndex: 100 }}>
        <Header
          isCartIconShown={false}
          isBackIconShown={true}
          name="Confirm Address"
          navigation={navigation}
        />
      </View>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
          onPanDrag={(e) => fetchAddress(e.nativeEvent.coordinate.longitude, e.nativeEvent.coordinate.latitude)}
          onPress={onMapPress}
          showsUserLocation
          showsMyLocationButton
          customMapStyle={customStyle}
        ></MapView>
        <View
          style={{
            position: "absolute",
            bottom: hp(47),
            left: 0,
            right: 0,
            zIndex: 100,
            alignItems: "center",
          }}
        >
          <FontAwesome6 name="location-dot" size={50} color="#df2d16" />
        </View>
        <View style={styles.card}>
          <PoppinsText weight={"700"} style={styles.heading}>
            Deliver Your Order To
          </PoppinsText>
          <View style={styles.infoRow}>
            <FontAwesome6 name="location-dot" size={30} color="#f1c24a" />
            <Text style={styles.infoText}>{address === null ? "" : address.formattedAddress }</Text>
          </View>
            <Text style={styles.infoValue}>22 min</Text>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>Change Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 5,
    // height: hp(6s0),
  },
  map: {
    width: "100%",
    height: "88%",
  },
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#25854d",
    padding: 20,
  },
  heading: {
    color: "#fff",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
    gap: 20
  },
  icon: {
    fontSize: 20,
    color: "white",
  },
  infoText: {
    color: "white",
    fontSize: 14,
  },
  infoValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  statusContainer: {
    marginVertical: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  statusText: {
    color: "white",
    fontSize: 14,
  },
  statusTime: {
    color: "white",
    fontSize: 14,
  },
  callButton: {
    backgroundColor: "#f1c24a",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  callButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
