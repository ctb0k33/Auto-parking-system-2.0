import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.DARK_GREY,
      flexGrow: 1,
      position: "relative",
    },
    greenDot: {
      height: 8,
      width: 8,
      borderRadius: 10,
      marginRight: 5,
      backgroundColor: COLORS.GREEN,
    },
    header: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    spinner: {
      position: "absolute",
      alignSelf: "center",
      top: "50%",
      zIndex: 1000,
    },
    text: {
      color: COLORS.LIGHT_GREY,
      width: "100%",
    },
    wallet: {
      alignItems: "center",
      margin: 10,
      marginBottom: 15,
    },
  });