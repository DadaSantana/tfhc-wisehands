import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 10,
        backgroundColor: colors.green.light,
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 10,
        height: 58,
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
    },
    header: {
        marginTop: 57,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    headerTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.white.white1,
    },
    scrollView: {
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 40,
    },
    scrollViewContentStyle: {
        gap: 24,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: colors.green.dark,
        padding: 12,
        paddingRight: 15,
        borderRadius: 18,
        width: '100%',
        alignItems: 'center',
        gap: 15
    },
    buttonIcon: {
        borderRadius: 200,
        backgroundColor: colors.yellow,
        padding: 8.5
    },
    buttonTextContainer: {
        flex: 1,
    },
    buttonTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: colors.white.white1,
    },
    buttonSubTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 13,
        color: colors.gray[400],
        lineHeight: 24
    },
    copyrightWrapper: {
        marginBottom: 39
    }
});