import React, { useEffect, useState } from "react";
import { colors } from "@/styles/colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, ScrollView, StyleSheet, FlatList, RefreshControl } from "react-native";
import { Image } from "expo-image";
import ArrowLeftSolid from "@/assets/arrow-left-solid.svg";
import SearchIcon from "@/assets/search-icon.svg";
import { router, useRouter } from "expo-router";
import { fontFamily } from "@/styles/font-family";
import { LastNewsLibrary } from "@/components/globals/lastnewslibrary";
import { Books, wiseBookServer } from "@/server/wisebook-server";
import { useAuth } from "@/context/auth";
import { BookCard } from "@/components/wisebook/bookcard";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Skeleton = () => (
    <View style={{
        flexDirection: 'row',
        gap: 14,
        padding: 16,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 18,
        boxShadow: '0px 0px 13px 0px rgba(0, 0, 0, 0.25)',
        marginTop: 10,
    }}>
        <View style={{
            flexDirection: 'row',
            gap: 16
        }}>
            <ShimmerPlaceholder
                style={{
                    width: 90,
                    height: 90,
                    borderRadius: 10,
                    marginBottom: 16,
                }}
            />
            <View style={{
                justifyContent: 'space-between',
                paddingRight: 16,
            }}>
                <ShimmerPlaceholder
                    style={{
                        width: "100%",
                        height: 15,
                        borderRadius: 10,
                    }}
                />
                <ShimmerPlaceholder
                    style={{
                        width: "100%",
                        height: 17,
                        borderRadius: 10,
                    }}
                />
                <ShimmerPlaceholder
                    style={{
                        width: "100%",
                        height: 15,
                        borderRadius: 10,
                    }}
                />
                <ShimmerPlaceholder
                    style={{
                        width: 230,
                        height: 17,
                        borderRadius: 10,
                    }}
                />
            </View>
        </View>
    </View>
)

export default function WiseBookCatalog() {
    const [searchText, setSearchText] = useState('');
    const [selectedBookCategory, setSelectedBookCategory] = React.useState('Available');
    const [books, setBooks] = React.useState<Books[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const router = useRouter();
    const auth = useAuth();
    const user = auth?.user;
    const textInputRef = React.useRef(null);

    const handleOnChangeText = (text: string) => {
        setSearchText(text);
    }

    const handleOnPressBook = (book: Books) => {
        console.log("Book: ", book);
        router.push({
            pathname: `/books/book/${book.id}`,
            params: book
        });
    }

    async function getBooks() {
        try {

            if (selectedBookCategory === "Available") {
                const response = await wiseBookServer.getAllBooksAvailable(user.token);
                console.log("Books: ", response?.result);
                if (searchText) {
                    let result = response?.result.filter(book => book.name.toLowerCase().includes(searchText.toLowerCase()));
                    setBooks(result || []);
                    setIsLoading(false);
                    return;
                } else {
                    setBooks(response?.result || []);
                    setIsLoading(false);
                }
            } else {
                const response = await wiseBookServer.getAllBooksInUse(user.token);
                console.log("Books: ", response?.result);
                setBooks(response?.result || []);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getBooks();
    }, [selectedBookCategory]);

    useEffect(() => {
        if (!searchText) {
            getBooks();
            return;
        }
        let result = books.filter(book => book.name.toLowerCase().includes(searchText.toLowerCase()));
        setBooks(result);

    }, [searchText]);

    return (
        <>
            <StatusBar
                style="dark"
                backgroundColor={colors.white.default}
                translucent
            />
            <SafeAreaView>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingBottom: 30,
                }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={ArrowLeftSolid} style={{ width: 21, height: 24 }} />
                    </TouchableOpacity>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontFamily: fontFamily.bold,
                            fontSize: 20,
                            color: colors.green.light
                        }}>
                            Wise Book
                        </Text>
                    </View>
                </View>

                <View style={{
                    paddingHorizontal: 16,
                    justifyContent: 'center',
                }}>
                    <TextInput
                        placeholder="Qual livro está procurando ?"
                        placeholderTextColor={colors.white.default}
                        ref={textInputRef}
                        style={{
                            backgroundColor: colors.green.light,
                            fontSize: 14,
                            fontFamily: fontFamily.inter500,
                            paddingVertical: 16,
                            paddingLeft: 12,
                            paddingRight: 28,
                            borderRadius: 11,
                            color: colors.white.default,
                        }}
                        onChangeText={(value) => handleOnChangeText(value)}
                        value={searchText}
                    />
                    <TouchableOpacity style={{
                        width: 16,
                        height: 16,
                        position: 'absolute',
                        right: 30,
                        onPress: () => textInputRef.current.focus()
                    }}>
                        <Image source={SearchIcon} style={{
                            width: 16,
                            height: 16,
                            // position: 'absolute',
                            // right: 25,
                        }} />
                    </TouchableOpacity>

                </View>
                <View style={{
                    paddingHorizontal: 16,
                }}>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{
                            gap: 8.62
                        }}
                        style={{
                            paddingVertical: 30,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                if (selectedBookCategory === 'Available') return;
                                setIsLoading(true);
                                setSelectedBookCategory('Available')
                            }}
                            style={[
                                styles.button,
                                selectedBookCategory === 'Available' && styles.buttonSelected
                            ]}>
                            <Text style={[
                                styles.buttonText, selectedBookCategory === 'Available' && styles.buttonTextSelected
                            ]}>
                                Available
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (selectedBookCategory === 'In Use') return;
                                setIsLoading(true);
                                setSelectedBookCategory('In Use')
                            }}
                            style={[
                                styles.button,
                                selectedBookCategory === 'In Use' && styles.buttonSelected
                            ]}
                        >
                            <Text style={[
                                styles.buttonText,
                                selectedBookCategory === 'In Use' && styles.buttonTextSelected
                            ]}>
                                In Use
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                        onPress={() => setSelectedBookCategory('Empreendedorismo')}
                        style={[
                            styles.button,
                            selectedBookCategory === 'Empreendedorismo' && styles.buttonSelected
                        ]}
                    >
                        <Text style={[
                            styles.buttonText,
                            selectedBookCategory === 'Empreendedorismo' && styles.buttonTextSelected
                        ]}>
                            Empreendedorismo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedBookCategory('Ficção')}
                        style={[
                            styles.button,
                            selectedBookCategory === 'Ficção' && styles.buttonSelected
                        ]}>
                        <Text
                            style={[
                                styles.buttonText,
                                selectedBookCategory === 'Ficção' && styles.buttonTextSelected
                            ]}
                        >
                            Ficção
                        </Text>
                    </TouchableOpacity> */}
                    </ScrollView>
                </View>
                <View style={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                    // flex: 1,
                    height: 238,
                }}>
                    <LastNewsLibrary />
                </View>
                <View>{isLoading ?
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                    :
                    <FlatList
                        data={books}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            const book = {
                                id: item.id,
                                title: item.name,
                                genre: item.genero,
                                photo: item.cover,
                                autor: item.autor,
                            }
                            return <BookCard
                                book={book}
                                onPress={() => handleOnPressBook(item)}
                            />
                        }}
                        contentContainerStyle={{
                            gap: 16,
                            paddingBottom: 860,
                            paddingHorizontal: 16,
                            paddingTop: 16,
                        }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={false} onRefresh={
                                () => {
                                    getBooks();
                                }
                            }
                            />
                        }
                    />
                }
                </View>
            </SafeAreaView >
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 9.78,
        paddingHorizontal: 13.04,
        boxShadow: '0px 0.815px 6.52px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: 13.854
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
