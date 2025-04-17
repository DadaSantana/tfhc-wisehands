import { useAuth } from "@/context/auth";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";

export default function WiseHandsCard() {
    const auth = useAuth();
    const user = auth?.user;
    const profile = user.profile
    const avatar = profile?.photo || profile?.imageURL
    return (
        <View style={s.card}>
            <View style={s.cardHeader}>
                <Image source={require('@/assets/card-wisehand.svg')} style={{ width: 128, height: 18 }} />
                <Image source={require('@/assets/paypass-icon.svg')} style={{ width: 20, height: 24 }} />
            </View>
            <View style={s.cardContent}>
                <Text style={s.username}>{String(user.name).toUpperCase()}</Text>
                {avatar ? (
                    <Image source={{ uri: avatar }} style={{ width: 59, height: 59, borderRadius: 50 }} />
                ) : (
                    <Image source={require("@/assets/default-profile.jpg")} style={{ width: 59, height: 59, borderRadius: 50, borderWidth: 1.5, borderColor: "#3F3D56" }} />
                )}
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    card: {
        justifyContent: 'space-between',
        backgroundColor: colors["yellow-light"],
        padding: 19,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: colors.white.default,
        height: 201,
        width: '100%',
        flex: 1,
        zIndex: 100,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    username: {
        fontFamily: fontFamily.bold,
        fontSize: 16,
        color: colors.black.default,
    },
});