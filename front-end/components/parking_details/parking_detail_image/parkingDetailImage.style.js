import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    // height: 250,
  },
  mainImage: {
    width: width,
    height: 250,
    resizeMode: "stretch",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignSelf: "flex-start",
  },
  parkingName: {
    height: "auto",
    color: "white",
    fontSize: 24,
    position: "absolute",
    bottom: 15,
    left: 15,
    fontWeight: "bold",
  },
});
