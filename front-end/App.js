
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ParkingDetail from "./screens/parking_detail/ParkingDetail";
import ConnectWallet from "./screens/connect_wallet/ConnectWallet";
import ParkingList from "./screens/ParkingList";
import AddEditParking from "./screens/AddEditParking";
import Qr from "./screens/qr/Qr";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ConnectWallet">
        <Stack.Screen name="ConnectWallet" component={ConnectWallet} />
        <Stack.Screen name="ParkingDetail" component={ParkingDetail} />
        <Stack.Screen name="ParkingList" component={ParkingList} />
        <Stack.Screen name="AddEditParking" component={AddEditParking} />
        <Stack.Screen name="Qr" component={Qr} />
      </Stack.Navigator>
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
