import { StyleSheet } from "react-native";
import { COLOR } from "../../common/color";
import { SCREEN_HEIGHT, SCREEN_WIDTH, isWeb, moderateScale } from "../../utils";
import { Font } from "../../assets/fonts/Font";
import {useWindow} from "../../common/minix";

export const style = (RESPONSIVE_WIDTH, RESPONSIVE_HEIGHT) => StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLOR.infinity,
  },
  backgroundImage: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  sliderView: { 
    backgroundColor: COLOR.white, 
    height: moderateScale(50),
    borderRadius: RESPONSIVE_WIDTH(.0095),
    zIndex: 99,
    justifyContent: 'center',
  },
  mainBox: {
    flex: 1,
  },
  background: {
    height: RESPONSIVE_HEIGHT(1) - moderateScale(40),
    justifyContent: "flex-end",
  },
  bottomView: {
    position: 'absolute',
    bottom: RESPONSIVE_HEIGHT(.02),
    backgroundColor: COLOR.white,
  },
  box: {
    flex: 0.4,
    marginHorizontal: moderateScale(20),
    justifyContent: "center",
  },
  tempBox: {
    flex: 0.21,
    justifyContent: "space-around",
    backgroundColor: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    // padding: RESPONSIVE_WIDTH(.3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: "70%",
    borderWidth: 1,
    borderColor: "#EDEDED",
    alignItems: "flex-end",
    maxHeight: RESPONSIVE_HEIGHT(.7),
    overflow: 'hidden',
    alignSelf: 'center',
    padding: 10
  },
  modelMainView: {
    
  },
  button: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#EDEDED",
    paddingHorizontal: 40,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    alignSelf: "flex-end",
  },
  textStyle: {
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: moderateScale(16),
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EDEDED",
  },
  bottomBox: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    zIndex: 9999,
    width: RESPONSIVE_WIDTH(1),
    // height: moderateScale(39),
    backgroundColor: COLOR.white,
    // opacity: .5
  },
  fontBox: {
    backgroundColor: COLOR.white,
    height: RESPONSIVE_HEIGHT(.06),
    ...(isWeb && {width: RESPONSIVE_WIDTH(1)}),
    flexDirection: "row",
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: RESPONSIVE_HEIGHT(.01),
    paddingHorizontal: moderateScale(10),
    paddingVertical: RESPONSIVE_HEIGHT(.005)
    // position: 'absolute'
  },
  fontSizeItemText: {
    textAlign: "center",
    fontSize: moderateScale(16),
  },
  dropDownStyle: {
    borderWidth: 1,
    borderColor: COLOR.grey,
    backgroundColor: "white",
    padding: moderateScale(4),
    borderRadius: moderateScale(3),
    paddingHorizontal: moderateScale(15),
    marginRight: moderateScale(5),
  },
  dropDownText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLOR.grey
  },
  dropDownTextValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLOR.black
  },
  item: {
    padding: 10,
    textAlign: "center",
    fontSize: moderateScale(14),
  },
  selectedText: {
    textAlign: "center",
    flex: 1,
    alignContent: "center",
    fontSize: moderateScale(20),
    lineHeight: moderateScale(20),
    height: moderateScale(20),
    color: "#000000",
    fontFamily: `${Font.DancingScript}-Regular`,
  },
  fd_row: {
    flexDirection: "row",
    padding: 6,
  },
  fontButton: {
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    backgroundColor: "#FFFFFF",
  },
  fontButtontext: {
    fontSize: RESPONSIVE_WIDTH(.035) > moderateScale(20) ? moderateScale(15) : RESPONSIVE_WIDTH(.035) ,
    marginHorizontal: RESPONSIVE_WIDTH(.9),
    fontWeight: "900",
    color: "#000000",
  },
  optionButton: {
    height: RESPONSIVE_WIDTH(.34) > 40 ? 40 : RESPONSIVE_WIDTH(.034),
    maxHeight: 60,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerStyle: {
    height: RESPONSIVE_WIDTH(.04),
    width: RESPONSIVE_WIDTH(.09),
    minHeight: 30,
    minWidth: 50,
    maxHeight: 60,
    maxWidth: 100,
    borderWidth: 1,
    borderColor: COLOR.grey,
    // backgroundColor: COLOR.electricBlue,
    borderRadius: moderateScale(3),
    fontSize: RESPONSIVE_WIDTH(.015) >= 15 ? RESPONSIVE_WIDTH(.015) : 15,
    fontWeight: '700',
    color: COLOR.infinity,
    // marginBottom: moderateScale(10),
    marginRight: moderateScale(5)
  }
});
