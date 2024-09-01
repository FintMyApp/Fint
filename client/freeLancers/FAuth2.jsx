import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

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

      <Text style={styles.title}>Upload Your Portfolio</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePickerText}>Pick an Image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => alert("Image uploaded successfully!")}
        accessible={true}
        accessibilityLabel="Upload Image"
      >
        <Text style={styles.uploadButtonText}>Upload</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.finishButton}
        onPress={() => navigation.navigate("Home")}
        accessible={true}
        accessibilityLabel="Finish"
      >
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  imagePicker: {
    width: 150,
    height: 150,
    backgroundColor: "#d9d9d9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerText: {
    color: "#000",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  uploadButton: {
    backgroundColor: "#0763ef",
    paddingVertical: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  uploadButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  finishButton: {
    backgroundColor: "#0ea4f9",
    paddingVertical: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    elevation: 3,
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
