import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        backgroundColor: colors.yellow,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 58,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.black.dk1,
    }
});