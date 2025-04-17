import { colors } from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";
type props = {
    status: "Available" | "Unavailable";
}

export function Pill({ status }: props) {
    if (status === "Available") {
        return (
            <View style={{
                backgroundColor: "#12B76A",
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 6
            }}>
                <FontAwesome name="circle" size={10} color="#101828" />
                <Text
                    style={{
                        color: "#101828",
                        fontSize: 12,
                        fontWeight: "500"
                    }}
                >Disponível</Text>
            </View>
        )
    } else {
        return (
            <View style={{
                backgroundColor: colors.yellow,
                paddingTop: 4,
                paddingBottom: 4,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 6
            }}>
                <FontAwesome name="circle" size={10} color="#101828" />
                <Text
                    style={{
                        color: "#101828",
                        fontSize: 12,
                        fontWeight: "500"
                    }}
                >Em utilização</Text>
            </View>
        )
    }
};