import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: colors.white.default,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 58,
        flex: 1
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.black.dk1,
    }
});