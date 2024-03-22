import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    alignItems: 'center',
  },
  item: {
    width: 400,
    height: 400,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrImage: {
    width: '100%',
    flex: 1,
    aspectRatio: 1,
  },
  text: {
    margin: 5,
    fontSize: 32,
    fontWeight: 'bold',
  }
});

export default styles;
