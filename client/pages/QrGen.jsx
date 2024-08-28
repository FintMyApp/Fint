import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axiosInstance from "../axiosInstance";

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
        const response = await axiosInstance.post("/auth/QrScreen", { amount });
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
          setShowAds(true);
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
          setShowAds(true);
        }
      };

      const interval = setInterval(checkExpiration, 1000);
      return () => clearInterval(interval);
    }
  }, [expirationTime]);

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : qrCode && timeLeft > 0 ? (
        <>
          <Text style={styles.header}>YOUR QR CODE</Text>
          <View style={styles.qrContainer}>
            <Image source={{ uri: qrCode }} style={styles.qrImage} />
            <Text style={styles.timer}>Time left: {timeLeft}s</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setTimeLeft(30)}
          >
            <Text style={styles.buttonText}>Re-generate</Text>
          </TouchableOpacity>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 20,
  },
  qrContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  qrImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  timer: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: "#0043A2",
    fontSize: 16,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
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
