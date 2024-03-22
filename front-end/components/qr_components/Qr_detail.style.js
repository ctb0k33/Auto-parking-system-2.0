import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 50, // Adjust as needed
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      paddingVertical: 10,
    },
    optionBox: {
      borderWidth: 1,
      borderColor: '#000', // Change as per your design
      borderRadius: 5, // Optional for rounded corners
      padding: 10,
    },
    optionText: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    qrCodeContainer: {
      marginTop: 20,
      width: 264,
      height: 437,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white', // Placeholder color for the border
      borderWidth: 1,
    },
    qrImage: {
      width: '100%',
      height: '100%',
    },
    // ...other styles
  });