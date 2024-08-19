import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios, { Axios } from "axios";
import { z } from "zod";
import axiosInstance from "../axiosInstance";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    try {
      setErrors({});

      loginSchema.parse({
        phoneNumber,
        password,
      });

      await axiosInstance.post("/auth/login", {
        phoneNumber,
        password,
      });
      navigation.navigate("Home");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.errors.reduce(
          (acc, { path, message }) => {
            acc[path[0]] = message;
            return acc;
          },
          {}
        );
        setErrors(validationErrors);
      } else {
        console.error("Login error", error.message);
        alert("Login Failed, please try again");
      }
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <LinearGradient
      style={styles.container}
      locations={[0.06, 0.11, 0.42, 0.73, 0.96]}
      colors={["#050c9c", "#050c9c", "#3575ef", "#41c0f9", "#a7e6ff"]}
    >
      <Text style={styles.title}>Login</Text>

      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={[
          styles.input,
          errors.phoneNumber && { borderColor: "red", borderWidth: 1 },
        ]}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        placeholderTextColor="#999"
        keyboardType="number-pad"
        autoCapitalize="none"
      />
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[
          styles.input,
          errors.password && { borderColor: "red", borderWidth: 1 },
        ]}
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.signupLink}>Sign-up</Text>
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  forgotPasswordLink: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
  signupContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    textAlign: "center",
  },
  signupLink: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default Login;
