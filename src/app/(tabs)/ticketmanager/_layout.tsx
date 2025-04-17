import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: "Ticketeria", headerShown: false, animation: "none" }}
            />
            <Stack.Screen
                name="ticketpayment"
                options={{ title: "Payment" }}
            />
            <Stack.Screen
                name="eventdetail"
                options={{ title: "Event Detail" }}
            />
            <Stack.Screen
                name="mytickets"
                options={{ title: "Meus Tickets" }}
            />
            <Stack.Screen
                name="ticket"
            />
        </Stack>
    )
}