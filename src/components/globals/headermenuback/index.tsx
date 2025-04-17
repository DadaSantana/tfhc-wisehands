import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import ArrowLeftSolid from "@/assets/arrow-left-solid.svg";
import { Image } from "expo-image";

type HeaderMenuBackProps = {
    title: string;
    color?: string;
}

export function HeaderMenuBack({ title, color }: HeaderMenuBackProps) {
    const router = useRouter();
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingBottom: 28,
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
                    color: color || colors.green.light
                }}>
                    {title}
                </Text>
            </View>
        </View>
    )
}