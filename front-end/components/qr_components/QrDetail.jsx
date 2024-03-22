import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from "react-native";
import { styles } from "./Qr_detail.style";




export default function QrDetail() {
  const fakeQR = require('../../assets/images/qr1.png');
  const [qrImage, setQrImage] = useState(fakeQR); 

  const handlePressQrInitial = () => {
    setQrImage(fakeQR);
  };

  const handlePressQrOneTime = () => {
    setQrImage(fakeQR); 
  };

  return (
    <View style={styles.container}>
    <View style={styles.topBar}>
      <TouchableOpacity onPress={handlePressQrInitial} style={styles.optionBox}>
        <Text style={styles.optionText}>qr initial</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressQrOneTime} style={styles.optionBox}>
        <Text style={styles.optionText}>qr one time</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.qrCodeContainer}>
      <Image
        source={qrImage}
        style={styles.qrImage}
        resizeMode="contain" 
        />
      </View>
    </View>
  );
}
