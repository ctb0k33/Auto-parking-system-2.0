import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import axiosInstance from "../../utils/axios";


const AllParking = ({navigation}) => {
  const [parkings, setParkings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredParkings, setFilteredParkings] = useState([]);

  const fetchParkingData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/parking");
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
  },[]);
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
              <Text style={styles.title}>Name: {item.name}</Text>
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
    backgroundColor: "#f5f5f5", // Adds a light background color for contrast
  },
  searchBar: {
    fontSize: 18,
    borderColor: '#007AFF', // Use a color that matches your app theme
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 10,
    margin: 12,
    backgroundColor: "#fff", // White background for the input
  },
  parkingItemContainer: {
    backgroundColor: '#fff', // White background for each item
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Adds shadow for elevation effect
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5, // Adds space below the title
  },
  text: {
    marginBottom: 5, // Adds space between texts for better readability
  },
});

export default AllParking;