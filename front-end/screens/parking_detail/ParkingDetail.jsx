import { View, ScrollView } from "react-native";
import { useState } from "react";
import { styles } from "./parkingDetails.style";
import { commentList } from "../../data/comment";
import { parkingList } from "../../data/parkingList";
import ParkingAbout from "../../components/parking_details/parking_about/ParkingAbout";
import ParkingDetailImage from "../../components/parking_details/parking_detail_image/ParkingDetailImage";
import ParkingInformation from "../../components/parking_details/parking_information/ParkingInformation";
import ParkingComment from "../../components/parking_details/parking_comment/ParkingComment";
import ParkingRegister from "../../components/parking_details/parking_register/ParkingRegister";
import { useEffect } from "react";
import axiosInstance from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ParkingDetail() {
  const fakeData = parkingList[0];
  const [item, setItem] = useState(null);
  const QRImage = async() =>{
    const qrImage = await AsyncStorage.getItem("Private QR: ");
    setItem(qrImage);
  }
  useEffect(() => {
    QRImage()
  }, [item]);
  return (
    // <SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
        <ParkingDetailImage name={fakeData.name} />
        <ParkingInformation
          rating={4.5}
          address={fakeData.address}
          commentNum={336}
          openTime={fakeData.openTime}
        />
        <ParkingAbout
          ownerName={fakeData.ownerName}
          publicKey={fakeData.ownerPublicKey}
          fare={fakeData.fare}
          maximumCapacity={fakeData.maximumCapacity}
          service={fakeData.service}
        />
        <ParkingComment comments={commentList} />
        <ParkingRegister contractId="6yiDKPDbqWLGAEBkDvVg6UNrKsLsPVkLbA1TJo4KCdzP" />
      </View>
    </ScrollView>
    // </SafeAreaView>
  );
}
