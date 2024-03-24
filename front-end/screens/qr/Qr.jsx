import QrDetail from "../../components/qr_components/QrDetail";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";

export default function Qr() {
  const [isWithdrawalModalVisible, setIsWithdrawalModalVisible] =
    useState(false);
  const [isFundModalVisible, setIsFundModalVisible] = useState(false);
  const [type, setType] = useState("");

  const handleSubmit = (actionType) => {
    // Handle the submit action here. `actionType` could be 'withdrawal' or 'fund'
    console.log(`Submit ${actionType}:`, type);

    // Close the modal
    setIsWithdrawalModalVisible(false);
    setIsFundModalVisible(false);

    // Optionally reset the type input
    setType("");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <QrDetail />
        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsWithdrawalModalVisible(true)}
          >
            <Text style={styles.buttonText}>Withdraw</Text>
          </TouchableOpacity>

          {/* Fund Button */}
          <TouchableOpacity
            style={styles.deposit}
            onPress={() => setIsFundModalVisible(true)}
          >
            <Text style={styles.buttonText}>Deposit</Text>
          </TouchableOpacity>
        </View>
        {/* Withdrawal Button */}

        {/* Withdrawal Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isWithdrawalModalVisible}
          onRequestClose={() => setIsWithdrawalModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Total: </Text>
                <TextInput
                  style={styles.input}
                  value={type}
                  onChangeText={setType}
                  keyboardType="numeric"
                />
                <Text style={{ position: "absolute", bottom: 5, right: 10 }}>
                  SOL
                </Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",gap:20}}>
                <Button
                  title="Submit"
                  style={styles.submitBtn}
                  onPress={() => handleSubmit("withdrawal")}
                />
                <Button
                  title="Close"
                  style={styles.closeBtn}
                  onPress={() => setIsWithdrawalModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* Fund Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFundModalVisible}
          onRequestClose={() => setIsFundModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.input}
                placeholder="Type"
                value={type}
                onChangeText={setType}
                keyboardType="numeric"
              />
              <Button
                title="Submit"
                style={styles.button}
                onPress={() => handleSubmit("fund")}
              />
              <Button
                title="Close"
                style={styles.button}
                onPress={() => setIsFundModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F2F5", // Light background color for contrast
  },
  button: {
    backgroundColor: "#0056b3", // Slightly darker blue for more contrast
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30, // More pronounced rounded corners for a pill-like shape
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12, // More pronounced shadow for a floating effect
    margin: 12,
    width: 150,
    marginVertical: 10, // Add vertical margin for better spacing
  },
  deposit: {
    backgroundColor: "green", // Slightly darker blue for more contrast
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30, // More pronounced rounded corners for a pill-like shape
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12, // More pronounced shadow for a floating effect
    margin: 12,
    width: 150,
    marginVertical: 10, // Add
  },
  buttonText: {
    color: "white",
    fontSize: 18, // Slightly larger text for readability
    fontWeight: "600", // Medium font weight for emphasis
    textAlign: "center", // Ensure text is centered
  },
  modalView: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: 250,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: adds a semi-transparent overlay
  },
  input: {
    borderWidth: 0, // Removing border
    borderBottomWidth: 2, // Adding a bottom border for a minimalist design
    borderBottomColor: "#0056b3", // Bottom border color to match button
    flex: 1,
    fontSize: 16, // Larger font size for better readability
    color: "#333", // Darker font color for contrast
    borderRadius: 5, // Slightly rounded corners for the input
    backgroundColor: "#FFF", // Ensure the input background is white for visibility
  },
  submitBtn: {
    backgroundColor: "#0056b3", // Slightly darker blue for more contrast
    padding: 10,
    borderRadius: 5, // Slightly rounded corners for the button
    width: 100, // Set a fixed width for the button
    margin: 5, // Add margin around the button for spacing
  },
  closeBtn: {
    backgroundColor: "red", // Red color for contrast
    padding: 10,
    borderRadius: 5, // Slightly rounded corners for the button
    width: 100, // Set a fixed width for the button
    margin: 5, // Add margin around the button for spacing
  },
});
