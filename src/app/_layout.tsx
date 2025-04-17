import { Provider } from "@/context/auth";
import { Stack } from "expo-router";
import { colors } from "@/styles/theme"

import {
    useFonts as useFontsManrope,
    Manrope_600SemiBold,
} from "@expo-google-fonts/manrope"

import {
    useFonts as useFontsInter,
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
} from "@expo-google-fonts/inter"
import Loading from "@/components/loading";

export default function Layout() {
    const [fontsManropeLoaded] = useFontsManrope({
        Manrope_600SemiBold,
    });

    const [fontsInterLoaded] = useFontsInter({
        Inter_300Light,
        Inter_500Medium,
        Inter_700Bold,
    });

    if (!fontsManropeLoaded || !fontsInterLoaded) {
        return <Loading />;
    }

    return (
        <Provider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    headerTintColor: 'gray',
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{ title: "Home", headerShown: false }}
                />
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        title: "Home",
                    }}
                />
                <Stack.Screen
                    name="profile"
                    options={{
                        title: "Menu",
                        headerShown: false,
                        headerBackVisible: false,
                        animation: "slide_from_right",
                        // headerStyle: {
                        //     backgroundColor: colors.green.light,
                        // },
                        // headerShadowVisible: false,
                        // headerTitleStyle: {
                        //     color: colors.white.default,
                        // },
                    }}
                />
                <Stack.Screen
                    name="nfc/index"
                    options={{
                        title: "Desbloquear",
                        headerShown: true,
                        headerBackVisible: true,
                        animation: "slide_from_right",
                    }}
                />
                <Stack.Screen
                    name="tv/index"
                    options={{
                        title: "TV",
                        headerShown: false,
                        headerBackVisible: false,
                        animation: "slide_from_right",
                    }}
                />
            </Stack>
        </Provider>
    )
}