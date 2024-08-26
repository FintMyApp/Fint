import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import axios from "axios";

export function QRCodeScreen({ route, navigation }) {
  const { amount } = route.params;
  const [qrCode, setQrCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState(null);
  const [expirationTime, setExpirationTime] = useState(null);
  const [showAds, setShowAds] = useState(false);

  useEffect(() => {
    const generateQrCode = async () => {
      try {
        const response = await axios.post(
          "http://192.168.0.103:8000/api/auth/QrScreen",
          { amount }
        );
        setQrCode(response.data.qrCodeData);
        setExpirationTime(response.data.expirationTime);
        setError(null);
        setShowAds(false);
      } catch (error) {
        console.error("Failed to generate QR code:", error);
        setError("Failed to generate QR code. Please try again later.");
      }
    };

    generateQrCode();

    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timer);
          setQrCode(null);
          setShowAds(true); // Show ads when QR code expires
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [amount]);

  useEffect(() => {
    if (expirationTime) {
      const checkExpiration = () => {
        const currentTime = Date.now();
        if (currentTime > expirationTime) {
          setQrCode(null);
          setShowAds(true); // Show ads when QR code expires
        }
      };

      const interval = setInterval(checkExpiration, 1000);
      return () => clearInterval(interval);
    }
  }, [expirationTime]);

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : qrCode && timeLeft > 0 ? (
        <>
          <Text style={styles.timer}>Time left: {timeLeft} seconds</Text>
          <Image source={{ uri: qrCode }} style={styles.qrImage} />
        </>
      ) : showAds ? (
        <View style={styles.adsContainer}>
          <Text style={styles.adsText}>Here is your ad</Text>
        </View>
      ) : (
        <Text style={styles.message}>
          The QR code has expired. Please generate a new one.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  timer: {
    fontSize: 18,
    marginBottom: 10,
    color: "red",
  },
  qrImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  adsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  adsText: {
    fontSize: 18,
    textAlign: "center",
    color: "gray",
  },
});
