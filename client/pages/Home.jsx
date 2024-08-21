import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error", error.message);
      alert("Logout Failed, please try again");
    }
  };

  const handlePay = () => {
    navigation.navigate("Pay");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/doodle.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Welcome to Fint</Text>
          <Text style={styles.name}>{userData?.firstName}</Text>
          <Text style={styles.balance}>Balance: ${userData?.balance}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handlePay}>
            <Text style={styles.buttonText}>Pay</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  name: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
  },
  balance: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "80%",
  },
  button: {
    backgroundColor: "#ff5757",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Home;
