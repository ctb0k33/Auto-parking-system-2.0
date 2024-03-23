import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, Alert, Pressable, TextInput } from "react-native";
import AImage from "../assets/images/A.png";
import BImage from "../assets/images/B.png";
import { Modal } from "../components/common/Modal";
import * as ImagePicker from "expo-image-picker";

const initialParkings = [
  { id: "1", name: "Parking A", location: "Location A", image: AImage },
  { id: "2", name: "Parking B", location: "Location B", image: BImage },
  // Add more parking spots here
];

const ParkingList = ({route, navigation }) => {
  const [modalState, setModalState] = useState(false);
  const [parkings, setParkings] = useState(initialParkings);
  const [pickedImage, setPickedImage] = useState(null);

  const handleAdd = () => {
    navigation.navigate("AddEditParking", { updateParkings: setParkings });
  };

  const handleEdit = (parking) => {
    // navigation.navigate("AddEditParking", {
    //   parkingId: parking.id,
    //   parking,
    //   updateParkings: setParkings,
    // });
    setModalState(true);
  };

  const handleDelete = (id) => {
    setParkings((currentParkings) =>
      currentParkings.filter((parking) => parking.id !== id)
    );
  };
  
  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setPickedImage(result.uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong!');
    }
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
            <Pressable onPress={() => { navigation.navigate("ParkingDetail") }}>
              {item.image && (item.id == 1 || item.id == 2) && (
                <Image source={item.image} style={styles.parkingImage} />
              )}
            </Pressable>
            <Pressable onPress={() => { navigation.navigate("ParkingDetail") }}>
              {item.image && item.id != 1 && item.id != 2 && (
                <Image source={{ uri: item.image }} style={styles.parkingImage} />
              )}
            </Pressable>
          </View>
        )}
        ListFooterComponent={() => (
          <Button title="Add Parking" onPress={handleAdd} style={styles.footerButton} />
        )}
        ListFooterComponentStyle={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}
      />
      <Modal isOpen={modalState} style={styles.container}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Register</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
          </View>



          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor="gray"
            />
            <Pressable onPress={handlePickImage}>
            <Text style={styles.upload}>Tải ảnh</Text>
          </Pressable>
          {pickedImage && <Image source={{ uri: pickedImage }} style={{ width: '100%', height: 250 }} />}
          
          </View>




          <View style={styles.btnContainer}>
            
            <Pressable
              onPress={() => {
                setModalState(false);
              }}
              style={styles.closeBtn}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalState(false)}
              style={styles.confirmBtn}
            >
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modal: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 25,
    borderRadius: 8,
  },
  modalTitle: {
    alignSelf: "center",
    color: "#2D0C57",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  closeBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    width: 130,
    marginRight: 30,
  },
  confirmBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    width: 130,
  },
  closeBtnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  confirmBtnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    
  },
  upload: {
    color: 'blue',
    marginLeft: 5,
    marginBottom: 12,
  }
});

export default ParkingList;