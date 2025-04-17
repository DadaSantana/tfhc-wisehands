import { View, Text, TouchableOpacity, Platform, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

const errorLog = ({ message, error }) => {
    if (error instanceof PurchaseError) {
        console.error("PurchaseError: ", error.code, error.message)
    } else {
        console.error("An error happened", message, error)
    }
};

import {
    PurchaseError,
    requestPurchase,
    useIAP,
    validateReceiptIos,
    withIAPContext,
} from "react-native-iap";
import { HeaderMenuBack } from '@/components/globals/headermenuback';
import { Image } from 'expo-image';
import { spacing } from '@/styles/spacing';
import { colors } from '@/styles/colors';
import { StyleSheet } from 'react-native';
import { fontFamily } from '@/styles/font-family';
import Floating from '@/components/ticketmanager/floatingbutton';

function Payment() {
    const params = useLocalSearchParams()
    const event = JSON.parse(params.event as string)
    console.log("payment page event: ", event)
    const navigation = useNavigation();
    const [quantity, setQuantity] = React.useState(1);

    const {
        connected,
        products,
        getProducts,
        currentPurchase,
        finishTransaction,
        purchaseHistory,
        getPurchaseHistory
    } = useIAP();

    const productsSkus = Platform.select({
        ios: ['001']
    })

    // useFocusEffect(
    //     React.useCallback(() => {
    //         navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    //         return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    //     }, [])
    // );

    const handleGetPurchaseHistory = async () => {
        try {
            await getPurchaseHistory();
        } catch (error) {
            errorLog({ message: "handleGetPurchaseHistory", error });
        }
    };

    // useEffect(() => {
    //     handleGetPurchaseHistory();
    // }, [connected]);

    const handleGetProducts = async () => {
        try {
            console.log("productsSkus: ", productsSkus)
            const produts = await getProducts({ skus: productsSkus });
            console.log("products: ", products)
        } catch (error) {
            console.log("error: ", error)
            errorLog({ message: "handleGetProducts", error });
        }
    }

    const handleBuyProduct = async (sku: string) => {
        try {
            const purchase = await requestPurchase({ sku });
            console.log("purchase: ", purchase)
        } catch (error) {
            errorLog({ message: "handleBuyProduct", error });
        }
    }

    // useEffect(() => {
    //     handleGetProducts();
    // }, [connected]);

    useEffect(() => {
        const checkCurrentPurchase = async (purchase) => {
            if (purchase) {
                try {
                    const receipt = purchase.transactionReceipt;
                    if (receipt) {
                        if (Platform.OS === "ios") {
                            const isTestEnvironment = __DEV__;

                            //send receipt body to apple server to validete
                            const appleReceiptResponse = await validateReceiptIos(
                                {
                                    "receipt-data": receipt,
                                    password: "1fad7b3a53194ed4827335b1224f1e85",
                                },
                                isTestEnvironment,
                            );

                            //if receipt is valid
                            if (appleReceiptResponse) {
                                const { status } = appleReceiptResponse;
                                if (status) {
                                    // await updateUserAsPaid();
                                    // setPaidCousers();
                                    // router.push("/academy");
                                    console.log("status", status);
                                }
                            }

                            return;
                        }
                    }
                } catch (error) {
                    console.log("error", error);
                }
            }
        };
        checkCurrentPurchase(currentPurchase);
    }, [currentPurchase, finishTransaction]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderMenuBack title="Payment" />
            <View style={{ paddingHorizontal: spacing.horizontalSpacing }}>
                <View style={{
                    backgroundColor: colors.white.default,
                    paddingTop: 10,
                    paddingBottom: 21,
                    paddingLeft: 13,
                    paddingRight: 13,
                    borderRadius: 18,
                    flexDirection: 'row',
                    gap: 20
                }}>
                    <Image source={event.image} style={{ height: 78, width: 110, borderRadius: 7 }} />
                    <View style={{
                        flex: 1,
                    }}  >
                        <Text style={s.eventTitle}>{event.title}</Text>
                        <Text style={s.speaker}>Speaker missing</Text>
                        <View style={{
                            marginTop: 'auto',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                gap: 12,
                            }}>
                                <TouchableOpacity onPress={() => {
                                    if (quantity > 1)
                                        setQuantity(quantity - 1)
                                }}>
                                    <Image source={require('@/assets/minus.svg')} style={{ height: 24, width: 24 }} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 24 }}>{quantity}</Text>
                                <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                                    <Image source={require('@/assets/plus.svg')} style={{ height: 24, width: 24 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 24 }}>R$ {event.price}.00</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: "#1F2229",
                    opacity: 0.16,
                    marginTop: 20,
                    marginBottom: 20
                }}>
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 10,
                }}>
                    <TextInput style={{
                        flex: 1,
                        backgroundColor: colors.textInput.background,
                        paddingVertical: 12,
                        paddingHorizontal: 13,
                        borderRadius: 12,
                    }}
                        placeholder='Adicionar cupom'
                        placeholderTextColor={colors.textInput.placeholder}
                    />
                    <TouchableOpacity style={{
                        backgroundColor: colors.yellow,
                        borderRadius: 4,
                        paddingVertical: 12,
                        paddingHorizontal: 20,
                    }}>
                        <Text style={{

                        }}
                        >Aplicar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    marginTop: 20,
                    gap: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={s.total}>Total</Text>
                        <Text style={s.total}>R$ {event.price * quantity}.00</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={s.buyButton}
                    onPress={() => handleBuyProduct('001')}
                >
                    <Text style={s.buyButtonText}>Buy Ticket</Text>
                </TouchableOpacity>
                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>payment</Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Text>Go back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleBuyProduct('001')}
                    >
                        <Text>Buy</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
            <Floating />
        </SafeAreaView>
    )
}

export default withIAPContext(Payment)

const s = StyleSheet.create({
    eventTitle: {
        color: colors.green.light,
        fontSize: 18,
        fontFamily: fontFamily.bold,
        fontWeight: 600
    },
    speaker: {
        color: "#9B9B9B",
        fontSize: 12,
        fontFamily: fontFamily.bold,
    },
    total: {
        color: colors.green.light,
        fontSize: 28,
        fontFamily: fontFamily.bold,
        fontWeight: 700
    },
    buyButton: {
        backgroundColor: colors.green.light,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 23
    },
    buyButtonText: {
        color: colors.white.default,
        fontSize: 14,
        fontFamily: fontFamily.inter700,
        fontWeight: 700,
    }
})