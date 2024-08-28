import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const [amount, setAmount] = useState("");

  const handleGenerate = () => {
    if (amount) {
      navigation.navigate("QrGen", { amount });
    } else {
      alert("Please enter an amount");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>SEND MONEY THROUGH QR</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#bbb"
        />
        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#1a1a1a", // Dark background for input
    color: "#fff", // White text color
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007AFF", // Blue button
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
