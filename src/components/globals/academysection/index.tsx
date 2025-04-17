import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

import { s } from './styles';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { colors } from "@/styles/colors";


export function AcademySection() {
    return (
        <View style={s.container}>
            <Text style={s.title}>Academy</Text>
            <View style={s.buttonsContainer}>
                <TouchableOpacity style={s.button}>
                    <Image source={require('@/assets/buy-icon.png')} style={{ width: 26, height: 26 }} />
                    <Text style={s.buttonTitle}>Comprar Cursos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.button}>
                    <FontAwesomeIcon icon={faPlayCircle} size={24} color={colors.green.light} />
                    <Text style={s.buttonTitle}>Meus cursos</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 1,
                height: 150,
            }}>
                <Image
                    source={require('@/assets/academy-section.png')}
                    style={{
                        flex: 1,
                        width: "100%"
                    }}
                    contentFit="contain"
                    transition={1000}
                />
            </View>
        </View>
    );
}