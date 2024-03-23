import { useState } from "react";
import { View, Text, Button, Pressable, TextInput } from "react-native";
import { Modal } from "../../common/Modal";
import { styles } from "./parkingRegister.style";
import { useNavigation } from "@react-navigation/native";

// function onPressLearnMore() {
//   Alert.alert(
//     "Are you sure to register this parking?",
//     "By doing that, you will sign a contract with the parking owner.",
//     [
//       {
//         text: "Cancel",
//         onPress: () => console.log("Button Huỷ bỏ đã được nhấn"),
//         style: "cancel",
//       },
//       {
//         text: "Agree",
//         onPress: () => console.log("Button Đồng ý đã được nhấn"),
//       },
//     ],
//     { cancelable: false }
//   );
// }

export default function ParkingRegister({ contractId }) {
  const [modalState, setModalState] = useState(false);
  const [fund, setFund] = useState(0);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.contract}>Parking Register</Text>
      <View>
        <Text style={styles.contract}>Contract ID: </Text>
        <Text>{contractId}</Text>
      </View>
      <Button
        onPress={() => {
          navigation.navigate("QR");
        }}
        title="Register"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />
      <Modal isOpen={modalState}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Register</Text>
          <Text style={{ fontWeight: "bold" }}>
            Contract Id:{" "}
            <Text style={{ fontWeight: "normal" }}>{contractId}</Text>
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.addFund}>Add fund:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setFund}
              value={fund}
              keyboardType="numeric"
            />
            <Text style={styles.unit}>SOL</Text>
          </View>
          <View style={styles.btnContainer}>
            <Pressable
              onPress={() => {
                setFund(0);
                setModalState(false);
              }}
              style={styles.closeBtn}
            >
              <Text style={styles.closeBtnText}>Close</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalState(false)}
              style={styles.confirmBtn}
            >
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
