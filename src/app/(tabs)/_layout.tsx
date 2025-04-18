import React from "react";
import { router, Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useFonts, Montserrat_700Bold, Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { Inter_400Regular } from '@expo-google-fonts/inter';

import { s } from './styles';
import { Image } from "expo-image";
import { colors } from "@/styles/colors";

export default function Layout() {
    const pathname = usePathname();

    const [fontsLoaded, fontError] = useFonts({
        Montserrat_700Bold,
        Montserrat_500Medium,
        Inter_400Regular,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    if (fontError) {
        console.error("Error loading fonts: ", fontError);
        return <View><Text>Error loading fonts</Text></View>;
    }

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
                            backgroundColor: '#010101',
                            borderTopColor: colors.green.light,
                            borderTopWidth: 16,
                            borderTopRightRadius: 32,
                            borderTopLeftRadius: 32,
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
                                    style={props.style}
                                    onPress={() => router.replace('/home')}
                                >
                                    {props.children}
                                </TouchableOpacity>,
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
                                    <Text style={s.activePageText}>Ofertas</Text>
                                ) : (
                                    <Text style={s.activePageText}>Ofertas</Text>
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
                                    style={props.style}
                                    onPress={() => router.replace('/(donation)')}
                                >
                                    {props.children}
                                </TouchableOpacity>,
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
                                    <Text style={s.activePageText}>Biblioteca</Text>
                                ) : (
                                    <Text style={s.activePageText}>Biblioteca</Text>
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
                                    style={props.style}
                                    onPress={() => router.replace('/academy')}
                                >
                                    {props.children}
                                </TouchableOpacity>,
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
                                    <Text style={s.activePageText}>Agenda</Text>
                                ) : (
                                    <Text style={s.activePageText}>Agenda</Text>
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
                                    style={props.style}
                                    onPress={() => router.replace('/(events)')}
                                >
                                    {props.children}
                                </TouchableOpacity>,
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