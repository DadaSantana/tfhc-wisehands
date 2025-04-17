import React from "react";
import { colors } from "@/styles/colors";
import { ImageBackground } from "expo-image";
import { Stack } from "expo-router";

import { s } from './styles';
import { View } from "react-native";


export default function Layout() {
    return (
        <Stack
            screenOptions={{
                // title: "Menu",
                // headerShown: true,
                // headerBackVisible: true,
                // animation: "slide_from_right",
                // headerStyle: {
                //     backgroundColor: colors.green.light,
                // },
                // headerShadowVisible: false,
                // headerTitleStyle: {
                //     color: colors.white.default,
                // },
                animation: "none"
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: "Menu", headerShown: false, animation: "none" }}
            />
            <Stack.Screen
                name="myprofile"
                options={{ title: "Meu Perfil", headerShown: false, animation: "none" }}
            />
        </Stack>
    )
}