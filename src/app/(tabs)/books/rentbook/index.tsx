import React, { useCallback } from "react";
import { ImageBackground } from "expo-image";
import { Alert, Platform, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import BackgroundImage from "@/assets/background-green.png";
import NfcManager, { NfcEvents, NfcTech } from 'react-native-nfc-manager';
import { colors } from "@/styles/colors";
import { HeaderMenuBack } from "@/components/globals/headermenuback";
import { useReducer, useRef } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { Image } from "expo-image";
import WiseHandsCard from "@/components/cards/wisehandscard";
import { DISCORD_LOG_WEBHOOK_BOOK } from "@/configs/keys";
import { decodeNFCPayload } from "@/utils/helpers";

NfcManager.start();

const initialState = {
    isError: false,
    isNFCRead: false,
    isReadingNFC: false,
};

interface State {
    isError: boolean;
    isNFCRead: boolean;
    isReadingNFC: boolean;
}

interface Action {
    type: string;
    payload?: Partial<State>;
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_STATES':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default function RentBook() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const animation = useRef(null);
    const router = useRouter();

    async function readNdef() {
        try {
            dispatch({
                type: 'SET_STATES',
                payload: {
                    isError: false,
                    isNFCRead: false,
                    isReadingNFC: true
                }
            });

            await NfcManager.requestTechnology(NfcTech.Ndef);
            const tag = await NfcManager.getTag();
            console.log('Tag', JSON.stringify(tag));

            if (!tag.ndefMessage) {
                if (Platform.OS == 'android') {
                    await NfcManager.cancelTechnologyRequest();
                    Alert.alert("Error", "Invalid Book NFC tag!",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    console.log("User pressed OK");
                                    router.replace(`/(tabs)/books/rentbook`);
                                }
                            }
                        ],
                        { cancelable: false }
                    )
                } else {
                    Alert.alert("Error", "Invalid Book NFC tag!");
                }
                dispatch({
                    type: 'SET_STATES',
                    payload: {
                        isError: true,
                        isNFCRead: false,
                        isReadingNFC: false
                    }
                });
                await fetch(DISCORD_LOG_WEBHOOK_BOOK, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        content: "[WiseHands App] Rent Book [Tag Payload]: " + JSON.stringify({
                            tag: JSON.stringify(tag),
                        }),
                    }),
                })
                return
            }

            const payload = decodeNFCPayload(tag.ndefMessage[0].payload);

            console.log("Payload: ", payload);

            await fetch(DISCORD_LOG_WEBHOOK_BOOK, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: "[WiseHands App] Rent Book [Tag Payload]: " + JSON.stringify({
                        tag: JSON.stringify(payload),
                    }),
                }),
            })

            console.log("Payload: ", payload);

            const bookObj = JSON.parse(payload);
            console.log("Book: ", bookObj);

            if (!bookObj.id) {
                if (Platform.OS == 'android') {
                    await NfcManager.cancelTechnologyRequest();
                    Alert.alert("Error", "Invalid Book NFC tag!",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    console.log("User pressed OK");
                                    router.replace(`/(tabs)/books/rentbook`);
                                }
                            }
                        ],
                        { cancelable: false }
                    )
                } else {
                    Alert.alert("Error", "Invalid Book NFC tag!");
                }
                dispatch({
                    type: 'SET_STATES',
                    payload: {
                        isError: true,
                        isNFCRead: false,
                        isReadingNFC: false
                    }
                });
                return;
            }

            dispatch({
                type: 'SET_STATES',
                payload: {
                    isError: false,
                    isNFCRead: true,
                    isReadingNFC: false
                }
            });

            setTimeout(() => {
                router.push(`/(tabs)/books/rentbook/reviewbookinfo/${bookObj.id}`);
                setTimeout(() => {
                    dispatch({
                        type: 'SET_STATES',
                        payload: {
                            isError: false,
                            isNFCRead: false,
                            isReadingNFC: false
                        }
                    });
                }, 1000);
            }, 1000);

        } catch (error) {
            console.log("Error: ", error);
            await NfcManager.cancelTechnologyRequest();

            fetch(DISCORD_LOG_WEBHOOK_BOOK, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: "[WiseHands App] Rent Book - exception: " + JSON.stringify({
                        error: JSON.stringify(error.message),
                    }),
                }),
            })

            dispatch({
                type: 'SET_STATES',
                payload: {
                    isError: true,
                    isNFCRead: false,
                    isReadingNFC: false
                }
            });
            if (Platform.OS == 'android') {
                router.replace(`/(tabs)/books/rentbook`);
            }

        } finally {
            await NfcManager.cancelTechnologyRequest();
        }
    }

    useFocusEffect(
        useCallback(() => {
            readNdef();
        }, [])
    );

    console.log("isNFCRead: ", state.isNFCRead);
    console.log("isError: ", state.isError);


    return (
        <ImageBackground source={BackgroundImage} style={{ width: '100%', height: '100%' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderMenuBack title="Wise Book" color={colors.white.white1} />
                <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    paddingHorizontal: 30,
                }}>
                    <ScrollView
                        contentContainerStyle={{
                            // flex: 1
                        }}
                        refreshControl={
                            <RefreshControl
                                tintColor={colors.white.default}
                                refreshing={false}
                                onRefresh={
                                    () => {
                                        console.log("Refresh")
                                        dispatch({
                                            type: 'SET_STATES',
                                            payload: {
                                                isError: false,
                                                isNFCRead: false
                                            }
                                        });
                                        state.isNFCRead === false && readNdef()
                                    }
                                } />
                        }
                    >
                        <View
                            style={{
                                alignItems: 'center',
                                // width: "100%",
                                // height: "100%",
                                // marginTop: "auto"
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 40,
                                }}
                            >
                                {
                                    state.isNFCRead == false && state.isError == false && state.isReadingNFC == true && (
                                        <LottieView
                                            autoPlay
                                            loop
                                            ref={animation}
                                            style={{
                                                width: 400,
                                                height: 150
                                            }}
                                            source={require("@/assets/lottiesfiles/spinning.json")}
                                        />
                                    )
                                }
                                {
                                    state.isNFCRead == false && state.isError == false && state.isReadingNFC == false && (

                                        <View style={{
                                            width: 400,
                                            height: 150
                                        }} />
                                    )
                                }
                                {
                                    state.isError == true && state.isNFCRead == false && (
                                        <>
                                            <Image
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    marginBottom: 20
                                                }}
                                                source={require('@/assets/nfc-deny.svg')}
                                            />
                                            <Text style={{
                                                color: "#EAEAEA",
                                                fontSize: 20,
                                                fontWeight: 500,
                                                marginBottom: 10
                                            }}
                                            >{'Oops! We couldn\'t read the NFC tag.'}</Text>
                                        </>
                                    )
                                }
                                {
                                    state.isNFCRead && !state.isError && (
                                        <>
                                            <Image
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    marginBottom: 20
                                                }}
                                                source={require('@/assets/nfc-success.svg')}
                                            />
                                            <Text style={{
                                                color: "#EAEAEA",
                                                fontSize: 20,
                                                fontWeight: 500,
                                                marginBottom: 10
                                            }}
                                            >{'NFC tag read successfully!'}</Text>
                                        </>
                                    )
                                }
                            </View>
                        </View>
                        <WiseHandsCard />
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ImageBackground>

    )
}