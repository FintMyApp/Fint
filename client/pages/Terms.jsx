import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import axiosInstance from "../axiosInstance";

const Terms = () => {
  const [termsContent, setTermsContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axiosInstance.get("/policy/terms");
        setTermsContent(response.data.content);
      } catch (error) {
        console.error("Error fetching terms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/bg.png")}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <View style={styles.termsContainer}>
            <Text style={styles.title}>Terms and Conditions</Text>
            <Text style={styles.termsText}>{termsContent}</Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  termsContainer: {
    backgroundColor: "#eeeee4",
    borderRadius: 8,
    padding: 20,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  termsText: {
    color: "#000",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
});

export default Terms;
