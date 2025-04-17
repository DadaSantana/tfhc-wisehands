import { colors } from "@/styles/colors";
import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerBackVisible: true,
                headerTintColor: colors.black.default,
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: colors.white.default,
                },
                contentStyle: {
                    backgroundColor: colors.white.default,
                },

            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: "Wise Book", headerShown: false, animation: "none" }}
            />
            <Stack.Screen
                name="catalog/index"
                options={{
                    title: "Wise Book",
                    headerShown: false,
                    // headerBackImageSource: require("@/assets/back.svg"),
                    headerBackTitle: "",
                    headerBackVisible: true,
                    animation: "slide_from_right",
                    // headerStyle: {
                    //     backgroundColor: colors.white.default,
                    // },
                }}
            />
            <Stack.Screen
                name="book"
                options={{
                    title: "Informações",
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="rentbook/index"
                options={{
                    title: "Rent Book",
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="rentbook/reviewbookinfo/[id]"
                options={{
                    title: "Rent Book",
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="rentbook/confirmation"
                options={{
                    title: "Confirmation",
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="returnbook/index"
                options={{
                    title: "Wise Book",
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="returnbook/proofofreturn"
                options={{
                    title: "Wise Book",
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="returnbook/confirmationreturn"
                options={{
                    title: "Wise Book",
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="history/index"
                options={{
                    title: "Wise Book",
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="history/bookinfo"
                options={{
                    title: "Wise Book",
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
        </Stack>
    )
}