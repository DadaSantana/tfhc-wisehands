import { HeaderMenuBack } from "@/components/globals/headermenuback";
import { Pill } from "@/components/pill";
import { useAuth } from "@/context/auth";
import { wiseBookServer } from "@/server/wisebook-server";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { formatDateString } from "@/utils/format-date";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function ReturnBook() {
    const [selected, setSelected] = useState(null);
    const router = useRouter();
    console.log("selected", selected);
    const { user } = useAuth();
    const [bookList, setBookList] = useState([]);
    const [bookInfo, setBookInfo] = useState(null);

    let bookOut = bookInfo?.bookout;
    let bookOutFormatted = bookOut ? formatDateString(bookOut.replace(/-/g, '')) : dayjs().format('DD/MM/YYYY');

    function transformData(jsonData: any[]) {
        console.log("Json Data: ", jsonData);
        return jsonData.map((item: { idcontrol: string, name: string }) => ({
            key: item.idcontrol,
            value: item.name
        }));
    }

    async function getHistoryRentedBooks() {
        try {
            const response = await wiseBookServer.getHistoryRentedBooks(user.token);
            console.log("History Rented Books: ", response.result);
            const list = transformData(response.result);
            console.log("List: ", list);
            setBookList(list);
        } catch (error) {
            console.error(error);
        }
    }

    async function getHistoryRentedBookInfoByRentId(rentId: string) {
        try {
            const response = await wiseBookServer.getHistoryRentedBooks(user.token);
            if (response && response.result) {
                const bookInfo = response.result.find(item => item.idcontrol === rentId);
                console.log("Book Info: ", bookInfo);
                return bookInfo;
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getHistoryRentedBooks();
    }, []);


    useEffect(() => {
        if (selected) {
            console.log("Selected: ", selected);

            getHistoryRentedBookInfoByRentId(selected).then(bookInfo => {
                console.log("Book Info: ", bookInfo);
                setBookInfo(bookInfo);
            });
        }
    }, [selected]);

    const handleOnPressOK = () => {
        router.push({
            pathname: '/(tabs)/books/returnbook/proofofreturn',
            params: { bookInfo: JSON.stringify(bookInfo) }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderMenuBack title="Wise Book" />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                paddingHorizontal: 16,
            }}>
                <FontAwesome5 name="book" size={34} color={colors.yellow} />
                <View style={{
                    flex: 1,
                    gap: 2
                }}>
                    <Text style={s.h1}>Revise as informações do livro</Text>
                </View>
            </View>
            <View style={{
                paddingHorizontal: 16,
                marginTop: 27
            }}>
                <SelectList
                    data={bookList}
                    save="key"
                    setSelected={setSelected}
                    arrowicon={<FontAwesome name="chevron-down" size={12} color={colors.WH2} />}
                    closeicon={<FontAwesome name="close" size={16} color={colors.WH2} />}
                    searchicon={<FontAwesome name="search" size={12} color={colors.WH2} style={{ paddingRight: 10 }} />}
                    placeholder="Selecione o livro..."
                    searchPlaceholder={""}
                    inputStyles={{
                        fontFamily: fontFamily.bold,
                        color: "#444444",
                        width: "100%",
                        fontSize: 16,
                        fontWeight: "600",
                        // paddingLeft: 10,
                    }}
                    dropdownTextStyles={{
                        color: "#444444",
                        fontSize: 16,
                        fontWeight: "600",
                    }}
                    boxStyles={{
                        backgroundColor: colors.white.default,
                        borderColor: colors.white.default,
                        alignItems: "center",
                        height: 53,
                        boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
                        borderRadius: 15,
                    }}
                    dropdownStyles={{
                        backgroundColor: colors.white.default,
                        // borderColor: "#2F3139",
                        borderColor: "white",
                        boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                    labelStyles={{
                        color: "#444444"
                    }}
                />
            </View>
            {
                bookInfo && (
                    <View style={{
                        paddingHorizontal: 16,
                        flex: 1
                    }}>
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
                                    <Text style={[s.value, { color: colors.yellow }]}>{formatDateString(bookInfo.returnAT)}</Text>
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
                                    Avançar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
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