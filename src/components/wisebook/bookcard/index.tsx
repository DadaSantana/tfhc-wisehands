import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { FontAwesome } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type Book = {
    id: number;
    title: string;
    genre: string;
    photo: string;
    autor: string;
}

type BookCardProps = {
    book: Book;
    onPress: () => void;
}

export function BookCard({ book, onPress }: BookCardProps) {
    console.log(book);
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={s.container}>
                <Image
                    source={{ uri: book.photo }}
                    style={s.image}
                // resizeMode="cover"
                />
                <View style={s.info}>
                    <Text style={s.genre}>{book.genre}</Text>
                    <Text style={s.title}>{book.title}</Text>
                    <Text style={s.autorLabel}>Autor</Text>
                    <Text style={s.autor}>{book.autor}</Text>
                </View>
                <FontAwesome name="chevron-right" size={24} color={colors.gray[300]} style={{ alignSelf: 'center' }} />
            </View>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 14,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 18,
        boxShadow: '0px 0px 13px 0px rgba(0, 0, 0, 0.25)',
        flex: 1,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,

    },
    info: {
        gap: 4,
        justifyContent: 'space-between',
        flex: 1,
    },
    autorLabel: {
        color: colors.gray.WH2,
        fontFamily: fontFamily.inter500,
        fontSize: 12,
    },
    autor: {
        color: colors.white.white1,
        fontFamily: fontFamily.inter700,
        fontSize: 14,
    },
    title: {
        fontFamily: fontFamily.inter700,
        color: colors.green.light,
        fontSize: 14,
    },
    genre: {
        fontSize: 12,
        color: colors.yellow,
        fontFamily: fontFamily.inter500,
    }
});