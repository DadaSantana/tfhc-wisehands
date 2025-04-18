import { Stack, useLocalSearchParams } from "expo-router"
import { colors } from "@/styles/colors"

// Define props type (can be more specific if needed)
interface AcademyLayoutProps {
    // Add specific props if they exist
}

export default function AcademyLayout(props: AcademyLayoutProps) {
    const params = useLocalSearchParams();
    let infoObj = { name: "" };

    try {
        // Safely attempt to parse the info parameter if it exists and is a string
        if (params.info && typeof params.info === "string") {
            infoObj = JSON.parse(params.info);
        }
    } catch (error) {
        console.error("Error parsing info param in AcademyLayout:", error);
        // Keep default infoObj on error
    }

    const headerTitle = infoObj?.name || "Academy";

    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: colors.black.default },
            headerTintColor: colors.white.default,
            contentStyle: { backgroundColor: colors.black.default },
            headerBackVisible: true,
            animation: "slide_from_right",
        }} >
            <Stack.Screen
                name="index"
                options={{ title: "Academy", headerShown: false }}
            />
            <Stack.Screen
                name="modulos"
                options={{ title: headerTitle }}
            />
            <Stack.Screen
                name="aulas"
                options={{ title: headerTitle }}
            />
            <Stack.Screen
                name="pdf"
                options={{ title: headerTitle }}
            />
            {/* Payment screen removed for now
            <Stack.Screen
                name="payment"
                options={{
                    title: "Payment",
                }}
            /> */}
        </Stack>
    )
}