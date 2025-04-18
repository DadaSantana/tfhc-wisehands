import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Animated, ViewToken, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Inter_400Regular, useFonts as useInterFonts } from '@expo-google-fonts/inter';
import { Montserrat_600SemiBold, useFonts as useMontserratFonts } from '@expo-google-fonts/montserrat';

const { width } = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: any; // Ou o tipo específico da sua imagem, ex: ImageSourcePropType
}

interface BannerCarouselProps {
  slides: Slide[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ slides }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<FlatList<Slide>>(null); // Use FlatList aqui
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carregar fontes necessárias apenas para este componente
  const [montserratFontsLoaded] = useMontserratFonts({
    Montserrat_600SemiBold,
  });
  const [interFontsLoaded] = useInterFonts({
    Inter_400Regular,
  });

  const fontsLoaded = montserratFontsLoaded && interFontsLoaded;

  const viewableItemsChanged = useRef(({
    viewableItems
  }: {
    viewableItems: Array<ViewToken>;
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null && viewableItems[0].index !== undefined) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;


  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Auto-scroll
  useEffect(() => {
    if (!fontsLoaded || !slideRef.current) return; // Adicionado !slideRef.current

    const timer = setInterval(() => {
      // Verifica se slideRef.current existe antes de chamar scrollToIndex
      if (slideRef.current) {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= slides.length) {
          nextIndex = 0; // Volta para o início
        }
        // Verifica novamente se slideRef.current ainda existe antes de chamar
        if (slideRef.current) {
           slideRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, fontsLoaded, slides.length]); // Adicionado slides.length como dependência

  if (!fontsLoaded) {
    // Pode retornar um placeholder ou null enquanto as fontes carregam
    return null;
  }

  return (
    <View style={styles.bannerContainer}>
      <Animated.FlatList // Usar Animated.FlatList aqui
        ref={slideRef}
        data={slides}
        renderItem={({ item }) => (
          <ImageBackground
            source={item.image}
            style={styles.banner}
            imageStyle={styles.bannerImage} // Apply borderRadius here
          >

          </ImageBackground>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } // useNativeDriver: false é necessário para onScroll com Animated.event em FlatList horizontal se você está usando o valor para interpolações que afetam layout/não-transform props
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32} // Aumentar a frequência pode ser necessário para animações suaves baseadas em scroll
      />
      <View style={styles.pagination}>
        {slides.map((_, i) => {
           // Use scrollX para interpolação se estiver animando baseado no scroll
           const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
           const dotOpacity = scrollX.interpolate({
             inputRange,
             outputRange: [0.5, 1, 0.5],
             extrapolate: 'clamp',
           });
           const dotWidth = scrollX.interpolate({
             inputRange,
             outputRange: [8, 12, 8], // Exemplo: alarga o ponto ativo
             extrapolate: 'clamp',
           });

           // Use currentIndex para destacar o ponto ativo se a animação for baseada em estado
           const isActive = i === currentIndex;

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                { opacity: dotOpacity, width: dotWidth }, // Use interpolações se desejar
                isActive && styles.activeDot, // Override para o ponto ativo
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginBottom: 32,
  },
  banner: {
    width: width - 40, // Ajustado para corresponder ao padding de home.tsx
    height: 150,
    borderRadius: 16,
    overflow: 'hidden', // Garante que o conteúdo (gradient) respeite o borderRadius
    marginHorizontal: 0, // Remover margem se o FlatList já tiver o espaçamento correto
  },
  bannerImage: {
    borderRadius: 16, // Aplica borda arredondada à imagem de fundo
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    padding: 24,
    justifyContent: 'flex-end', // Alinha o texto na parte inferior
    borderRadius: 16, // Garante que o gradiente também tenha bordas arredondadas
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 4,
    textAlign: 'left',
  },
  bannerSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'left',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0', // Cinza claro para pontos inativos
  },
  activeDot: {
    backgroundColor: '#000000', // Preto para ponto ativo
    width: 12, // Exemplo: Ponto ativo pode ser mais largo
  },
});

export default BannerCarousel; 