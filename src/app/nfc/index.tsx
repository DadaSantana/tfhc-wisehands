import React from "react";
import { ImageBackground, RefreshControl, ScrollView, Text, View } from "react-native";
import { s } from './styles';
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect, useNavigation } from "expo-router";
import { colors } from "@/styles/colors";
import { Image } from "expo-image";
import { useAuth } from "@/context/auth";
import { Copyright } from "@/components/globals/copyright";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import * as Speech from 'expo-speech';
import { catracaServer } from "@/server/catraca-server";

NfcManager.start();

interface SpeakOptions {
    language: string;
    pitch: number;
    rate: number;
}

const speakCountdown = (seconds: number): void => {
    let currentSecond = seconds;

    const intervalId = setInterval(() => {
        const speakOptions: SpeakOptions = {
            language: 'en',
            pitch: 1,
            rate: 1
        };
        Speech.speak(currentSecond.toString(), speakOptions);

        currentSecond--;

        if (currentSecond < 0) {
            clearInterval(intervalId);
        }
    }, 1000);
};

function decodePayload(payload: number[]) {
    // Convert payload array to Uint8Array
    const uint8Array = new Uint8Array(payload);

    // First byte is the language code length
    const langCodeLength = uint8Array[0];

    // Language code (not used here, but could be extracted if needed)
    const langCode = new TextDecoder().decode(uint8Array.slice(1, 1 + langCodeLength));

    // The rest is the text content
    const textContent = new TextDecoder().decode(uint8Array.slice(1 + langCodeLength));

    return textContent;
}

export default function NFC() {
    const [isNFCRead, setIsNFCRead] = useState(true);
    const [isApprovedAccess, setIsApprovedAccess] = useState(false);

    const navigation = useNavigation();
    const animation = useRef(null);

    const { user } = useAuth() ?? {};
    const profile = user.profile
    const avatar = profile?.photo || profile?.imageURL
    const { token, userId } = user;
    const bgImage = require('@/assets/balls.png');

    useFocusEffect(
        useCallback(() => {
            readNdef();
        }, [])
    );

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: colors.green.light,
            },
            headerTitle: 'Desbloquear',
            headerShadowVisible: false,
            headerTitleStyle: {
                color: colors.white.default,
            },
        });
    }, [navigation]);

    async function readNdef() {
        try {
            setIsNFCRead(false);
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            console.log('Tag', JSON.stringify(tag));

            if (tag && tag.ndefMessage && tag.ndefMessage[0] && tag.ndefMessage[0].payload) {
                const payload = decodePayload(tag.ndefMessage[0].payload);
                console.log("Decoded payload: ", payload);
                const deviceObj = JSON.parse(payload);
                const device = deviceObj.device;
                const direction = deviceObj.direction;

                console.log("Device: ", deviceObj.device);

                setIsNFCRead(true);
                setIsApprovedAccess(true);


                // fetchCatraca(userId, deviceObj);
                await catracaServer.openCatraca({ token, uid: userId, device, direction });
                console.log("Profile: ", profile)
                if (profile?.catracaAudivel === "1") {
                    console.log("user", user)
                    if (user.userId == "797" || user.userId == "640") {
                        const speakOptions = {
                            language: 'pt-br',
                            pitch: 1,
                            rate: 1
                        }
                        Speech.speak("Entrada proibida ! Baixa testosterona detectado!", speakOptions);
                    }
                    if (deviceObj.device === "catraca004")
                        speakCountdown(10);
                    else
                        speakCountdown(5);
                }
            } else {
                console.warn('Invalid tag data');
            }
        } catch (ex) {
            console.warn('Oops!', ex);
            setIsNFCRead(true);
        } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
        }
    }

    return (
        <View style={s.container}>
            <View style={s.wrapper}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={colors.white.default}
                            refreshing={false}
                            onRefresh={
                                () => {
                                    console.log("Refresh")
                                    isNFCRead && readNdef()
                                }
                            } />
                    }
                >
                    <View style={s.spinningContainer}>
                        {
                            !isNFCRead && (<LottieView
                                autoPlay
                                loop
                                ref={animation}
                                style={{
                                    width: 104,
                                    height: 104,
                                }}
                                source={require('@/assets/lottiesfiles/spinning.json')}
                            />
                            )
                        }
                        {
                            isNFCRead && isApprovedAccess &&
                            (
                                <Image source={require('@/assets/nfc-success.svg')} style={{ width: 64, height: 64, marginBottom: 43, marginTop: 43 }} />
                            )
                        }
                        {
                            isNFCRead && !isApprovedAccess &&
                            (
                                <>
                                    <Image source={require('../../../src/assets/nfc-deny.svg')} style={{ width: 64, height: 64, marginBottom: 10, }} />
                                    <Text style={{
                                        color: "#EAEAEA",
                                        fontSize: 20,
                                        fontWeight: 500,
                                        marginBottom: 10
                                    }}>
                                        Access denied
                                    </Text>
                                </>
                            )
                        }
                    </View>
                    <View style={s.card}>
                        <View style={s.cardHeader}>
                            <Image source={require('@/assets/card-wisehand.svg')} style={{ width: 128, height: 18 }} />
                            <Image source={require('@/assets/paypass-icon.svg')} style={{ width: 20, height: 24 }} />
                        </View>
                        <View style={s.cardContent}>
                            <Text style={s.username}>{String(user.name).toUpperCase()}</Text>
                            {avatar ? (
                                <Image source={{ uri: avatar }} style={{ width: 59, height: 59, borderRadius: 50 }} />
                            ) : (
                                <Image source={require("@/assets/default-profile.jpg")} style={{ width: 59, height: 59, borderRadius: 50, borderWidth: 1.5, borderColor: "#3F3D56" }} />
                            )}
                        </View>
                    </View>

                </ScrollView>
            </View>
            <ImageBackground
                source={bgImage}
                style={s.image}
                imageStyle={s.imageStyle}
                resizeMode="cover"
            >
            </ImageBackground>
            <Copyright />
        </View>
    );
}