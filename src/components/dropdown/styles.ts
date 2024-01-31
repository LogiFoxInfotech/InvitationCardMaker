import { Dimensions, StyleSheet } from "react-native";
import { COLOR } from "../../common/color";

const { width, height } = Dimensions.get('window');

export const style = (RESPONSIVE_HEIGHT, RESPONSIVE_WIDTH) => StyleSheet.create({
    mainView: {
        height: 40,
        borderWidth: 1,
        borderColor: COLOR.grey,
        borderRadius: 5,
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    title: {
        fontSize: 12,
        lineHeight: 15,
        fontWeight: '700',
        color: COLOR.grey,
    },
    selectedText: {
        fontSize: 15,
        lineHeight: 16,
        fontWeight: '700',
        color: COLOR.black,
    },
    listMainView: {
        flex: 1,
        justifyContent: 'flex-end', 
    },
    listView: {
        // height: width * .5,
        maxHeight: width * .5,
        width: '100%',
        backgroundColor: COLOR.white,
        justifyContent: 'flex-end',
        alignSelf: 'center'
        // backgroundColor: 'orange',

        // height: RESPONSIVE_WIDTH(1)
    },
    renderItemView: {
        height: 30,
        margin: 10,
        backgroundColor: COLOR.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    renderItemText: {
        fontSize: 20,
        fontWeight: '700'
    }
})