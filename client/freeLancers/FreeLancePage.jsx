import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export const FreeLancePage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image
          style={styles.arrowIcon}
          source={require("../assets/freeLance/arrow2-1.png")}
          accessible={true}
          accessibilityLabel="Go back"
        />
      </Pressable>

      <View style={styles.page}>
        <Text style={styles.headerText}>Select Account Type</Text>
        <Text style={styles.subHeaderText}>
          Don’t worry, this can be changed later.
        </Text>

        {/* Image on top of "I want to work" button */}
        <Image
          style={styles.imagePlaceholder}
          source={require("../assets/freeLance/image-151.png")}
          accessible={true}
          accessibilityLabel="Work illustration"
        />

        <Pressable
          style={[styles.button, styles.glassMorphism]}
          onPress={() => navigation.navigate("freeLanceSignUp")}
        >
          <Text style={styles.buttonText}>I want to work</Text>
          <Image
            style={styles.arrowIconInsideButton}
            source={require("../assets/freeLance/arrow-1.png")}
            accessible={true}
            accessibilityLabel="Navigate forward"
          />
        </Pressable>

        <Image
          style={styles.imagePlaceholder}
          source={require("../assets/freeLance/image-152.png")}
          accessible={true}
          accessibilityLabel="Hire illustration"
        />

        <Pressable style={[styles.button, styles.glassMorphism]}>
          <Text style={styles.buttonText}>I want to hire</Text>
          <Image
            style={styles.arrowIconInsideButton}
            source={require("../assets/freeLance/arrow-1.png")}
            accessible={true}
            accessibilityLabel="Navigate forward"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7eef4",
  },
  page: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    width: width * 0.8,
    height: 60,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  glassMorphism: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  arrowIconInsideButton: {
    width: 24,
    height: 24,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
    width: 50, // Increase the width to provide more space
    height: 50, // Increase the height to provide more space
    alignItems: "center", // Center the arrow within the button
    justifyContent: "center",
  },
  arrowIcon: {
    width: 20, // Further reduce the size to fit within the button
    height: 20,
    resizeMode: "contain",
  },
  imagePlaceholder: {
    width: width * 0.5,
    height: width * 0.3,
    marginBottom: 20,
    resizeMode: "contain",
  },
});
