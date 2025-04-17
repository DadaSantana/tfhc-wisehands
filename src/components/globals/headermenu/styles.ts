import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        width: 49,
        height: 37,
    },
    containerIcons: {
        flexDirection: 'row',
        gap: 15
    },
    iconContainer: {
        padding: 8,
        borderRadius: 10,
        backgroundColor: colors.green.light,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.black.dk1,
    }
});