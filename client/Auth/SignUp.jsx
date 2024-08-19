import React, { useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { MyCheckbox } from "../components/MyCheckbox";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { z } from "zod";
import axiosInstance from "../axiosInstance";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must not exceed 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name must be at least 1 character long")
    .max(50, "Last name must not exceed 50 characters"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  email: z.string().email("Invalid email address"),
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
});

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      setErrors({
        general: "Please fill in all the fields",
      });
      setLoading(false);
      return;
    }

    try {
      registerSchema.parse({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });

      await axiosInstance.post("/auth/register", {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });

      navigation.navigate("Otp", { email });
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
        console.error("Signup error", error.message);
        alert("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTermsNavigation = () => {
    navigation.navigate("Terms");
  };

  return (
    <LinearGradient
      style={styles.container}
      locations={[0.06, 0.11, 0.42, 0.73, 0.96]}
      colors={["#050c9c", "#050c9c", "#3575ef", "#41c0f9", "#a7e6ff"]}
    >
      <Text style={styles.title1}>FINT</Text>
      <Text style={styles.title}>Welcome, Create an Account</Text>

      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={[
          styles.input,
          errors.firstName && { borderColor: "red", borderWidth: 1 },
        ]}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        placeholderTextColor="#999"
      />
      {errors.firstName && (
        <Text style={styles.errorText}>{errors.firstName}</Text>
      )}

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={[
          styles.input,
          errors.lastName && { borderColor: "red", borderWidth: 1 },
        ]}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        placeholderTextColor="#999"
      />
      {errors.lastName && (
        <Text style={styles.errorText}>{errors.lastName}</Text>
      )}

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={[
          styles.input,
          errors.phoneNumber && { borderColor: "red", borderWidth: 1 },
        ]}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
        placeholderTextColor="#999"
      />
      {errors.phoneNumber && (
        <Text style={styles.errorText}>{errors.phoneNumber}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[
          styles.input,
          errors.email && { borderColor: "red", borderWidth: 1 },
        ]}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[
          styles.input,
          errors.password && { borderColor: "red", borderWidth: 1 },
        ]}
        placeholder="Enter your password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#999"
        autoCapitalize="none"
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <View style={styles.checkboxContainer}>
        <MyCheckbox
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <TouchableOpacity onPress={handleTermsNavigation}>
          <Text style={styles.checkboxLabel}>
            I agree to the Terms and Conditions
          </Text>
        </TouchableOpacity>
      </View>
      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: "gray" }]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
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
  title1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
    color: "#fff",
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
    marginBottom: 10,
    color: "#000",
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginTop: 20, // Added margin to create space between checkbox and button
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
    fontSize: 16,
  },
  loginLink: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default SignUp;
