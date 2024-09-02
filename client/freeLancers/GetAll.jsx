import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axiosInstance from "../axiosInstance";

const { width } = Dimensions.get("window");

export const FreelancerList = ({ navigation }) => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const response = await axiosInstance.get("/freelance/All");
      setFreelancers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching freelancers:", error.message);
      setLoading(false);
    }
  };

  const handleProfilePress = (userId) => {
    navigation.navigate("freeLanceProfile", { userId });
  };

  const renderFreelancer = ({ item }) => (
    <TouchableOpacity onPress={() => handleProfilePress(item._id)}>
      <View style={styles.card}>
        <Image
          style={styles.profilePicture}
          source={require("../assets/prof-1-1.png")}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
          <Text style={styles.skills}>Skills: {item.skills.join(", ")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={freelancers}
          renderItem={renderFreelancer}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: "#666",
  },
  skills: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
});
