import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import axiosInstance from "../../utils/axios";
import { GET_API } from "../../api";


const AllParking = ({ navigation }) => {
  const [parkings, setParkings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredParkings, setFilteredParkings] = useState([]);

  const fetchParkingData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(GET_API().getAllParking)
      console.log("hello", GET_API().getAllParking)
      const data = response.data;
      setParkings(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchParkingData();
  }, []);
  useEffect(() => {
    // Filter parkings when searchTerm changes
    const results = parkings.filter(parking =>
      parking.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredParkings(results);
  }, [searchTerm, parkings]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>An error occurred: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredParkings}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.parkingItemContainer}
            onPress={() => navigation.navigate("ParkingDetail", { id: item._id })}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Image
                source={require('../../assets/images/nha_xe_dhqg.jpg')}
                style={styles.picture}
              />
              <Text style={styles.text}>Address: {item.address}</Text>
              <Text style={styles.text}>Rating: {item.rating}</Text>
              <Text style={styles.text}>Images Count: {item.images.length}</Text>
              <Text style={styles.text}>Fare Count: {item.fare.length}</Text>
              <Text style={styles.text}>Service Count: {item.service.length}</Text>
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
    paddingTop: 10, // Add space at the top of the container
  },
  searchBar: {
    fontSize: 18,
    borderColor: '#007AFF',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 10,
    margin: 12,
    backgroundColor: "#fff",
    marginBottom: 10, // Add space at the bottom of the search bar
  },
  parkingItemContainer: {
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10, // Increase border radius for smoother corners
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, // Adjust shadow opacity for better effect
    shadowRadius: 4,
    elevation: 5,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333', // Change title color for better readability
  },
  text: {
    marginBottom: 5,
    color: '#666', // Change text color for better readability
  },
  picture: {
    width: '100%',
    height: 250,
    cover: 'contain',
    borderRadius: 12,
    marginBottom: 12,
  }
});

export default AllParking;