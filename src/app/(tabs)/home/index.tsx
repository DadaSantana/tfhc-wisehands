import { ScrollView, View } from "react-native";
import { Text } from "react-native";


import { s } from './styles';
import { HeaderMenu } from "@/components/globals/headermenu";
import { LastNews } from "@/components/globals/lastnews";
import { Functionalities } from "@/components/globals/functionalities";
import { AcademySection } from "@/components/globals/academysection";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function Home() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[s.container, { paddingTop: insets.top }]}>
            <StatusBar style="dark" />
            <View>
                <HeaderMenu Logo={require('@/assets/headermenu-icon.svg')} />
            </View>
            <ScrollView
                style={s.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.contentContainer}
            >
                <View style={s.lastNewsWrapper}>
                    <LastNews />
                </View>
                <Functionalities />
                <AcademySection />
            </ScrollView >
        </View >
        // </SafeAreaView>
        // </SafeAreaProvider>
    );
}