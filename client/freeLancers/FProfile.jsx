import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axiosInstance from "../axiosInstance";

const { width } = Dimensions.get("window");

export const FreeLanceProfile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;

  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    skills: "",
    portfolio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/freelance/profile/${userId}`);
      const profileData = response.data;

      // Convert the skills array to a comma-separated string
      const skillsString = profileData.skills.join(", ");

      setProfileData(profileData);
      setFormData({ ...profileData, skills: skillsString });
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(
        `/freelance/profile/${userId}`,
        formData
      );
      setProfileData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.profilePicture}
          source={require("../assets/prof-1-1.png")}
        />
        <Text style={styles.profileName}>{profileData.fullName}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          editable={isEditing}
          onChangeText={(text) => handleInputChange("email", text)}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={formData.phoneNumber}
          editable={isEditing}
          onChangeText={(text) => handleInputChange("phoneNumber", text)}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Skills:</Text>
        <TextInput
          style={styles.input}
          value={formData.skills}
          editable={isEditing}
          onChangeText={(text) => handleInputChange("skills", text)}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Portfolio URL:</Text>
        <TextInput
          style={styles.input}
          value={formData.portfolio}
          editable={isEditing}
          onChangeText={(text) => handleInputChange("portfolio", text)}
        />
      </View>

      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  input: {
    width: width - 32,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    backgroundColor: "#FFF",
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 24,
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#28A745",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
