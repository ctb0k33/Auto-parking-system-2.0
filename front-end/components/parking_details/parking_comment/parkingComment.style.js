import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    margin: 12,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  horizontalView: {
    marginHorizontal: 12,
  },
  comment: {
    display: "flex",
    flexDirection: "column",
    width: width * 0.8,
    height: 120,
    padding: 12,
    backgroundColor: "#b8e0e6",
    borderRadius: 10,
    marginRight: 8,
    justifyContent: "space-between",
  },
  starIcon: {
    width: 20,
    height: 20,
    transform: [{ translateY: -1 }],
  },
  blur: {
    color: "#99a2a3",
    fontStyle: "italic",
  },
});
