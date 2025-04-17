import { View, Text, ViewProps, StyleSheet, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Image } from 'expo-image';
import styled from 'styled-components/native';
import { colors } from '@/styles/colors';
import { fontFamily } from '@/styles/font-family';
import { useRouter } from 'expo-router';
import { EventDTO } from '@/server/ticket-server';

export type TicketCardProps = ViewProps & {
    event: EventDTO;
}

const TicketCard = ({ event, ...rest }: TicketCardProps) => {
    const router = useRouter();
    console.log("event: ", event)

    const handleBuy = () => {
        router.push({
            pathname: `/ticketmanager/eventdetail`,
            params: { event: JSON.stringify(event) }
        })
    }
    return (
        <View style={s.container}>
            <Image source={event.image} style={{ height: 153, borderRadius: 18 }} />
            <Text style={s.title}>{event.title}</Text>
            <Text style={s.description}>{event.description}</Text>
            <Text style={s.speaker}>Speaker Missing</Text>
            <View style={{
                flexDirection: 'row',
                marginTop: 15,
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Text>R$ {event.price}.00</Text>
                    <Text style={s.quantity}>1x Ticket</Text>
                </View>
                <TouchableOpacity
                    style={s.buyButton}
                    onPress={handleBuy}
                >
                    <Text style={s.buyButtonText}>Buy</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: colors.white.default,
        paddingTop: 10,
        paddingBottom: 21,
        paddingLeft: 13,
        paddingRight: 13,
        borderRadius: 18,
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

export default TicketCard