import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

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
    navigation.navigate("Input");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.homeContainer}>
      <LinearGradient
        style={styles.backgroundGradient}
        locations={[0, 0.99]}
        colors={["#2135b3", "#0c2462"]}
      />
      <View style={styles.headerContainer}>
        <Image
          style={styles.arrowBackIcon}
          source={require("../assets/arrow-back.png")}
          alt="img"
        />
        <Text style={styles.userName}>{userData?.firstName}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Fint</Text>
        <Text style={styles.balance}>Balance: ${userData?.balance}</Text>
        <Pressable style={styles.component1}>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#fff"
            onPress={handlePay}
          >
            <Text style={styles.buttonText}>Generate QR code</Text>
          </TouchableHighlight>
        </Pressable>
        <View style={styles.button2}>
          <Text style={styles.buttonText}>FINT ADS</Text>
        </View>
      </View>
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    position: "absolute",
    top: 50,
    left: 20,
  },
  arrowBackIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    marginTop: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 20,
  },
  balance: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderColor: "#2c2c2c",
    borderWidth: 1,
    marginBottom: 20,
  },
  buttonText: {
    color: "#2c2c2c",
    fontSize: 16,
    textAlign: "center",
  },
  button2: {
    backgroundColor: "#fa9746",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    borderColor: "#2c2c2c",
    borderWidth: 1,
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#d9d9d9",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  loadingText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Home;
