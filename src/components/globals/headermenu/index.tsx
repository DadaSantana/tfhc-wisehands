import { TouchableOpacity, View, Text } from "react-native";

import { s } from "./styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

type HeaderMenuProps = {
    Logo?: React.ElementType;
}

export function HeaderMenu({ Logo }: HeaderMenuProps) {
    const router = useRouter();
    return (
        <View style={s.container}>
            <View style={s.logoContainer}>
                {Logo ? <Image source={Logo} style={s.logo} resizeMode="contain" /> : null}
                <Text style={s.logoText}>TFHC</Text>
            </View>

            <View style={s.containerIcons}>
                <TouchableOpacity
                    style={s.iconContainer}
                    onPress={() => router.push('/tv')}
                >
                    <Image source={require('@/assets/play.png')} style={s.iconImage} resizeMode="contain"/>
                </TouchableOpacity>
                <TouchableOpacity style={s.iconContainer} onPress={() => { /* TODO: Add onPress for Bell */ }}>
                    <Image source={require('@/assets/bell.png')} style={s.iconImage} resizeMode="contain"/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={s.iconContainer}
                    onPress={() => router.push('/profile')}
                >
                    <Image source={require('@/assets/profile.png')} style={s.iconImage} resizeMode="contain"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}