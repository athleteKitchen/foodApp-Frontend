import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { icons } from "../constants/icons";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const TabBar = ({ state, descriptors, navigation }) => {
  const primaryColor = "#fce305";
  const greyColor = "#ffffff";

  const focusedIndex = useSharedValue(state.index);

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            focusedIndex.value = index;
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const animatedStyles = useAnimatedStyle(() => {
          return {
            transform: [
              {
                scale: withTiming(isFocused ? 1.2 : 1, {
                  duration: 100,
                }),
              },
            ],
          };
        });

        return (
          <TouchableOpacity
            key={route.name}
            style={styles.tabBarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Animated.View style={[styles.tabBarContent, animatedStyles]}>
              {icons[route.name]({
                color: isFocused ? primaryColor : greyColor,
              })}
              <Text
                style={{
                  color: isFocused ? primaryColor : greyColor,
                  fontSize: 11,
                }}
              >
                {label}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2b9657",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  tabBarContent: {
    alignItems: "center",
    justifyContent: "space-evenly"
  }
});

export default TabBar;
