import React, { memo, useCallback } from "react";
import { Image, ImageBackground, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Image as ImageExpo } from "expo-image";

import { s } from './styles';
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faTicket, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { Copyright } from "@/components/globals/copyright";
import background from "@/assets/background-green.png";
import { HeaderMenuBack } from "@/components/globals/headermenuback";

// const Background = memo(() => (
//     <ImageBackground
//         source={require('@/assets/balls.png')}
//         style={s.image}
//         imageStyle={s.imageStyle}
//         resizeMode="cover"
//     />
// ));

export default function Profile() {

    const router = useRouter();
    const auth = useAuth();
    const user = auth?.user;

    console.log("user", user);

    const userAvatar = user.profile?.photo;

    const handleNotificationPress = useCallback(() => {
        // Lógica para notificações
    }, []);

    const handleTicketsPress = useCallback(() => {
        // Lógica para tickets
    }, []);

    return (
        <SafeAreaView style={s.container}>
            {/* <ImageBackground
                source={background}
                style={s.image}
                imageStyle={s.imageStyle}
                resizeMode="cover"
            > */}
            <HeaderMenuBack title="Menu" color={colors.white.white1} />
            <View style={s.wrapper}>
                <TouchableOpacity
                    style={s.profileContainer}
                    onPress={() => router.push('/profile/myprofile')}
                >
                    <Image
                        source={userAvatar ? { uri: userAvatar } : require('../../assets/avatar.jpg')}
                        style={s.avatar}
                    />
                    <View style={s.profileInfo}>
                        <Text style={s.name}>{user.name ? user.name : ''}</Text>
                        <Text style={s.profile}>Ver perfil</Text>
                    </View>
                    <FontAwesome5 name="chevron-right" size={24} color={colors.yellow} />
                </TouchableOpacity>
                <ScrollView style={s.scrollView} contentContainerStyle={s.scrollViewContentStyle}>
                    {/* <View style={{ gap: 40 }}> */}
                    <TouchableOpacity style={s.scrollViewItem}
                        onPress={() => { }}
                    >
                        <FontAwesomeIcon icon={faBell} size={24} color={colors.white.default} />
                        <Text style={s.scrollViewItemText}>Notificações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.scrollViewItem}
                        onPress={() => { }}
                    >
                        <FontAwesomeIcon icon={faTicket} size={24} color={colors.white.default} />
                        <Text style={s.scrollViewItemText}>Meus Tickets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={s.scrollViewItem} onPress={() => router.push('/nfc')}>
                        <ImageExpo source={require('../../assets/nfc-icon.svg')} style={s.icon} />
                        <Text style={s.scrollViewItemText}>Desbloquear Catraca</Text>
                    </TouchableOpacity>
                </ScrollView>
                {/* </View> */}
                <Copyright />
            </View>
            {/* </ImageBackground> */}
            {/* <Background /> */}
            {/* <Image source={require('../../assets/balls.png')} style={s.image} /> */}
        </SafeAreaView>
    );
}

