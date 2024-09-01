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

const { width } = Dimensions.get("window");

export const FreeLanceSignUp = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor={styles.placeholderDarker.color}
          accessible={true}
          accessibilityLabel="First Name"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={styles.placeholderDarker.color}
          accessible={true}
          accessibilityLabel="Last Name"
        />
      </View>

      <TextInput
        style={styles.inputFullWidth}
        placeholder="Email"
        placeholderTextColor={styles.placeholderDarker.color}
        accessible={true}
        accessibilityLabel="Email"
      />
      <TextInput
        style={styles.inputFullWidth}
        placeholder="Phone Number"
        keyboardType="numeric"
        placeholderTextColor={styles.placeholderDarker.color}
        accessible={true}
        accessibilityLabel="Phone Number"
      />
      <TextInput
        style={styles.inputFullWidth}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={styles.placeholderDarker.color}
        accessible={true}
        accessibilityLabel="Password"
      />

      <TextInput
        style={styles.inputFullWidth}
        placeholder="Skills"
        placeholderTextColor={styles.placeholderDarker.color}
        accessible={true}
        accessibilityLabel="Skills"
      />
      <TextInput
        style={styles.inputFullWidth}
        placeholder="Portfolio URL"
        placeholderTextColor={styles.placeholderDarker.color}
        accessible={true}
        accessibilityLabel="Portfolio URL"
      />

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
        onPress={() => navigation.navigate("freeLanceUploadPortfolio")}
        accessible={true}
        accessibilityLabel="Join Freelancer"
      >
        <Text style={styles.joinButtonText}>Join Freelancer</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.linkText}>Login</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7eef4",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 20,
    color: "#000",
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#d9d9d9",
    padding: 15,
    borderRadius: 12,
    flex: 1,
    marginRight: 10,
  },
  inputFullWidth: {
    backgroundColor: "#d9d9d9",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    marginBottom: 15,
  },
  joinButton: {
    backgroundColor: "#0763ef",
    paddingVertical: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginText: {
    fontSize: 20,
    textAlign: "center",
    color: "#000",
  },
  linkText: {
    color: "#0ea4f9",
    textDecorationLine: "underline",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 20,
    color: "#000",
  },
  placeholderDarker: {
    color: "#777",
  },
});
