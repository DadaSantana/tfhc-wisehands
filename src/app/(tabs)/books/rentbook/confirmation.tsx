import { HeaderMenuBack } from "@/components/globals/headermenuback";
import { useAuth } from "@/context/auth";
import { BookDTO, wiseBookServer } from "@/server/wisebook-server";
import { formatDateString } from "@/utils/format-date";
import dayjs from "dayjs";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tickCircleIcon from '@/assets/tickcircle-icon.svg';
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { Pill } from "@/components/pill";

export default function Confirmation() {
    const params = useLocalSearchParams();
    const { user } = useAuth();
    const [bookInfo, setBookInfo] = useState<BookDTO>();
    const router = useRouter();

    const bookId = params.bookId;
    const returnDate = params.returnDate;
    const returnDateTransformed = (returnDate as string).replace(/-/g, '');
    const returnDateFormatted = formatDateString(returnDateTransformed);

    let bookOut = bookInfo?.bookout;
    let bookOutFormatted = bookOut ? formatDateString(bookOut.replace(/-/g, '')) : dayjs().format('DD/MM/YYYY');

    async function getBookInfo() {
        try {
            let response = await wiseBookServer.getBookById(user.token, bookId as string);
            console.log("Book Info: ", response.result);
            setBookInfo(response.result[0]);

            response = await wiseBookServer.rentBook(user.token, bookId as string, returnDateTransformed)
            console.log("Rent Book: ", response.result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBookInfo();
    }, []);

    const handleOnPressOK = () => {
        router.navigate('/books');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderMenuBack title="Confirmação" />
            {
                bookInfo && (
                    <View style={{
                        paddingHorizontal: 16,
                        alignItems: 'center',
                        flex: 1
                    }}>
                        <Image source={tickCircleIcon} style={{
                            width: 75,
                            height: 75,
                            marginTop: 46
                        }} />
                        <Text style={s.h1}>Livro Alugado com sucesso</Text>
                        <View style={{
                            backgroundColor: colors.green.light,
                            marginTop: 26,
                            paddingTop: 14.7,
                            paddingBottom: 22.05,
                            paddingHorizontal: 23.88,
                            borderRadius: 16.535,
                            gap: 22.5,
                            width: "100%"
                        }}>
                            <View style={{
                                gap: 4.21
                            }}>
                                <Text style={s.label}>Título</Text>
                                <Text style={s.value}>{bookInfo.name}</Text>
                            </View>
                            <View style={{
                                gap: 22.64,
                                flexDirection: 'row',
                            }}>
                                <View style={{
                                    gap: 4.21
                                }}>
                                    <Text style={s.label}>Autor</Text>
                                    <Text style={s.value}>{bookInfo.autor}</Text>
                                </View>
                                <View style={{
                                    gap: 4.21
                                }}>
                                    <Text style={s.label}>Ano de publicação</Text>
                                    <Text style={s.value}>{bookInfo?.year}</Text>
                                </View>
                            </View>
                            <View style={{
                                gap: 24.64,
                                flexDirection: 'row',
                            }}>
                                <View style={{
                                    gap: 4.21
                                }}>
                                    <Text style={s.label}>Data de empréstimo</Text>
                                    <Text style={s.value}>{bookOutFormatted}</Text>
                                </View>
                                <View style={{
                                    gap: 4.21
                                }}>
                                    <Text style={s.label}>Gênero</Text>
                                    <Text style={s.value}>{bookInfo.genero}</Text>
                                </View>
                            </View>
                            <View style={{
                                gap: 24.64,
                                flexDirection: 'row'
                            }}>
                                <View style={{
                                    gap: 4.21
                                }}>
                                    <Text style={s.label}>Devlução prevista</Text>
                                    <Text style={s.value}>{returnDate}</Text>
                                </View>
                                <View style={{
                                    gap: 4.21
                                }}>
                                    <Text style={s.label}>Status</Text>
                                    <Pill status="Unavailable" />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            width: '100%',
                            marginBottom: 26,
                        }}>
                            <TouchableOpacity
                                style={{
                                    padding: 16,
                                    backgroundColor: colors.yellow,
                                    borderRadius: 9,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                }}
                                onPress={handleOnPressOK}
                            >
                                <Text
                                    style={{
                                        color: colors.green.light,
                                        fontFamily: fontFamily.inter700,
                                    }}
                                >
                                    OK
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    h1: {
        fontFamily: fontFamily.bold,
        fontWeight: 600,
        fontSize: 20,
        lineHeight: 25,
        color: colors.green.light,
        marginTop: 9
    },
    label: {
        color: colors.WH2,
        fontFamily: fontFamily.inter500,
        fontSize: 14.8,
    },
    value: {
        color: colors.white.default,
        fontFamily: fontFamily.inter700,
        fontSize: 16.6,
    }
});