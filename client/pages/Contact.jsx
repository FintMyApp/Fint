import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as Contacts from "expo-contacts";

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const handleContactPress = (contact) => {
    navigation.navigate("PaymentScreen", { contact });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Contact to Pay</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleContactPress(item)}
          >
            <View style={styles.contactInfo}>
              <Image
                source={{
                  uri: item.photoUrl || "https://via.placeholder.com/50",
                }}
                style={styles.contactImage}
              />
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{item.name}</Text>
                {item.phoneNumbers && (
                  <Text style={styles.contactNumber}>
                    {item.phoneNumbers[0].number}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  contactItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  contactNumber: {
    fontSize: 14,
    color: "#777",
  },
});

export default ContactList;
