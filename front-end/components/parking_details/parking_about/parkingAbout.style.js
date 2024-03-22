import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 12,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 10,
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.59,
    elevation: 5,
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  likeIcon: {
    width: 20,
    height: 20,
  },
  service: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
});
