import { StyleSheet,Dimensions } from "react-native";

const width = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    padding: 12,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    gap: 5,
    shadowOpacity: 0.18,
  },
  contract: {
    fontWeight: "bold",
  },
  modal:{
    display:"flex",
    flexDirection:"column",
    gap:4,
    backgroundColor: "white",
    width:width*0.9,
    padding:8,
    borderRadius:10,
  },
  textInput: {
    height: 30,
    marginBottom: 12,
    borderWidth: 1,
    padding: 5,
    flex:1,
    marginEnd:10,
    marginLeft:5,
    borderTopWidth: 0, 
    borderLeftWidth: 0, 
    borderRightWidth: 0, 
  },
  unit:{
    position:"absolute",
    right:16,
    bottom:18,
  },
  modalTitle:{
    alignSelf:"center",
    color:"black",
    fontSize:16,
    fontWeight:"bold",
  },
  addFund:{
    fontWeight:"bold",
    transform: [{ translateY: -4 }],
  },
  btnContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-evenly",
  },
  closeBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    width: 130,
  },
  confirmBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    width: 130,
  },
  closeBtnText:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  confirmBtnText:{
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  }
});
