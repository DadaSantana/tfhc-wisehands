import { HeaderMenuBack } from "@/components/globals/headermenuback";
import { useAuth } from "@/context/auth";
import { BookDTO, wiseBookServer } from "@/server/wisebook-server";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function formatCompactDate(dateString: string): string {
    if (dateString.length !== 8) {
        throw new Error("Invalid date format. Expected YYYYMMDD.");
    }

    // Extract year, month, and day from the string
    const year = dateString.slice(0, 4); // First 4 characters
    const month = dateString.slice(4, 6); // Next 2 characters
    const day = dateString.slice(6, 8); // Last 2 characters

    // Return the formatted date
    return `${day}/${month}/${year}`;
}

function formatDate(dateString: string): string {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const year = date.getFullYear();

    // Return the formatted date
    return `${day}/${month}/${year}`;
}

type PillProps = {
    status: "Available" | "Unavailable";
}

function Pill({ status }: PillProps) {
    if (status === "Available") {
        return (
            <View style={{
                backgroundColor: "#12B76A",
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 6
            }}>
                <FontAwesome name="circle" size={10} color={colors.success[100]} />
                <Text
                    style={{
                        color: "#101828",
                        fontSize: 12,
                        fontWeight: "500"
                    }}
                >Disponível</Text>
            </View>
        )
    } else {
        return (
            <View style={{
                backgroundColor: "#FF8500",
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 6
            }}>
                <FontAwesome name="circle" size={10} color="#101828" />
                <Text
                    style={{
                        color: "#101828",
                        fontSize: 12,
                        fontWeight: "500"
                    }}
                >Em utilização</Text>
            </View>
        )
    }
};

export default function BookInfo() {
    const params = useLocalSearchParams();
    const {
        cover,
        name,
        description,
        status,
        genero,
        autor,
        year,
        id: bookId
    } = params;
    console.log(params);
    const [book, setBook] = useState<BookDTO>();
    const auth = useAuth();

    let isBooked = false;

    if (book?.user == "") {
        isBooked = false
    } else {
        isBooked = true
    }

    async function getBook() {
        try {
            const response = await wiseBookServer.getBookById(auth?.user.token, bookId as string);
            if (response && response.result) {
                console.log("Book: ", response.result);
                setBook(response.result[0]);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (bookId) {
            getBook();
        }
    }, [bookId]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderMenuBack title="Informações" />

            {
                book ? (
                    <View style={{
                        flex: 1,
                        paddingHorizontal: 16,
                        gap: 5.87
                    }}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View>
                                <Image
                                    source={cover}
                                    style={{
                                        width: '100%',
                                        height: 336,
                                        borderRadius: 10,
                                    }}
                                    contentFit="fill"
                                />
                            </View>
                            {/* <View style={{
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    marginTop: 28,
                                    fontFamily: fontFamily.bold,
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: colors.green.light,
                                    marginBottom: 10,
                                }}>{book.name}</Text>
                                <Text style={{
                                    fontFamily: fontFamily.inter500,
                                    fontSize: 16,
                                    color: colors.gray[600],
                                    textAlign: 'center',
                                    marginBottom: 31,
                                }}
                                >{book.description}</Text>
                            </View> */}
                            <View style={{
                                backgroundColor: colors.green.light,
                                paddingTop: 14.7,
                                paddingBottom: 22.05,
                                paddingHorizontal: 23.88,
                                borderRadius: 16.535,
                                gap: 22.97,
                                marginTop: 20
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 22.97
                                }}>
                                    <View style={{ width: 110 }}>
                                        <Text style={s.label}>Título</Text>
                                        <Text style={s.text}>{book.name}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 22.97
                                }}>
                                    <View style={{ width: 110 }}>
                                        <Text style={s.label}>Autor</Text>
                                        <Text style={s.text}>{book.autor}</Text>
                                    </View>
                                    <View>
                                        <Text style={s.label}>Ano de publicação</Text>
                                        <Text style={s.text}>{book.year}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 22.97
                                }}>
                                    <View>
                                        <Text style={s.label}>Data de empréstimo</Text>
                                        <Text style={s.text}>{formatDate(book?.bookout)}</Text>
                                    </View>
                                    <View style={{ width: 110 }}>
                                        <Text style={s.label}>Gênero</Text>
                                        <Text style={s.text}>{book.genero}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 22.97
                                }}>
                                    <View>
                                        <Text style={s.label}>Data de devolução</Text>
                                        <Text style={s.text}>{formatCompactDate(book?.returnAT)}</Text>
                                    </View>
                                    <View style={{ width: 110 }}>
                                        <Text style={s.label}>Status</Text>
                                        <Pill status="Available" />
                                    </View>
                                </View>
                                {/* {
                                    isBooked && (
                                        <View style={{
                                            flexDirection: 'row',
                                            gap: 22.97
                                        }}>
                                            <View style={{ width: 110 }}>
                                                <Text style={s.label}>Usuário utilizando</Text>
                                                <Text style={s.text}>{book.user}</Text>
                                            </View>
                                            <View>
                                                <Text style={s.label}>Data de empréstimo</Text>
                                                <Text style={s.text}>{formatDate(book?.bookout)}</Text>
                                            </View>
                                            <View>
                                                <Text style={s.label}>Devolução estimada</Text>
                                                <Text style={s.text}>{formatCompactDate(book?.returnAT)}</Text>
                                            </View>
                                        </View>
                                    )
                                } */}
                            </View>
                        </ScrollView>
                        {/* {!isBooked && (
                            <TouchableOpacity
                                style={{
                                    padding: 16,
                                    backgroundColor: colors.yellow,
                                    borderRadius: 9,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: colors.white.default,
                                        fontFamily: fontFamily.inter700,
                                    }}
                                >
                                    Alugar Livro
                                </Text>
                            </TouchableOpacity>
                        )
                        } */}
                    </View>
                ) : null
            }
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    label: {
        fontFamily: fontFamily.inter500,
        fontSize: 11.024,
        color: colors.WH2,
        marginBottom: 8,
    },
    text: {
        fontFamily: fontFamily.inter700,
        fontSize: 12.861,
        color: colors.white.white1,
    },
});