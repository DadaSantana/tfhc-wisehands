import { SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";

import { s } from './styles';
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { HeaderMenuBack } from "@/components/globals/headermenuback";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { Image } from "expo-image";
import SearchIcon from "@/assets/search-icon.svg";
import { spacing } from "@/styles/spacing";
import { ScrollViewButton } from "@/components/ticketmanager/scrollviewbutton";
import TicketCard from "@/components/ticketmanager/ticketcard";
import { ticketServer } from "@/server/ticket-server";
import { useAuth } from "@/context/auth";

export default function TicketManager() {
    const [searchText, setSearchText] = useState('');
    const [selectedTicketCategory, setSelectedTicketCategory] = React.useState('');
    const router = useRouter();
    const textInputRef = React.useRef(null);
    const [categoryList, setCategoryList] = useState([]);
    const [eventList, setEventList] = useState([]);
    const auth = useAuth();

    const handleOnChangeText = (text: string) => {
        setSearchText(text);
    }

    const handleOnPressBook = (event: any) => {
        console.log("Book: ", event);
        setSelectedTicketCategory(event);
        // router.push({
        //     pathname: `/books/book/${book.id}`,
        //     params: book
        // });
    }

    console.log("categoryList: ", categoryList);

    async function getCategories() {
        try {
            const response = await ticketServer.getAllCategories(auth?.user.token);
            console.log("Categories: ", response);
            setCategoryList(response.result);
        }
        catch (error) {
            console.error(error);
        }
    }

    async function getEvents() {
        try {
            const response = await ticketServer.getAllEvents(auth?.user.token);
            console.log("Events: ", response);
            setEventList(response.result);
        }
        catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        getCategories();
        getEvents();
    }, []);

    return (
        <>
            <SafeAreaView>
                <View style={{
                }}>
                    <HeaderMenuBack title="Ticket Manager" />
                    <View style={{
                        paddingHorizontal: spacing.horizontalSpacing,
                        justifyContent: 'center',
                    }}>
                        <TextInput
                            placeholder="Qual evento você está procurando ?"
                            placeholderTextColor={colors.white.default}
                            ref={textInputRef}
                            style={{
                                backgroundColor: colors.green.light,
                                fontSize: 14,
                                fontFamily: fontFamily.inter500,
                                paddingVertical: 16,
                                paddingLeft: 12,
                                paddingRight: 28,
                                borderRadius: 11,
                                color: colors.white.default,
                            }}
                            onChangeText={(value) => handleOnChangeText(value)}
                            value={searchText}
                        />
                        <TouchableOpacity style={{
                            width: 16,
                            height: 16,
                            position: 'absolute',
                            right: 30,
                            onPress: () => textInputRef.current.focus()
                        }}>
                            <Image source={SearchIcon} style={{
                                width: 16,
                                height: 16,
                                // position: 'absolute',
                                // right: 25,
                            }} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{
                    marginVertical: 20,
                }}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{
                            gap: 10
                        }}
                    >
                        {categoryList.map((category, index) => {
                            console.log("Category: ", category);
                            return (
                                <ScrollViewButton
                                    key={index}
                                    isActive={selectedTicketCategory === category.description}
                                    onPress={() => handleOnPressBook(category.description)}
                                >
                                    <ScrollViewButton.Text style={{

                                    }}>
                                        {category.description}
                                    </ScrollViewButton.Text>
                                </ScrollViewButton>
                            )
                        }
                        )}
                    </ScrollView>
                </View>
                <View style={{
                    // flex: 1
                }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{
                            marginHorizontal: spacing.horizontalSpacing,
                        }}
                        contentContainerStyle={{
                            gap: 20,
                            paddingBottom: 380
                        }}
                    >
                        {eventList.map((event, index) => (
                            <TicketCard key={index} event={event} />
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
}