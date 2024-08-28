import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          alert("Login Failed");
          navigation.navigate("Login");
          return;
        }

        const response = await axiosInstance.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error.message);
        alert("Failed to fetch user data, please try again");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.profile}>
      <ImageBackground
        style={styles.profileImage}
        resizeMode="cover"
        source={require("../assets/profile/r1.png")}
      />
      <View style={styles.profileContent}>
        <Text style={styles.helloName}>Hello, {userData?.firstName}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.infoText}>
            {userData?.firstName} {userData?.lastName}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.infoText}>{userData?.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Mobile:</Text>
          <Text style={styles.infoText}>{userData?.phoneNumber}</Text>
        </View>
        <Pressable
          style={styles.logoutButton}
          onPress={async () => {
            await AsyncStorage.removeItem("authToken");
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>
      <Image
        style={styles.decorativeIcon}
        source={require("../assets/profile/oip-1.png")}
      />
      <Image
        style={styles.decorativeIconSmall}
        source={require("../assets/profile/asd-1.png")}
      />
      <Image
        style={[styles.decorativeIconSmall, styles.secondIcon]}
        source={require("../assets/profile/asd-1.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: "#c7eef3",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  profileContent: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  helloName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  infoContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: "#888",
  },
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#fa9746",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  decorativeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 26,
    height: 26,
  },
  decorativeIconSmall: {
    position: "absolute",
    width: 14,
    height: 14,
  },
  secondIcon: {
    bottom: 20,
    right: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c7eef3",
  },
  loadingText: {
    fontSize: 20,
    color: "#333",
  },
});

export default Profile;
