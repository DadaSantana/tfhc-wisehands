import { Touchable, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell, faTelevision, faUser } from "@fortawesome/free-solid-svg-icons";

import { s } from "./styles";
import { colors } from "@/styles/colors";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

type HeaderMenuProps = {
    Logo?: React.ElementType;
}

export function HeaderMenu({ Logo }: HeaderMenuProps) {
    const router = useRouter();
    return (
        <View style={s.container}>
            {Logo ? <Image source={Logo} style={s.logo} /> : null}

            <View style={s.containerIcons}>
                <TouchableOpacity
                    style={s.iconContainer}
                    onPress={() => router.push('/tv')}
                >
                    <FontAwesomeIcon icon={faTelevision} color={colors.white.default} size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={s.iconContainer}>
                    <FontAwesomeIcon icon={faBell} color={colors.white.default} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={s.iconContainer}
                    onPress={() => router.push('/profile')}
                >
                    <FontAwesomeIcon icon={faUser} color={colors.white.default} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    )
}