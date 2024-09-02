import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";
import axiosInstance from "../axiosInstance";
const { width } = Dimensions.get("window");

export const freelancerLoginSchema = z.object({
  phoneNumber: z
    .string()
    .length(10, "Phone Number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone Number must only contain digits"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const FreeLanceLogin = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    try {
      freelancerLoginSchema.parse(formData);
      return true;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errorMessages = e.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrors(errorMessages);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.post("/freelance/signin", formData);
      console.log("API Response:", response.data);
      if (response.status === 200) {
        const { user, token } = response.data;
        const userId = user?._id;
        console.log("====================================");
        console.log("UserID:", userId);
        console.log("====================================");

        if (!userId) {
          console.error("User ID is undefined");
          return;
        }

        navigation.navigate("freeLanceProfile", { userId });
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrors({
        server: error.response
          ? error.response.data.message ||
            "An error occurred during login. Please try again."
          : "An unexpected error occurred.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessible={true}
        accessibilityLabel="Go back"
      >
        <Text style={styles.backButtonText}>{"<-"}</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/freeLance/logo.png")}
          accessible={true}
          accessibilityLabel="Logo"
        />
      </View>

      <TextInput
        style={styles.inputFullWidth}
        placeholder="Phone Number"
        keyboardType="numeric"
        placeholderTextColor={styles.placeholder.color}
        onChangeText={(text) => handleInputChange("phoneNumber", text)}
        value={formData.phoneNumber}
        accessible={true}
        accessibilityLabel="Phone Number"
      />
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      )}

      <TextInput
        style={styles.inputFullWidth}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={styles.placeholder.color}
        onChangeText={(text) => handleInputChange("password", text)}
        value={formData.password}
        accessible={true}
        accessibilityLabel="Password"
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {errors.server && <Text style={styles.errorText}>{errors.server}</Text>}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit}
        accessible={true}
        accessibilityLabel="Login"
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don't have an account?{" "}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("freeLanceSignUp")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: "#333",
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  inputFullWidth: {
    width: width - 32,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    backgroundColor: "#FFF",
    marginBottom: 10,
  },
  placeholder: {
    color: "#888",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  signUpText: {
    marginTop: 24,
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    color: "#007BFF",
  },
});

FreeLanceLogin;
