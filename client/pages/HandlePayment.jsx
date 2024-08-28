import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";

import axiosInstance from "../axiosInstance";

const PaymentScreen = ({ route }) => {
  const { contact } = route.params;
  const [amount, setAmount] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await axiosInstance.post("/auth/QrScreen", {
        amount,
        mobileNumber: contact.phoneNumbers[0].number,
      });

      setQrCodeData(response.data.qrCodeData);
    } catch (error) {
      console.error("Failed to generate QR code", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay {contact.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Generate QR Code" onPress={handlePayment} />
      {qrCodeData && (
        <Image source={{ uri: qrCodeData }} style={styles.qrCode} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginTop: 16,
  },
});

export default PaymentScreen;
