import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { z } from "zod";
import axiosInstance from "../axiosInstance";
import { MyCheckbox } from "../components/MyCheckbox";

const nameRegex = /^[A-Za-z]+$/;
const phoneRegex = /^\d{10}$/;

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must not exceed 50 characters")
    .regex(nameRegex, "First name can only contain alphabets"),
  lastName: z
    .string()
    .min(1, "Last name must be at least 1 character long")
    .max(50, "Last name must not exceed 50 characters")
    .regex(nameRegex, "Last name can only contain alphabets"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(
      phoneRegex,
      "Phone number must be exactly 10 digits and contain only numbers"
    ),
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
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSignup = async () => {
    setLoading(true);
    setErrors({});

    if (!isChecked) {
      setErrors((prev) => ({
        ...prev,
        general: "You must agree to the Terms and Conditions",
      }));
      setLoading(false);
      return;
    }

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
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title1}>FINT</Text>
        <Text style={styles.title}>Welcome, Create an Account</Text>

        {errors.general && (
          <Text style={styles.errorText}>{errors.general}</Text>
        )}

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
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              errors.password && { borderColor: "red", borderWidth: 1 },
            ]}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: "#03254c",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    alignItems: "center",
  },
  title1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    textAlign: "left",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  passwordContainer: {
    width: "100%",
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "black",
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#fff",
  },
  loginLink: {
    fontSize: 14,
    color: "#ffcc00",
    marginLeft: 5,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});

export default SignUp;
