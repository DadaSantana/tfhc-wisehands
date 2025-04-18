import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingVertical: 40,
        backgroundColor: colors.white.default,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logo: {
        width: 40,
        height: 40,
        backgroundColor: '#010101',
        borderRadius: 999,
    },
    logoText: {
        fontSize: 18,
        fontFamily: fontFamily.montserratBold,
        color: colors.black.default,
        fontWeight: 'bold',
    },
    containerIcons: {
        flexDirection: 'row',
        gap: 10,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconImage: {
        width: 20,
        height: 20,
    },
});