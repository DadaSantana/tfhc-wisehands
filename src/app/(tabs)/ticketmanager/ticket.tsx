import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/styles/colors'
import { Image } from 'expo-image'
import { fontFamily } from '@/styles/font-family'
import QRCode from 'react-native-qrcode-svg';
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'


const Ticket = () => {
    const router = useRouter();
    return (

        <View style={{
            flex: 1,
            backgroundColor: colors.green.light,
        }}>
            <SafeAreaView style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 20,
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}>
                    <Image source={require('@/assets/exclamationMark.svg')} style={{ width: 99, height: 92 }} />
                    <Text style={s.title}>Atenção</Text>
                    <Text style={s.message}>O status do seu ticket será alterado para{'\n'} <Text style={{ color: colors.red[100] }}>Utilizado</Text> quando ele for escaneado.</Text>
                    <View style={{
                        marginTop: 60,
                    }}>
                        <QRCode
                            value="Just some string value"
                            size={170}
                        />
                    </View>

                </View>
                <View style={{
                    width: '100%',
                }}>
                    <TouchableOpacity style={s.button} onPress={() => router.back()}>
                        <Text style={s.buttonTitle}>Voltar</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    )
}

export default Ticket

const s = StyleSheet.create({
    title: {
        fontSize: 28,
        color: colors.white.default,
        fontFamily: fontFamily.bold,
        marginTop: 20,
    },
    message: {
        color: colors.white.default,
        fontFamily: fontFamily.inter500,
        fontSize: 16,
        marginTop: 10,
        justifyContent: 'center',
        textAlign: 'center',
        lineHeight: 25,
    },
    button: {
        width: '100%',
        backgroundColor: colors.yellow,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        borderRadius: 10,
        height: 58,
    },
    buttonTitle: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: colors.green.light,
    }
})