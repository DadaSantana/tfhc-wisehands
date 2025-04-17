import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { HeaderMenuBack } from '@/components/globals/headermenuback'
import { spacing } from '@/styles/spacing';
import { colors } from '@/styles/colors';
import { fontFamily } from '@/styles/font-family';
import { Image } from 'expo-image';
import SearchIcon from "@/assets/search-icon.svg";
import { ScrollViewButton } from '@/components/ticketmanager/scrollviewbutton';
import MyTicketCard from '@/components/ticketmanager/myticketcard';

const timeFilterOptions = [
    "Hoje",
    "Semana Passada",
    "Este mês",
    "Este ano",
    "Todos",
]

const MyTickets = () => {
    const [searchText, setSearchText] = useState('');
    const textInputRef = React.useRef(null);
    const [selectedTimeFilter, setSelectedTimeFilter] = React.useState('');

    const handleOnChangeText = (text: string) => {
        setSearchText(text);
    }

    const handleOnPressTime = (time: string) => {
        setSelectedTimeFilter(time);
    }

    return (
        <SafeAreaView>
            <View>
                <HeaderMenuBack title="Meus Tickets" />
            </View>
            <View style={{
                paddingHorizontal: spacing.horizontalSpacing,
                justifyContent: 'center',
            }}>
                <TextInput
                    placeholder="Procurar ingresso..."
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
            <View style={{
                marginVertical: 20,
            }}>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{
                        gap: 10
                    }}
                    showsHorizontalScrollIndicator={false}
                >
                    {timeFilterOptions.map((timeOption, index) => {
                        console.log("Category: ", timeOption);
                        return (
                            <ScrollViewButton
                                key={index}
                                isActive={selectedTimeFilter === timeOption}
                                onPress={() => handleOnPressTime(timeOption)}
                            >
                                <ScrollViewButton.Text style={{

                                }}>
                                    {timeOption}
                                </ScrollViewButton.Text>
                            </ScrollViewButton>
                        )
                    }
                    )}
                </ScrollView>
            </View>
            <View>
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
                    <MyTicketCard />
                    <MyTicketCard />
                    <MyTicketCard />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default MyTickets