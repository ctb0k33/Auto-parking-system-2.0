import React, { useState } from 'react';
import { Text, View, Image, FlatList } from "react-native";
import styles from './Qr_detail.style';

export default function QrDetail() {
  const fakeQR = require('../../assets/images/qr1.png');
  const [qrImage, setQrImage] = useState(fakeQR);

  const handlePressQrInitial = () => {
    setQrImage(fakeQR);
  };

  const handlePressQrOneTime = () => {
    setQrImage(fakeQR);
  };

  // Sample data for FlatList
  const data = [
    { id: '1', image: qrImage, label: 'QR initial'},
    { id: '2', image: qrImage, label: 'QR one time' },
    // Add more items as needed
  ];

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
