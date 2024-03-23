
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ParkingDetail from "./screens/parking_detail/ParkingDetail";
import ConnectWallet from "./screens/connect_wallet/ConnectWallet";
import ParkingList from "./screens/ParkingList";
import AddEditParking from "./screens/AddEditParking";
import Qr from "./screens/qr/Qr";
import asyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [customInitialRouteName, setCustomInitialRouteName] = useState("")
  useEffect(()=>{
    const getStorage = async()=>{
      const privateQr = await asyncStorage.getItem("Private QR");
      if(privateQr){
        setCustomInitialRouteName("QR")
      }
      else{
        setCustomInitialRouteName("Connect Wallet")
      }
      console.log(privateQr)
    }
    getStorage();
  },[])
  return (
    customInitialRouteName!="" && <NavigationContainer>
      <Drawer.Navigator initialRouteName={customInitialRouteName}>
      <Drawer.Screen name="Parking Detail" component={ParkingDetail} />
        <Drawer.Screen name="Connect Wallet" component={ConnectWallet} />
        <Drawer.Screen name="Parking List" component={ParkingList} />
        <Drawer.Screen name="AddEdit Parking" component={AddEditParking} />
        <Drawer.Screen name="QR" component={Qr} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//     <SafeAreaView>
//       <Qr />
//     </SafeAreaView>

//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
