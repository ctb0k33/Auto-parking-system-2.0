import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet,Image,Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";


const AddEditParking = ({ route, navigation }) => {
  const { parking, updateParkings } = route.params;
  const [name, setName] = useState(parking?.name || "");
  const [location, setLocation] = useState(parking?.location || "");
  const [image, setImage] = useState(parking?.image || "");

  const handleImagePick = async () => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Permission to access camera roll is required to select an image!");
      return;
    }

    // Pick the image
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }

    // Set the image URI
    const selectedAsset = pickerResult.assets[0];
    setImage(selectedAsset.uri);
  };

  const handleSubmit = () => {
    const newParkingData = { id: parking?.id || Date.now().toString(), name, location, image };

    updateParkings((currentParkings) =>
      parking
        ? currentParkings.map((p) => (p.id === parking.id ? newParkingData : p))
        : [...currentParkings, newParkingData]
    );

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Pick Image" onPress={handleImagePick} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    width: '100%', // Use full width of the screen
    height: 250, // Set a fixed height for the image
    resizeMode: 'cover', // cover, so the aspect ratio is maintained
    marginBottom: 12,
  },
});

export default AddEditParking;
