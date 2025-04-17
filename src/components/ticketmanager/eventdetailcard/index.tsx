import { View, Text, ViewProps, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Image } from 'expo-image';
import styled from 'styled-components/native';
import { colors } from '@/styles/colors';
import { fontFamily } from '@/styles/font-family';
import { useRouter } from 'expo-router';
import { EventDTO } from '@/server/ticket-server';
import { formatDateString } from '@/utils/format-date';

export type EventCardDetailProps = ViewProps & {
    event: EventDTO;
}

const EventDetailCard = ({ event, ...rest }: EventCardDetailProps) => {
    const router = useRouter();
    console.log("event->: ", JSON.stringify(event))

    console.log("image:", event.image)

    const handleBuy = () => {
        router.push({
            pathname: `/ticketmanager/eventdetail`,
            params: event
        })
    }
    return (
        <View style={s.container}>
            <Image source={event.image} style={{ height: 153, borderRadius: 18 }} />
            <View style={{
                backgroundColor: colors.white.default,
                borderRadius: 18,
                paddingTop: 10,
                paddingBottom: 21,
                paddingLeft: 13,
                paddingRight: 13,
            }}>
                <Text style={s.title}>{event.title}</Text>
                <Text style={s.speaker}>{event.speaker}</Text>
                <Text style={s.description}>{event.description}</Text>
                <Text style={s.title}>Informações do Evento</Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 15,
                }}>
                    <View style={{
                        flex: 1,
                        gap: 3
                    }}>
                        <Text>Data:</Text>
                        <Text style={s.description}>{formatDateString(event.date)}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        gap: 3
                    }}>
                        <Text>Local:</Text>
                        <Text style={s.description}>{event.place}</Text>
                    </View>
                </View>
                <Image source={event.addressimage} style={{ height: 160, borderRadius: 18, marginTop: 18 }} />
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        display: 'flex',
        paddingTop: 10,
        paddingBottom: 21,
        paddingLeft: 13,
        paddingRight: 13,
        gap: 23

    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        color: colors.green.light,
        marginTop: 5
    },
    description: {
        color: "rgba(67, 67, 67, 0.90)",
        fontSize: 14,
        fontFamily: fontFamily.inter,
    },
    speaker: {
        fontSize: 14,
        color: colors.green.light,
        marginTop: 7
    },
    quantity: {
        color: colors.yellow,
        fontSize: 14,
    },
    buyButton: {
        backgroundColor: colors.green.light,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buyButtonText: {
        color: colors.white.default,
        fontSize: 14,
        fontFamily: fontFamily.inter700,
        fontWeight: 700,
    }
})

export default EventDetailCard