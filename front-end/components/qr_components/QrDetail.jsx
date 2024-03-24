import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList } from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Qr_detail.style";

export default function QrDetail() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getPrivateQr = async () => {
      try {
        const qr = await asyncStorage.getItem("Private QR");
        // Use functional update form to ensure immutability and reliance on the latest state
        setData(currentData => [
          ...currentData, // Spread the current data to maintain previous entries
          {
            id: Date.now().toString(), // Example of generating a unique ID based on timestamp
            label: "Private QR",
            image: { uri: qr },
          },
          {
            id: (Date.now()+1).toString(), // Example of generating a unique ID based on timestamp
            label: "One Time QR",
            image: { uri: qr },
          }
        ]);
      } catch (e) {
        console.log(e);
      }
    };
    getPrivateQr();
  }, []);
  
  // Sample data for FlatList
  return (
    <View style={styles.container}>
      <FlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        data={data}
        horizontal={true}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.label}</Text>
            <Image
              source={item.image}
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
