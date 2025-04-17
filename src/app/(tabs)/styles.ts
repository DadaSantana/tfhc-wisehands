import { StyleSheet } from "react-native";
// import styled from "styled-components/native";
import { colors, fontFamily } from "@/styles/theme";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: colors.green.light,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 58,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 20,
        color: colors.white.white1,
    },
    activePageText: {
        fontSize: 14,
        fontFamily: fontFamily.inter500,
        fontWeight: '500',
        textAlign: 'center',
        color: colors.white.white1,
    },
    iconHome: {
        width: 20.98,
        height: 20.528,
        color: colors.yellow,
    },
    iconTicketeria: {
        width: 21.5,
        height: 17.5,
        color: colors.yellow,
    },
    iconBooks: {
        width: 18,
        height: 20,
        color: colors.yellow,
    },
    iconAcademy: {
        width: 19.95,
        height: 19.95,
        color: colors.yellow,
    },
});