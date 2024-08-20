import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import { LinearGradient } from "expo-linear-gradient";
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
  const handlePay = async () => {
    try {
      navigation.navigate("Pay");
    } catch (error) {
      console.error("payment error", error.message);
      alert("payment Failed, please try again");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      style={styles.container}
      locations={[0.06, 0.11, 0.42, 0.73, 0.96]}
      colors={["#050c9c", "#050c9c", "#3575ef", "#41c0f9", "#a7e6ff"]}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Fint</Text>
        <Text style={styles.title}>{userData?.firstName}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Pay" onPress={handlePay} color="#ff5757" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign Out" onPress={handleLogout} color="#ff5757" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contentContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  infoText: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 20,
    color: "#fff",
  },
  buttonContainer: {
    width: "80%",
    marginTop: 30,
  },
});

export default Home;
