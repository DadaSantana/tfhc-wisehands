import React, { useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";

import { s } from './styles';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBook, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Copyright } from "@/components/globals/copyright";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Books() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    // const navigation = useNavigation();

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerShown: true,
    //         headerStyle: {
    //             backgroundColor: colors.green.light,
    //         },
    //         headerTitle: '',
    //         headerShadowVisible: false,
    //         headerTitleStyle: {
    //             color: colors.white.default,
    //         },
    //     });
    // }
    //     , [navigation]);
    return (

        <View style={[s.container, { paddingTop: insets.top }]}>
            <StatusBar style="light" />
            <View style={s.header}>
                <FontAwesomeIcon icon={faBook} size={20} color={colors.yellow} />
                <Text style={s.headerTitle}>Wise Book</Text>
            </View>
            <ScrollView style={s.scrollView} contentContainerStyle={s.scrollViewContentStyle}>
                <TouchableOpacity style={s.button} onPress={() => { router.push('/books/catalog') }}>
                    <View style={s.buttonIcon}>
                        <FontAwesomeIcon icon={faBookOpen} size={20} color={colors.white.white1} />
                    </View>
                    <View style={s.buttonTextContainer}>
                        <Text style={s.buttonTitle}>Catálogo</Text>
                        <Text style={s.buttonSubTitle}>Visualizar livros disponíveis</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" size={24} color={colors.white.white1} />
                </TouchableOpacity>
                <TouchableOpacity style={s.button} onPress={() => { router.push('/books/rentbook') }}>
                    <View style={s.buttonIcon}>
                        <FontAwesomeIcon icon={faBookOpen} size={20} color={colors.white.white1} />
                    </View>
                    <View style={s.buttonTextContainer}>
                        <Text style={s.buttonTitle}>Alugar</Text>
                        <Text style={s.buttonSubTitle}>Alugue com seu celular</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" size={24} color={colors.white.white1} />
                </TouchableOpacity>
                <TouchableOpacity style={s.button} onPress={() => { router.push('/books/returnbook') }}>
                    <View style={s.buttonIcon}>
                        <FontAwesomeIcon icon={faBookOpen} size={20} color={colors.white.white1} />
                    </View>
                    <View style={s.buttonTextContainer}>
                        <Text style={s.buttonTitle}>Devolver</Text>
                        <Text style={s.buttonSubTitle}>Retorne um livro emprestado</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" size={24} color={colors.white.white1} />
                </TouchableOpacity>
                <TouchableOpacity style={s.button} onPress={() => { router.push('/books/history') }}>
                    <View style={s.buttonIcon}>
                        <FontAwesomeIcon icon={faBookOpen} size={20} color={colors.white.white1} />
                    </View>
                    <View style={s.buttonTextContainer}>
                        <Text style={s.buttonTitle}>Meu Histórico</Text>
                        <Text style={s.buttonSubTitle}>Acesse a sua lista de aluguéis</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" size={24} color={colors.white.white1} />
                </TouchableOpacity>
            </ScrollView>
            <View style={s.copyrightWrapper}>
                <Copyright />
            </View>
        </View>
    );
}