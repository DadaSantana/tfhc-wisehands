import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        gap: 7,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.black.default,
    },
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10
    },
    card: {
        backgroundColor: colors.green.light,
        paddingVertical: 12,
        borderRadius: 16,
        width: '48%'
    },
    functionalityContainer: {
        gap: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    functionalityText: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: colors.white.default,
        maxWidth: 120,
        textAlign: 'center'
    }
});