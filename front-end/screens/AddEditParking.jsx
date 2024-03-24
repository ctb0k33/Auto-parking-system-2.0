import React, { useEffect, useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const AddEditParking = ({ route, navigation }) => {
  const { parking, updateParkings } = route.params;
  const [name, setName] = useState(parking?.name || "");
  const [location, setLocation] = useState(parking?.location || "");
  const [image, setImage] = useState(parking?.image || "");

  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "Permission to access camera roll is required to select an image!");
        return;
      }
      const pickerResult = await ImagePicker.launchImageLibraryAsync();
      if (!pickerResult.cancelled) {
        const selectedAsset = pickerResult.assets[0];
        setImage(`${selectedAsset.uri}?${new Date().getTime()}`);
      }
    } catch (error) {
      console.error("ImagePicker Error: ", error);
    }
  };

  const handleSubmit = () => {
    const newParkingData = { id: parking?.id || Date.now().toString(), name, location, image };
    updateParkings((currentParkings) =>
      parking ? currentParkings.map((p) => (p.id === parking.id ? newParkingData : p)) : [...currentParkings, newParkingData]
    );
    //go back parkinglist
    navigation.navigate("ParkingList");
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
      <Pressable style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("ParkingList")}>
        <Text style={styles.buttonText}>Cancel</Text>
      </Pressable>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light grey background
  },
  input: {
    height: 50,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e1e1e1', // Softer border color
    padding: 15,
    borderRadius: 10, // Rounded corners for inputs
    backgroundColor: '#ffffff', // White background for inputs
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF', // Blue background for the button
    padding: 15,
    borderRadius: 10, // Rounded corners for the button
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#ffffff', // White text for the button
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: "cover",
    borderRadius: 10, // Rounded corners for the image
    marginBottom: 15,
  },
});

export default AddEditParking;
