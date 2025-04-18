import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black.default,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
    profileContainer: {
        backgroundColor: colors.gray[900],
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 40,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontFamily: fontFamily.montserratBold,
        fontSize: 18,
        color: colors.white.default,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    profileText: {
        fontFamily: fontFamily.inter,
        fontSize: 14,
        color: colors.gray[400],
    },
    presenceSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 60,
    },
    presenceButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    presenceIcon: {
        marginRight: 10,
    },
    presenceText: {
        fontFamily: fontFamily.montserratBold,
        fontSize: 18,
        color: colors.white.default,
        fontWeight: 'bold',
    },
    footerContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    socialIconsContainer: {
        flexDirection: 'row',
        gap: 24,
        marginBottom: 16,
    },
    socialIcon: {
    },
    copyrightText: {
        fontFamily: fontFamily.inter,
        fontSize: 12,
        color: colors.gray[500],
        textAlign: 'center',
    },
});