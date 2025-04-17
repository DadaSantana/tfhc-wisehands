import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 10,
        backgroundColor: colors.green.light,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        paddingBottom: 39
    },
    wrapper: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
    },
    profileContainer: {
        backgroundColor: colors.green.dark,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingRight: 21,
        gap: 15,
        marginBottom: 69
    },
    avatar: {
        width: 41,
        height: 41,
        borderRadius: 40,
    },
    profileInfo: {
        flex: 1
    },
    name: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        color: colors.white.white1,
        fontWeight: 'bold',
    },
    profile: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: colors.yellow,
        lineHeight: 26
    },
    scrollView: {
        zIndex: 100,
    },
    scrollViewContentStyle: {
        gap: 40
    },
    scrollViewItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 11
    },
    scrollViewItemText: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.white.white1,
    },
    icon: {
        width: 36,
        // height: 36,
        // color: colors.yellow,
        marginRight: -9
    },
    title: {
        fontFamily: fontFamily.inter,
        fontSize: 15,
        color: colors.white.white1,
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        // position: 'absolute',
        // bottom: 100,
        // left: 0,
        // right: 0,
        // zIndex: 1,
        flex: 1
    },
    imageStyle: {
        resizeMode: 'stretch',
        // height: 270,
        // alignSelf: "flex-end"
        backgroundPosition: "bottom",
        left: -1,
        height: '10%',
    }
});