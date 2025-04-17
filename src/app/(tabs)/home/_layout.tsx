import { colors } from "@/styles/colors";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function Layout() {
    return (
        <View style={{ flex: 1, backgroundColor: colors.green.light }}>
            <Stack
                screenOptions={{
                    // headerShown: false,
                    headerStyle: { backgroundColor: colors.green.light },
                    headerTintColor: colors.white.default,
                    contentStyle: { backgroundColor: colors.green.light },
                    headerBackVisible: false,
                    animation: "none",
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{ title: "Home", headerShown: false }}
                />
                <Stack.Screen
                    name="profile"
                    options={{
                        title: "Menu",
                        headerShown: true,
                        headerBackVisible: true,
                        animation: "slide_from_right",
                    }}
                />
            </Stack>
        </View>
    )
}