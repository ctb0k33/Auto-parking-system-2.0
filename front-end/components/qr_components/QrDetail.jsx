import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList } from "react-native";
import asyncStorage from '@react-native-async-storage/async-storage';
import styles from './Qr_detail.style';

export default function QrDetail() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getPrivateQr = async () => {
      const qr = await asyncStorage.getItem("Private QR");
      data = data.push({id: 1, label: "Private QR", image: {uri: qr.trim()}});
      setData(data)
    };
    getPrivateQr();
  },[])
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
            <Text style={styles.text}>
              {item.label}
            </Text>
            <Image
              source={item.image}
              style={styles.qrImage}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
