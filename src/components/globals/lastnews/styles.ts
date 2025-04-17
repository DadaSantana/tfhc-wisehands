import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        // flex: 1,
        gap: 10,
        // height: 265
    },
    carousel: {
        // width: '100%',
    },
    imageContainer: {
        // flex: 1,
        width: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // paddingRight: 10,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.black.default,
    },
    image: {
        // flex: 1
        width: '100%',
        height: '100%',
        // aspectRatio: 1.8,
    }
});