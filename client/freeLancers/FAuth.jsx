import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";
import axiosInstance from "../axiosInstance";
const { width } = Dimensions.get("window");

const freelancerSignUpSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Full Name must only contain letters and spaces"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .length(10, "Phone Number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone Number must only contain digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
  skills: z.string().min(1, "Skills are required"),
  portfolio: z.string().url("Portfolio URL must be a valid URL"),
});

export const FreeLanceSignUp = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    skills: "",
    portfolio: "",
  });
  const [errors, setErrors] = useState({});

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    try {
      freelancerSignUpSchema.parse(formData);
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
    if (!isChecked) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.post("/freelance/signup", formData);
      console.log("API Response:", response.data);
      if (response.status === 200) {
        const userId = response.data.fUser?._id;
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
      console.error("Sign-up error:", error.message);
      setErrors({
        server: error.response
          ? error.response.data.message ||
            "An error occurred during sign-up. Please try again."
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
        placeholder="Full Name"
        placeholderTextColor={styles.placeholder.color}
        onChangeText={(text) => handleInputChange("fullName", text)}
        value={formData.fullName}
        accessible={true}
        accessibilityLabel="Full Name"
      />
      {errors.fullName && (
        <Text style={styles.errorText}>{errors.fullName}</Text>
      )}

      <TextInput
        style={styles.inputFullWidth}
        placeholder="Email"
        placeholderTextColor={styles.placeholder.color}
        onChangeText={(text) => handleInputChange("email", text)}
        value={formData.email}
        accessible={true}
        accessibilityLabel="Email"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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

      <TextInput
        style={styles.inputFullWidth}
        placeholder="Skills"
        placeholderTextColor={styles.placeholder.color}
        onChangeText={(text) => handleInputChange("skills", text)}
        value={formData.skills}
        accessible={true}
        accessibilityLabel="Skills"
      />
      {errors.skills && <Text style={styles.errorText}>{errors.skills}</Text>}
      <TextInput
        style={styles.inputFullWidth}
        placeholder="Portfolio URL"
        placeholderTextColor={styles.placeholder.color}
        onChangeText={(text) => handleInputChange("portfolio", text)}
        value={formData.portfolio}
        accessible={true}
        accessibilityLabel="Portfolio URL"
      />
      {errors.portfolio && (
        <Text style={styles.errorText}>{errors.portfolio}</Text>
      )}

      {errors.server && <Text style={styles.errorText}>{errors.server}</Text>}

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={handleCheckboxPress}
          accessible={true}
          accessibilityLabel="Agree to terms and conditions"
        >
          <Image
            style={styles.checkbox}
            source={
              isChecked
                ? require("../assets/freeLance/checked.png")
                : require("../assets/freeLance/unchecked.png")
            }
            accessible={true}
            accessibilityLabel={isChecked ? "Checked" : "Unchecked"}
          />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          I agree to the{" "}
          <Text style={styles.linkText}>Freelancer User Agreement</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.joinButton}
        onPress={handleSubmit}
        accessible={true}
        accessibilityLabel="Join Freelancer"
      >
        <Text style={styles.joinButtonText}>Join Freelancer</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <TouchableOpacity
          onPress={() => navigation.navigate("freeLanceSignin")}
        >
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  checkboxText: {
    fontSize: 14,
    color: "#333",
  },
  linkText: {
    color: "#007BFF",
  },
  joinButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  joinButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  loginText: {
    marginTop: 24,
    fontSize: 14,
    color: "#333",
  },
});
