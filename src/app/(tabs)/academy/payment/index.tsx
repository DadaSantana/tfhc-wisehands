import { ActivityIndicator, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import {
    PurchaseError,
    requestSubscription,
    useIAP,
    validateReceiptIos,
    withIAPContext,
} from "react-native-iap";
import { useEffect, useState } from "react";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import { academyServer } from "@/server/academy-server";
import { useAuth } from "@/context/auth";
import { APP_STORE_SECRET } from "@/consts";

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const errorLog = ({ message, error }: { message: string, error: any }) => {
    console.error("An error happened", message, error);
};

const isIos = Platform.OS === "ios";

const subscriptionSkus = Platform.select({
    ios: ['jrpremium799'],
});

function Payment() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {
        connected,
        subscriptions, //returns subscriptions for this app.
        getSubscriptions, //Gets available subsctiptions for this app.
        currentPurchase, //current purchase for the tranasction
        finishTransaction,
        purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
        getPurchaseHistory, //gets users purchase history
    } = useIAP();

    const auth = useAuth();

    console.log("User: ", auth?.user);

    console.log("subscriptions: ", subscriptions);

    const handleGetPurchaseHistory = async () => {
        try {
            await getPurchaseHistory();
        } catch (error) {
            errorLog({ message: "handleGetPurchaseHistory", error });
        }
    };

    useEffect(() => {
        handleGetPurchaseHistory();
    }, [connected]);

    const handleGetSubscriptions = async () => {
        try {
            const subs = await getSubscriptions({ skus: subscriptionSkus || [] });
        } catch (error) {
            errorLog({ message: "handleGetSubscriptions", error });
        }
    };

    const handleBuySubscription = async (productId: string) => {
        try {
            await requestSubscription({
                sku: productId,
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error instanceof PurchaseError) {
                errorLog({ message: `[${error.code}]: ${error.message}`, error });
            } else {
                errorLog({ message: "handleBuySubscription", error });
            }
        }
    };

    const updateUserAsPaid = async () => {
        try {
            await academyServer.setPaidCourse(auth?.user?.token);
            console.log("User updated as paid");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (connected)
            handleGetSubscriptions();
    }, [connected]);

    useEffect(() => {
        const checkCurrentPurchase = async (purchase: any) => {
            if (purchase) {
                try {
                    const receipt = purchase.transactionReceipt;
                    if (receipt) {
                        if (Platform.OS === "ios") {
                            //send receipt body to apple server to validete
                            const appleReceiptResponse = await validateReceiptIos({
                                receiptBody: receipt,
                                isTest: __DEV__
                            });

                            //if receipt is valid
                            if (appleReceiptResponse) {
                                const { status } = appleReceiptResponse;
                                if (status && auth?.setPaidCousers) {
                                    await updateUserAsPaid();
                                    auth.setPaidCousers();
                                    router.push("/academy");
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
    }, [currentPurchase, finishTransaction, auth]);

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ padding: 10 }}>
                    <Text
                        style={{
                            fontSize: 28,
                            textAlign: "center",
                            paddingBottom: 15,
                            color: "#E8E8E9",
                            fontWeight: "bold",
                        }}
                    >
                        Subscribe
                    </Text>
                    <Text style={styles.listItem}>
                        Subscribe to some cool stuff today.
                    </Text>
                    <Text
                        style={
                            (styles.listItem,
                            {
                                fontWeight: "500",
                                textAlign: "center",
                                marginTop: 10,
                                fontSize: 18,
                                color: "#E8E8E9",
                            })
                        }
                    >
                        Choose your membership plan.
                    </Text>
                    <View style={{ marginTop: 10 }}>
                        {subscriptions.map((subscription: any, index: number) => {
                            const owned = purchaseHistory.find(
                                (s) => s?.productId === subscription.productId,
                            );
                            console.log("subscriptions", subscription?.productId);
                            return (
                                <View style={styles.box} key={index}>
                                    {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                                        <Text style={styles.specialTag}>SPECIAL OFFER</Text>
                                    )}
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            // marginTop: 10,
                                            // padding: 10,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                paddingBottom: 10,
                                                fontWeight: "bold",
                                                fontSize: 18,
                                                textTransform: "uppercase",
                                                // textAlign: "center",
                                                maxWidth: "90%",
                                            }}
                                        >
                                            {subscription?.title}
                                        </Text>
                                        <Text
                                            style={{
                                                paddingBottom: 20,
                                                fontWeight: "bold",
                                                fontSize: 18,
                                            }}
                                        >
                                            {subscription?.localizedPrice}
                                        </Text>
                                    </View>
                                    {subscription?.introductoryPriceSubscriptionPeriodIOS && (
                                        <Text>
                                            Free for 1{" "}
                                            {subscription?.introductoryPriceSubscriptionPeriodIOS}
                                        </Text>
                                    )}
                                    <Text style={{ paddingBottom: 20 }}>
                                        {subscription?.subscriptionPeriodNumberIOS} {subscription?.subscriptionPeriodUnitIOS}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            router.push("https://jrtech.info/privacy-policy/");
                                        }}
                                    >
                                        <Text style={{ paddingBottom: 20 }}>
                                            Privacy Policy and Terms of Use (EULA)
                                        </Text>
                                    </TouchableOpacity>
                                    {owned && (
                                        <Text style={{ textAlign: "center", marginBottom: 10 }}>
                                            You are Subscribed to this plan!
                                        </Text>
                                    )}
                                    {owned && (
                                        <TouchableOpacity
                                            style={[styles.button, { backgroundColor: `${colors.primary}` }]}
                                            onPress={() => {
                                                if (auth?.user?.token && auth?.setPaidCousers) {
                                                    academyServer.setPaidCourse(auth.user.token).then(() => {
                                                        updateUserAsPaid().then(() => {
                                                            auth.setPaidCousers();
                                                            router.push("/academy");
                                                        });
                                                    });
                                                } else {
                                                    console.error("User token or setPaidCousers function not available");
                                                }
                                            }}
                                        >
                                            <Text style={styles.buttonText}>Continue to App</Text>
                                        </TouchableOpacity>
                                    )}
                                    {loading && <ActivityIndicator size="large" />}
                                    {!loading && !owned && isIos && (
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => {
                                                setLoading(true);
                                                handleBuySubscription(subscription.productId);
                                            }}
                                        >
                                            <Text style={styles.buttonText}>Subscribe</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            router.push("https://jrtech.info/privacy-policy/");
                        }}
                        style={{
                            // backgroundColor: "#1F2229",
                            // padding: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            borderColor: "#1F2229",
                            borderWidth: 2,
                            maxWidth: "95%",
                            width: "95%",
                            alignSelf: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text style={{
                            padding: 20,
                            color: 'white'
                        }}>
                            Privacy Policy and Terms of Use (EULA)
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

export default withIAPContext(Payment);

const Container = styled.View`
    flex: 1;
    padding-top: 40px;
`;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    listItem: {
        fontSize: 16,
        paddingLeft: 8,
        paddingBottom: 3,
        textAlign: "center",
        color: "#E8E8E9",
    },
    box: {
        margin: 10,
        marginBottom: 5,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 7,
        shadowColor: "rgba(0, 0, 0, 0.45)",
        shadowOffset: { height: 16, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    button: {
        alignItems: "center",
        backgroundColor: `${colors.primary}`,
        borderRadius: 8,
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        textTransform: "uppercase",
    },
    specialTag: {
        color: "white",
        backgroundColor: "crimson",
        width: 125,
        padding: 4,
        fontWeight: "bold",
        fontSize: 12,
        borderRadius: 7,
        marginBottom: 2,
    },
});