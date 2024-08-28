import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Share, // Import the Share API
} from "react-native";
import axiosInstance from "../axiosInstance";

const App = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axiosInstance.get("/auth/Affiliate");
        setLinks(response.data);
      } catch (error) {
        console.error("Error fetching affiliate links:", error);
        setError("Failed to load affiliate links.");
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleShare = async (link) => {
    try {
      await Share.share({
        message: `Check out this link: ${link}`,
      });
    } catch (error) {
      console.error("Error sharing the link:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.linkContainer}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => handleShare(item.link)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Affiliate Links</Text>
      <FlatList
        data={links}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000", // Set background color to black
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff", // Set header text color to white
  },
  linkContainer: {
    marginBottom: 20,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eeeee4",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: "#000", // Set text color to black
  },
  loadingText: {
    fontSize: 20,
    color: "#fff", // Set loading text color to white
  },
  errorText: {
    fontSize: 20,
    color: "red",
  },
});

export default App;
