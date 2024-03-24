import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import asyncStorage from "@react-native-async-storage/async-storage";

import AddEditParking from "./screens/AddEditParking";
import ParkingDetail from "./screens/parking_detail/ParkingDetail";
import ConnectWallet from "./screens/connect_wallet/ConnectWallet";
import ParkingList from "./screens/ParkingList";
import AllParking from "./screens/user_parking/AllParking";
import Qr from "./screens/qr/Qr";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Create a stack navigator for parking screens
function ParkingStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllParking"
        component={AllParking}
        options={{ title: "Parking List" }}
      />
      <Stack.Screen name="ParkingDetail" component={ParkingDetail} options={{ headerShown: false }}/>
      {/* Add other Stack.Screen components as needed */}
    </Stack.Navigator>
  );
}

export default function App() {
  const [customInitialRouteName, setCustomInitialRouteName] = useState("");

  useEffect(() => {
    const getStorage = async () => {
      const privateQr = await asyncStorage.getItem("Private QR");
      setCustomInitialRouteName(privateQr ? "QR" : "Connect Wallet");
    };
    getStorage();
  }, []);

  return (
    customInitialRouteName !== "" && (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Connect Wallet">
          <Drawer.Screen name="Connect Wallet" component={ConnectWallet} />
          <Drawer.Screen name="My Parking" component={ParkingList} />
          <Stack.Screen
            name="AllParking"
            component={AllParking}
            options={{ title: "Parking List" }}
          />
          {/* Nest the Stack Navigator inside the Drawer */}
          <Drawer.Screen name="ParkingDetail" component={ParkingDetail} options={{ drawerItemStyle: { height: 0 } }} />
          <Drawer.Screen name="AddEditParking" component={AddEditParking} options ={{drawerItemStyle:{height:0}}} />
          <Drawer.Screen name="ParkingList" component={ParkingList} options ={{drawerItemStyle:{height:0}}} />
          <Drawer.Screen name="QR" component={Qr} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  );
}
