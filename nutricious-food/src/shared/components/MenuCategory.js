import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

const MenuCategory = ({ items, isLikeIconShown }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#2ecc71"
          clearTimeout
          contentContainerStyle={styles.loadingContainer}
        />
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => <MenuItem item={item} isLikeIconShown={isLikeIconShown} />}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255, 253, 239)",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 16,
  },
});

export default MenuCategory;
