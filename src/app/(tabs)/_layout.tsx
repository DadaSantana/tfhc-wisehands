import React from "react";
import { router, Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Text, TouchableOpacity, View } from "react-native";

import { s } from './styles';
import { Image } from "expo-image";
import { colors } from "@/styles/colors";

export default function Layout() {
    const pathname = usePathname(); // Obtém o caminho da rota atual

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: colors.yellow,
                    tabBarStyle: pathname.includes("ticketmanager/ticket")
                        ? { display: "none" }  // 🔥 Esconde a tabBar quando a tela de pagamento estiver ativa
                        : {
                            backgroundColor: colors.green.light,
                            borderTopColor: colors.green.light,
                            borderTopWidth: 16,
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            paddingVertical: 16,
                            height: Platform.OS === 'ios' ? 95 : 68,
                        },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={({ route }) => {
                        return ({
                            tabBarLabel: ({ color, focused }) =>
                                focused ? (
                                    <Text style={s.activePageText}>Home</Text>
                                ) : (
                                    <Text style={s.activePageText}>Home</Text>
                                ),
                            tabBarIcon: ({ color, size, focused }) => (
                                focused ? (
                                    <Image source={require('@/assets/home-icon-focused.svg')} style={s.iconHome} />
                                ) : (
                                    <Image source={require('@/assets/home-icon.svg')} style={s.iconHome} />
                                )
                            ),
                            tabBarButton: (props) =>
                                <TouchableOpacity
                                    {...props}
                                    onPress={() => router.replace('/home')}
                                />,
                        })
                    }}
                />
                <Tabs.Screen
                    name="ticketmanager"
                    // options={{
                    //     href: null
                    // }}
                    options={({ route }) => {
                        return ({
                            tabBarLabel: ({ color, focused }) =>
                                focused ? (
                                    <Text style={s.activePageText}>Ticketeria</Text>
                                ) : (
                                    <Text style={s.activePageText}>Ticketeria</Text>
                                ),
                            tabBarIcon: ({ color, focused }) => (
                                focused ? (
                                    <Image source={require('@/assets/ticketeria-icon-focused.svg')} style={s.iconTicketeria} />
                                ) : (
                                    <Image source={require('@/assets/ticketeria-icon.svg')} style={s.iconTicketeria} />
                                )
                            ),
                            tabBarButton: (props) =>
                                <TouchableOpacity
                                    {...props}
                                    onPress={() => router.replace('/ticketmanager')}
                                />
                        })
                    }}
                />
                <Tabs.Screen
                    name="books"
                    options={({ route }) => {
                        console.log("route->:", route)
                        return ({
                            // headerBackground: () => (
                            //     <View style={{ backgroundColor: colors.green.light, height: 56 }} />
                            // ),
                            tabBarLabel: ({ color, focused }) =>
                                focused ? (
                                    <Text style={s.activePageText}>Books</Text>
                                ) : (
                                    <Text style={s.activePageText}>Books</Text>
                                ),
                            tabBarIcon: ({ color, size, focused }) => (
                                focused ? (
                                    <Image source={require('@/assets/books-icon-focused.svg')} style={s.iconBooks} />
                                ) : (
                                    <Image source={require('@/assets/books-icon.svg')} style={s.iconBooks} />
                                )
                            ),
                            tabBarButton: (props) =>
                                <TouchableOpacity
                                    {...props}
                                    onPress={() => router.replace('/books')}
                                />,
                            tabBarStyle: {
                                // borderTopWidth: 16,
                                paddingTop: 16,
                                borderTopRightRadius: 0,
                                borderTopLeftRadius: 0,
                                backgroundColor: colors.green.light,
                                borderTopColor: colors.green.dark,
                                paddingVertical: 16,
                                height: Platform.OS === 'ios' ? 95 : 68,
                            },
                            tabBarLabelStyle: { paddingVertical: 0 },
                        })
                    }}
                />
                <Tabs.Screen
                    name="academy"
                    options={({ route }) => {
                        return ({
                            tabBarLabel: ({ color, focused }) =>
                                focused ? (
                                    <Text style={s.activePageText}>Academy</Text>
                                ) : (
                                    <Text style={s.activePageText}>Academy</Text>
                                ),
                            tabBarIcon: ({ color, size, focused }) => (
                                focused ? (
                                    <Image source={require('@/assets/academy-icon-focused.svg')} style={s.iconAcademy} />
                                ) : (
                                    <Image source={require('@/assets/academy-icon.svg')} style={s.iconAcademy} />
                                )
                            ),
                            tabBarButton: (props) =>
                                <TouchableOpacity
                                    {...props}
                                    onPress={() => router.replace('/academy')}
                                />
                        })
                    }}
                />
                <Tabs.Screen
                    name="styles"
                    options={{
                        href: null
                    }}
                />
            </Tabs>
        </View>
    )
}