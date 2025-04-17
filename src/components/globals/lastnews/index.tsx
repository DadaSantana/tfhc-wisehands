// import { Image } from "expo-image";
import React from "react";
import { Dimensions, Text, View, Image } from "react-native";
// import { Image } from "expo-image";
import Carousel from 'react-native-reanimated-carousel';

import { s } from './styles';

const window = Dimensions.get('window');
const PAGE_WIDTH = window.width - 32;


export function LastNews() {
    const [isVertical, setIsVertical] = React.useState(false);
    const [isFast, setIsFast] = React.useState(false);

    const baseOptions = isVertical
        ? ({
            vertical: true,
            width: PAGE_WIDTH,
            height: PAGE_WIDTH / 2,
        } as const)
        : ({
            vertical: false,
            width: PAGE_WIDTH,
            height: PAGE_WIDTH / 2,
        } as const);

    return (
        <View style={s.container}>
            <View>
                <Text style={s.title}>Útimas Novidades</Text>
            </View>
            <Carousel
                {...baseOptions}
                loop
                autoPlay
                autoPlayInterval={3500}
                scrollAnimationDuration={2200}
                data={[...new Array(6).keys()]}
                renderItem={() => (
                    <View style={s.imageContainer}>
                        <Image source={require('@/assets/slide-01.png')} style={{ width: PAGE_WIDTH, height: '100%' }} />
                    </View>)}
                style={s.carousel}
            />
        </View>
    );
}