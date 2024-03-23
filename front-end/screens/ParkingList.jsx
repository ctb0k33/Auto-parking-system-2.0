import React, { useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Image } from "react-native";
import AImage from "../assets/images/A.png";
import BImage from "../assets/images/B.png";

const initialParkings = [
  { id: "1", name: "Parking A", location: "Location A", image: AImage },
  { id: "2", name: "Parking B", location: "Location B", image: BImage },
  // Add more parking spots here
];

const ParkingList = ({ navigation }) => {
  const [parkings, setParkings] = useState(initialParkings);

  const handleAdd = () => {
    navigation.navigate("AddEditParking", { updateParkings: setParkings });
  };

  const handleEdit = (parking) => {
    navigation.navigate("AddEditParking", {
      parkingId: parking.id,
      parking,
      updateParkings: setParkings,
    });
  };

  const handleDelete = (id) => {
    setParkings((currentParkings) =>
      currentParkings.filter((parking) => parking.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={parkings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.parkingItemContainer}>
            <View style={styles.parkingItem}>
              <Text style={styles.title}>
                {item.name} - {item.location}
              </Text>
              <View style={styles.buttonsContainer}>
                <Button title="Edit" onPress={() => handleEdit(item)} />
                <Button title="Delete" onPress={() => handleDelete(item.id)} />
              </View>
            </View>
            {item.image && (item.id == 1 || item.id == 2) && (
              <Image source={item.image||uri} style={styles.parkingImage} />
            )}
            {item.image && item.id != 1 && item.id != 2 && (
              <Image source={{ uri: item.image }} style={styles.parkingImage} />
            )}
          </View>
        )}
        ListFooterComponent={() => (
          <Button title="Add Parking" onPress={handleAdd} style={styles.footerButton} />
        )}
        ListFooterComponentStyle={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  parkingItemContainer: {
    backgroundColor: '#FFFFFF', // Adds a clean background color to each item
    marginVertical: 8, // Adds vertical spacing between items
    marginHorizontal: 16, // Adds horizontal spacing for a card-like feel
    borderRadius: 8, // Rounds the corners for a softer look
    elevation: 3, // Adds a subtle shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  parkingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16, // Increased padding for better touch targets and spacing
  },
  title: {
    flex: 1, // Allows title to take up as much space as possible
    fontWeight: 'bold', // Makes the title stand out
    fontSize: 16, // Slightly larger text for readability
    marginRight: 8, // Ensures spacing between title and buttons
  },
  buttonsContainer: {
    flexDirection: "row",
    // Removed justifyContent to allow buttons to be close to each other
    // This will keep the edit and delete buttons together at the end of the row
  },
  parkingImage: {
    width: "100%", // Maintains full width of the row
    height: 200, // Slightly reduced height to balance detail visibility and layout compactness
    resizeMode: "cover", // Ensures the image covers the area nicely without stretching
     // Adds spacing between the image and the item details
  },
});


export default ParkingList;