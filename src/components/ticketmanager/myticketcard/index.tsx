import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import React from 'react'
import { EventDTO } from '@/server/ticket-server';
import { useRouter } from 'expo-router';
import { fontFamily } from '@/styles/font-family';
import { colors } from '@/styles/colors';
import { Image } from 'expo-image';



export type MyTicketCardProps = ViewProps & {
    event: EventDTO;
}

// const MyTicketCard = ({ event, ...rest }: MyTicketCardProps) => {
const MyTicketCard = ({ ...rest }) => {
    const router = useRouter();
    const event = {
        id: 1,
        title: "Event Title",
        description: "Event Description",
        speaker: "Speaker",
        date: "2022-01-01",
        time: "12:00",

    }

    const handleSeeMyTicket = () => {
        router.push({
            pathname: `/ticketmanager/ticket`,
            // params: { event: JSON.stringify(event) }
        })
    }

    return (
        <View style={s.container}>
            <Image source={require('@/assets/ticket-event.png')} style={{ height: 153, borderRadius: 18 }} />
            <View style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'flex-end',
                gap: 7
            }}>
                <Text style={s.title}>Nome do Evento</Text>
                <Text style={s.quantity}>x2 Ingressos</Text>
            </View>
            <Text style={s.description}>{event.description}</Text>
            <View style={{
                marginTop: 8,
            }}>
                <Text style={s.title2}>Status</Text>
                <Text style={s.greenContent}>Disponível</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                marginTop: 8,
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Text style={s.title2}>Data do Evento</Text>
                    <Text style={s.greenContent}>21/11/2024</Text>
                </View>
                <TouchableOpacity
                    style={s.buyButton}
                    onPress={handleSeeMyTicket}
                >
                    <Text style={s.buyButtonText}>Acessar Ingressos</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MyTicketCard

const s = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
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
        marginTop: 5,
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
        color: colors.green.light,
        marginBottom: 2,
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
    },
    title2: {
        fontFamily: fontFamily.bold,
        fontSize: 18,
        color: colors.green.light,
    },
    greenContent: {
        color: colors.green[200]
    }
})