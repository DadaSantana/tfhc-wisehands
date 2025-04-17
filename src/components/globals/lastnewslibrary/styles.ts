import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        gap: 10,
    },
    carousel: {
        borderRadius: 18,
    },
    imageContainer: {
        width: '100%',
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.black.default,
    },
    image: {
        width: '100%',
        height: '100%',
    }
});