import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Import FileSystem to handle file operations

import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../axiosInstance";

export const FreeLanceUploadPortfolio = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    try {
      const imageExtension = image.split(".").pop();

      const formData = new FormData();
      formData.append("image", {
        uri: image,
        type: `image/${imageExtension}`,
        name: `portfolio.${imageExtension}`,
      });

      const response = await axiosInstance.post(
        "/freelance/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Image uploaded successfully!");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("An error occurred during image upload. Please try again.");
    }
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

      <Text style={styles.title}>Upload Portfolio Image</Text>

      <TouchableOpacity
        style={styles.pickImageButton}
        onPress={pickImage}
        accessible={true}
        accessibilityLabel="Pick an image"
      >
        <Text style={styles.pickImageButtonText}>Pick an Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleUpload}
        accessible={true}
        accessibilityLabel="Upload Image"
      >
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    alignItems: "center",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  pickImageButton: {
    backgroundColor: "#0763ef",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  pickImageButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
    borderRadius: 12,
  },
  uploadButton: {
    backgroundColor: "#0763ef",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
