import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "../axiosInstance";

const Otp = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setResendVisible(true);
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
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/otp/resend-otp`, { email });
      if (response.status === 200) {
        Alert.alert("Success", "OTP has been resent to your email.");
        setTimer(30);
        setResendVisible(false);
      } else {
        Alert.alert("Error", response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resending OTP failed", error.message);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleOtpVisibility = () => {
    setShowOtp(!showOtp);
  };

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
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
          <TouchableOpacity
            onPress={toggleOtpVisibility}
            style={styles.eyeIcon}
          >
            <Icon name={showOtp ? "eye" : "eye-slash"} size={20} color="#999" />
          </TouchableOpacity>
        </View>
        <Text style={styles.timer}>
          {timer > 0 ? `Time left: ${timer} sec` : "Time is up!"}
        </Text>
        {resendVisible && (
          <TouchableOpacity
            style={styles.resendButton}
            onPress={handleResendOtp}
            disabled={loading}
          >
            <Text style={styles.resendButtonText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, loading && { backgroundColor: "gray" }]}
          onPress={handleSubmit}
          disabled={loading || !otp}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#1b1464",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
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
  resendButton: {
    backgroundColor: "#41c0f9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  resendButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
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
