import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

import { s } from './styles';
import { useRouter } from "expo-router";

type FunctionalityProps = {
    icon: string;
    title: React.ReactNode;
}

function Functionality(props: FunctionalityProps) {
    return (
        <View style={s.functionalityContainer}>
            <Image source={props.icon} style={{ width: 21, height: 24 }} />
            <Text style={s.functionalityText}>{props.title}</Text>
        </View>
    );
}

export function Functionalities() {
    const router = useRouter();
    return (
        <View style={s.container}>
            <Text style={s.title}>Funcionalidades</Text>
            <View style={s.cards}>
                <TouchableOpacity style={s.card} onPress={() => router.push('/nfc')}>
                    <Functionality icon={require('@/assets/unlock-icon.svg')} title={<Text>Desbloquear Catraca</Text>} />
                </TouchableOpacity>
                <TouchableOpacity style={s.card} onPress={() => router.push('/ticketmanager/mytickets')}>
                    <Functionality icon={require('@/assets/ticket-icon.svg')} title={<Text>Meus{"\n"}Tickets</Text>} />
                </TouchableOpacity>
                <TouchableOpacity style={s.card} onPress={() => router.push('/books')}>
                    <Functionality icon={require('@/assets/book-icon.svg')} title={<Text>Wise{"\n"}Book</Text>} />
                </TouchableOpacity>
                <TouchableOpacity style={[s.card, { opacity: 0.4 }]}>
                    <Functionality icon={require('@/assets/people-icon.svg')} title={<Text>Wise{"\n"}Networking</Text>} />
                </TouchableOpacity>
            </View>
        </View>
    );
}