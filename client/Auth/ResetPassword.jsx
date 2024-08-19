import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axiosInstance from "../axiosInstance";

const ResetPassword = ({ route, navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordReset = () => {
    const { resetToken } = route.params || {};

    if (!resetToken) {
      alert("Invalid or missing reset token");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axiosInstance
      .post(`/auth/reset/${resetToken}`, {
        newPassword,
        confirmPassword,
      })
      .then((response) => {
        console.log(response.data);
        alert("Password reset successful");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error(error.message);
        alert("Password reset failed");
      });
  };

  return (
    <LinearGradient
      style={styles.container}
      locations={[0.06, 0.11, 0.42, 0.73, 0.96]}
      colors={["#050c9c", "#050c9c", "#3575ef", "#41c0f9", "#a7e6ff"]}
    >
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your new password"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your new password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#fff",
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#000",
  },
  button: {
    width: "50%",
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ResetPassword;
