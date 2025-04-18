import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: colors.gray[300],
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 50,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: colors.black.default,
    }
});