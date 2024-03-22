import { StyleSheet } from "react-native";
import {Dimensions} from "react-native";
const height = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor:"#a6dde3",
        height: height,
    },
})