import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          console.log("No token found, redirecting to login");
          alert("Login Failed");
          navigation.navigate("Login");
          return;
        }

        const response = await axiosInstance.get("/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("User data fetched:", response.data);
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

  const handlePay = () => {
    console.log("Navigating to Input");
    navigation.navigate("Input");
  };

  const handleAffiliate = () => {
    console.log("Navigating to Affiliate");
    navigation.navigate("Affiliate");
  };

  const handleContacts = () => {
    console.log("Navigating to Contacts");
    navigation.navigate("contact");
  };

  const handleProfileClick = () => {
    console.log("Navigating to Profile");
    navigation.navigate("profile");
  };

  const handleFreeLanceClick = () => {
    console.log("Navigating to freeLance");
    navigation.navigate("freeLancePage");
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={handleProfileClick}
          style={styles.profileButton}
        >
          <View style={styles.iconBackground}>
            <Image
              style={styles.profileIcon}
              source={require("../assets/prof-1-1.png")}
              alt="Profile icon"
            />
          </View>
          <Text style={styles.userName}>{userData?.firstName}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Money Transfer</Text>
        <View style={styles.row}>
          <Pressable style={styles.iconContainer} onPress={handleContacts}>
            <Image
              style={styles.icon}
              source={require("../assets/phonebook-3.png")}
              alt="Pay Contacts"
            />
            <Text style={styles.iconText}>Pay Contacts</Text>
          </Pressable>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../assets/bank-3.png")}
              alt="Pay Bank/UPI ID"
            />
            <Text style={styles.iconText}>Pay Bank/UPI ID</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} alt="To Self" />
            <Text style={styles.iconText}>To Self</Text>
          </View>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} alt="More" />
            <Text style={styles.iconText}>More</Text>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="UPI ID"
          placeholderTextColor="#bbb"
        />
      </View>

      <View style={[styles.section, styles.businessSection]}>
        <Text style={styles.sectionTitle}>Fint Business</Text>
        <View style={styles.businessRow}>
          <TouchableOpacity style={styles.businessButton} onPress={handlePay}>
            <Text style={styles.businessButtonText}>Generate QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.businessButton} onPress={() => {}}>
            <Text style={styles.businessButtonText}>AD Mob</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.businessRow}>
          <TouchableOpacity
            style={styles.businessButton}
            onPress={handleAffiliate}
          >
            <Text style={styles.businessButtonText}>Fint Affiliates</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.businessButton}
            onPress={handleFreeLanceClick}
          >
            <Text style={styles.businessButtonText}>Freelance</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sponsored Apps</Text>
        <View style={styles.row}>
          <View style={styles.sponsoredItem}></View>
          <View style={styles.sponsoredItem}></View>
          <View style={styles.sponsoredItem}></View>
          <View style={styles.sponsoredItem}></View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sponsored Games</Text>
        <View style={styles.row}>
          <View style={styles.sponsoredItem}></View>
          <View style={styles.sponsoredItem}></View>
          <View style={styles.sponsoredItem}></View>
          <View style={styles.sponsoredItem}></View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Balance: ${userData?.balance}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000", // Background set to complete black
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Background set to complete black
  },
  loadingText: {
    fontSize: 20,
    color: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 20,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBackground: {
    backgroundColor: "#666",
    padding: 10,
    borderRadius: 30,
    marginRight: 16,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
    tintColor: "#fff",
  },
  userName: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#141312", // Section background set to #141312
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  businessSection: {
    backgroundColor: "#141312", // Section background set to #141312
    padding: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
  businessRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 5,
    backgroundColor: "#666",
    borderRadius: 8,
  },
  iconText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#333",
    marginTop: 10,
  },
  businessButton: {
    flex: 1,
    backgroundColor: "#4c4c4c",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  businessButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sponsoredItem: {
    width: 70,
    height: 70,
    backgroundColor: "#666",
    borderRadius: 8,
  },
  footer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#141312",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  footerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
