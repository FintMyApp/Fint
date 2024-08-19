import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const Otp = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/otp/verify-otp/${email}`, {
        otp,
      });

      if (response.status === 200) {
        Alert.alert("Success", response.data.message);
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", response.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification failed", error.message);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleOtpVisibility = () => {
    setShowOtp(!showOtp);
  };

  return (
    <LinearGradient
      style={styles.container}
      locations={[0.06, 0.11, 0.42, 0.73, 0.96]}
      colors={["#050c9c", "#050c9c", "#3575ef", "#41c0f9", "#a7e6ff"]}
    >
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={(text) => setOtp(text)}
          secureTextEntry={!showOtp}
          placeholderTextColor="#999"
          keyboardType="number-pad"
        />
        <TouchableOpacity onPress={toggleOtpVisibility} style={styles.eyeIcon}>
          <Icon name={showOtp ? "eye" : "eye-slash"} size={20} color="#999" />
        </TouchableOpacity>
      </View>
      <Text style={styles.timer}>
        {timer > 0 ? `Time left: ${timer} sec` : "Time is up!"}
      </Text>
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "gray" }]}
        onPress={handleSubmit}
        disabled={loading || timer === 0}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    color: "#000",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    height: 40,
    justifyContent: "center",
  },
  timer: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Otp;
