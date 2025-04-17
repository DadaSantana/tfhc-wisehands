import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.green.light,
        paddingBottom: 39,
        flex: 1,
        width: '100%',
    },
    wrapper: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
        zIndex: 100,
    },
    spinningContainer: {
        paddingTop: 60,
        paddingBottom: 20,
        alignItems: 'center',
    },
    card: {
        justifyContent: 'space-between',
        backgroundColor: colors["yellow-light"],
        padding: 19,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: colors.white.default,
        height: 201,
        width: '100%',
        flex: 1,
        zIndex: 100,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    username: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: colors.black.default,
    },
    image: {
        width: '100%',
        height: 270,
        position: 'absolute',
        bottom: 100,
        zIndex: 0,
    },
    imageStyle: {
        resizeMode: 'cover',
        height: 270,
        alignSelf: "flex-end"
    }
});