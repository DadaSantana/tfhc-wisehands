import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { HeaderMenuBack } from '@/components/globals/headermenuback'
import { spacing } from '@/styles/spacing'
import EventDetailCard from '@/components/ticketmanager/eventdetailcard'
import { colors } from '@/styles/colors'
import { fontFamily } from '@/styles/font-family'

const EventDetail = () => {
    const router = useRouter();
    const params = useLocalSearchParams()
    const event = JSON.parse(params.event as string)

    const handleBuy = () => {
        router.push({
            pathname: `/ticketmanager/ticketpayment`,
            params: { event: JSON.stringify(event) }
        })
    }

    return (
        <SafeAreaView>
            <View>
                <HeaderMenuBack title="Event Detail" />
                <View style={{
                    paddingHorizontal: spacing.horizontalSpacing,
                }}>
                    <ScrollView>
                        <EventDetailCard event={event} />

                    </ScrollView>
                    <TouchableOpacity
                        style={s.buyButton}
                        onPress={handleBuy}
                    >
                        <Text style={s.buyButtonText}>Buy Ticket</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EventDetail

const s = StyleSheet.create({
    buyButton: {
        backgroundColor: colors.green.light,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 13,
        marginRight: 13,
    },
    buyButtonText: {
        color: colors.white.default,
        fontSize: 14,
        fontFamily: fontFamily.inter700,
        fontWeight: 700,
    }
})