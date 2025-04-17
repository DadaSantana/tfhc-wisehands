import { HeaderMenuBack } from "@/components/globals/headermenuback";
import { useAuth } from "@/context/auth";
import { BookDTO, wiseBookServer } from "@/server/wisebook-server";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import dayjs from 'dayjs';

enum MODAL {
    NONE = 0,
    CALENDAR = 1
}

export default function ReviewBookInfo() {
    const { id: bookId } = useLocalSearchParams();
    const { user } = useAuth();
    const [bookInfo, setBookInfo] = useState<BookDTO>();
    const router = useRouter();
    const [returnDate, setReturnDate] = useState('');
    const [showModal, setShowModal] = useState(MODAL.NONE);
    const [selectedReturnPeriod, setSelectedReturnPeriod] = useState('');

    console.log("selectedReturnPeriod: ", !!selectedReturnPeriod);

    async function getBookInfo() {
        try {
            const response = await wiseBookServer.getBookById(user.token, bookId as string);
            console.log("Book Info: ", response.result);
            setBookInfo(response.result[0]);
        } catch (error) {
            console.error(error);
        }
    }

    function updateReturnDate(option: string) {
        switch (option) {
            case '1 Semana':
                setReturnDate(dayjs().add(7, 'days').format("DD/MM/YYYY"));
                break;
            case '2 Semanas':
                setReturnDate(dayjs().add(14, 'days').format("DD/MM/YYYY"));
                break;
            case '1 Mês':
                setReturnDate(dayjs().add(1, 'month').format("DD/MM/YYYY"));
                break;
            case '2 Meses':
                setReturnDate(dayjs().add(2, 'months').format("DD/MM/YYYY"));
                break;
        }
    }

    function handleSelectDate(option: string) {
        console.log("Option: ", option);

        switch (option) {
            case '1 Semana':
                updateReturnDate('1 Semana');
                setSelectedReturnPeriod('1 Semana');
                break;
            case '2 Semanas':
                updateReturnDate('2 Semanas');
                setSelectedReturnPeriod('2 Semanas');
                break;
            case '1 Mês':
                updateReturnDate('1 Mês');
                setSelectedReturnPeriod('1 Mês');
                break;
            case '2 Meses':
                updateReturnDate('2 Meses');
                setSelectedReturnPeriod('2 Meses');
                break;
        }
    }

    useEffect(() => {
        getBookInfo();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderMenuBack title="Alugue o livro" />
            {
                bookInfo && (
                    <View style={{
                        paddingHorizontal: 18,
                        flex: 1,
                    }}>
                        <View>
                            <ScrollView
                                contentContainerStyle={{
                                    paddingBottom: 10
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 7,
                                }}>
                                    <FontAwesome5 name="book" size={34} color={colors.yellow} />
                                    <View style={{
                                        flex: 1,
                                        gap: 2
                                    }}>
                                        <Text style={s.h1}>Revise as informações do livro</Text>
                                        <Text
                                            numberOfLines={1}
                                            style={s.h2}
                                        >{bookInfo.description}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    backgroundColor: colors.green.light,
                                    marginTop: 26,
                                    paddingTop: 14.7,
                                    paddingBottom: 22.05,
                                    paddingHorizontal: 23.88,
                                    borderRadius: 16.535,
                                    gap: 22.5
                                }}>
                                    <View style={{
                                        gap: 4.1
                                    }}>
                                        <Text style={s.label}>Título</Text>
                                        <Text style={s.value}>{bookInfo.name}</Text>
                                    </View>
                                    <View style={{
                                        gap: 4.1
                                    }}>
                                        <Text style={s.label}>Autor</Text>
                                        <Text style={s.value}>{bookInfo.autor}</Text>
                                    </View>
                                    <View style={{
                                        gap: 4.1
                                    }}>
                                        <Text style={s.label}>Ano de publicação</Text>
                                        <Text style={s.value}>{bookInfo.year}</Text>
                                    </View>
                                    <View style={{
                                        gap: 4.1
                                    }}>
                                        <Text style={s.label}>Gênero</Text>
                                        <Text style={s.value}>{bookInfo.genero}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    paddingTop: 24.1
                                }}>
                                    <Text style={s.h1}>Selecione a data de entrega</Text>
                                    <View>
                                        <TextInput
                                            placeholder="Data de devolução"
                                            value={returnDate}
                                            onFocus={() => Keyboard.dismiss()}
                                            showSoftInputOnFocus={false}
                                            placeholderTextColor={colors.black.dk1}
                                            style={{
                                                borderBottomColor: "rgba(173, 177, 184, 0.90)",
                                                borderBottomWidth: 1,
                                                color: colors.black.dk1,
                                                paddingBottom: 10,
                                                margin: 16,
                                                fontSize: 18,
                                                fontWeight: "500"
                                            }}
                                        />
                                        <FontAwesome5
                                            name="calendar-day" size={34} color={colors.yellow}
                                            style={{ position: "absolute", right: 16, top: 0 }}
                                        />
                                    </View>
                                    <View style={{
                                        gap: 13,
                                        flexDirection: 'row',
                                        paddingHorizontal: 4
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => handleSelectDate('1 Semana')}
                                            style={[
                                                s.button,
                                                selectedReturnPeriod === '1 Semana' && s.buttonSelected
                                            ]}
                                        >
                                            <Text style={[
                                                s.buttonText,
                                                selectedReturnPeriod === '1 Semana' && s.buttonTextSelected
                                            ]}>
                                                1 Semana
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleSelectDate('2 Semanas')}
                                            style={[
                                                s.button,
                                                selectedReturnPeriod === '2 Semanas' && s.buttonSelected
                                            ]}
                                        >
                                            <Text style={[
                                                s.buttonText,
                                                selectedReturnPeriod === '2 Semanas' && s.buttonTextSelected
                                            ]}>
                                                2 Semanas
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleSelectDate('1 Mês')}
                                            style={[
                                                s.button,
                                                selectedReturnPeriod === '1 Mês' && s.buttonSelected
                                            ]}
                                        >
                                            <Text style={[
                                                s.buttonText,
                                                selectedReturnPeriod === '1 Mês' && s.buttonTextSelected
                                            ]}>
                                                1 Mês
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => handleSelectDate('2 Meses')}
                                            style={[
                                                s.button,
                                                selectedReturnPeriod === '2 Meses' && s.buttonSelected
                                            ]}
                                        >
                                            <Text style={[
                                                s.buttonText,
                                                selectedReturnPeriod === '2 Meses' && s.buttonTextSelected
                                            ]}>
                                                2 Meses
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <TouchableOpacity
                            style={[{
                                marginTop: 32.44,
                                padding: 16,
                                borderRadius: 9,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 20,
                            },
                            {
                                backgroundColor: !!selectedReturnPeriod ? colors.yellow : colors.gray[500],
                            }
                            ]}
                            disabled={!selectedReturnPeriod}
                            onPress={() => router.push({
                                pathname: '/books/rentbook/confirmation',
                                params: {
                                    bookId,
                                    returnDate
                                }
                            })
                            }
                        >
                            <Text
                                style={{
                                    color: colors.white.default,
                                    fontFamily: fontFamily.inter700,
                                }}
                            >
                                Alugar Livro
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            <View>
            </View>
        </SafeAreaView >
    )
}

const s = StyleSheet.create({
    h1: {
        fontFamily: fontFamily.bold,
        fontWeight: 600,
        fontSize: 18,
        lineHeight: 25,
        color: colors.green.light
    },
    h2: {
        fontFamily: fontFamily.inter500,
        fontWeight: 500,
        fontSize: 14,
        color: colors.gray[900]
    },
    label: {
        color: colors.yellow,
        fontFamily: fontFamily.inter500,
        fontSize: 14.8,
    },
    value: {
        color: colors.white.default,
        fontFamily: fontFamily.inter700,
        fontSize: 16.6,
    },
    button: {
        paddingVertical: 9.78,
        // paddingHorizontal: 13.04,
        boxShadow: '0px 0.815px 6.52px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: 13.854,
        flex: 1,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: fontFamily.bold,
        fontSize: 12,
        color: colors.gray[500],
    },
    buttonSelected: {
        backgroundColor: colors.yellow,
    },
    buttonTextSelected: {
        color: colors.green.light,
    }
});