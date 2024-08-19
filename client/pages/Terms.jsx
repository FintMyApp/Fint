import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient
      style={styles.container}
      locations={[0.06, 0.11, 0.42, 0.73, 0.96]}
      colors={["#050c9c", "#050c9c", "#3575ef", "#41c0f9", "#a7e6ff"]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <Text style={styles.termsText}>{termsContent}</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  termsText: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
});

export default Terms;
