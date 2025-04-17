import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flex: 1,
        gap: 11
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.black.default,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        flex: 1,
        backgroundColor: colors.yellow,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        borderRadius: 10,
        height: 58,
    },
    buttonTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: colors.green.light,
    }
});