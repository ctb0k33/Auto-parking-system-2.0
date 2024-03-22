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
              <Image source={item.image} style={styles.parkingImage} />
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
    borderBottomWidth: 1, // Add a line to separate the items
    borderBottomColor: "#ccc", // Choose a light grey color
    paddingBottom: 10, // Add some space at the bottom of each item
  },
  parkingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  title: {
    flex: 1, // Take up as much space as possible
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
    // You might need to adjust this
  },
  parkingImage: {
    width: "100%", // Make the image take the full width of the row
    height: 250, // Adjust the height to your preference
    resizeMode: "cover", // Cover the area without stretching the image
  },
});

export default ParkingList;
