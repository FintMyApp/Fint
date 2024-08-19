import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import axiosInstance from "../axiosInstance";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    setLoading(true);
    axiosInstance
      .post("/auth/reset-password", {
        email,
      })
      .then((response) => {
        console.log(response.data);
        alert("Reset link sent to your email!");
        const { resetToken } = response.data;
        console.log(resetToken);

        navigation.navigate("ResetPassword", { resetToken });
      })
      .catch((error) => {
        console.error(error.message);
        alert("Failed to send reset link!");
      })
      .finally(() => {
        setLoading(false);
      });

    console.log("Reset Password button pressed", { email });
  };

  return (
    <LinearGradient
      style={styles.container}
      locations={[0.06, 0.11, 0.42, 0.73, 0.96]}
      colors={["#050c9c", "#050c9c", "#3575ef", "#41c0f9", "#a7e6ff"]}
    >
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "gray" }]}
        onPress={handleResetPassword}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Remember your password?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login here</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  loginContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
  },
  loginLink: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default ForgotPassword;
