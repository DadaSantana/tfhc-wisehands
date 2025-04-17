import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.white.default,
        paddingHorizontal: 16,
        flex: 1,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.black.dk1,
    },
    lastNewsWrapper: {
        paddingTop: 38,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingTop: 16,
        gap: 20,
    }
});