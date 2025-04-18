
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Animated, ViewToken, ImageBackground, ActivityIndicator } from 'react-native';


import { s } from './styles';
import { HeaderMenu } from "@/components/globals/headermenu";
import { LastNews } from "@/components/globals/lastnews";
import { Functionalities } from "@/components/globals/functionalities";
import { AcademySection } from "@/components/globals/academysection";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import BannerCarousel from '@/components/BannerCarousel';
import UpcomingActivities from '@/components/UpcomingActivities';
import { useEffect, useState } from 'react';
import { Event } from '@/types/events';
import { fetchEvents } from '@/services/events';
import { useAuth } from '@/context/auth';
export default function Home() {
    const auth = useAuth();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadEvents = async () => {
          setLoading(true);
          setError(null);
          try {
            const token = auth?.user.token;
            const response = await fetchEvents(token);
    
            const today = new Date();
            today.setHours(0, 0, 0, 0);
    
            const futureEvents = response.result.filter(event => {
              try {
                const year = parseInt(event.date.substring(0, 4), 10);
                const month = parseInt(event.date.substring(4, 6), 10) - 1;
                const day = parseInt(event.date.substring(6, 8), 10);
                const eventDate = new Date(year, month, day);
                eventDate.setHours(0, 0, 0, 0);
    
                return !isNaN(eventDate.getTime()) && eventDate >= today;
              } catch (e) {
                console.error(`Erro ao analisar data do evento ${event.id}: ${event.date}`, e);
                return false;
              }
            });
    
            futureEvents.sort((a, b) => {
              const dateA = `${a.date}${a.time.replace(':', '')}`;
              const dateB = `${b.date}${b.time.replace(':', '')}`;
              return dateA.localeCompare(dateB);
            });
    
            console.log(`Encontrados ${futureEvents.length} eventos futuros.`);
            setUpcomingEvents(futureEvents);
          } catch (err) {
            setError('Erro ao carregar eventos');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        loadEvents();
      }, []);

    const slides = [
        {
            id: 1,
            title: '',
            subtitle: '',
            image: require('@/assets/slide-01.png'),
        },
        {
            id: 2,
            title: '',
            subtitle: '',
            image: require('@/assets/slide-01.png'),
        }
    ];

    return (
        <SafeAreaView style={s.container} edges={['top']}>
            <ScrollView style={s.content}>
                <StatusBar style="dark" />
                <HeaderMenu Logo={require('@/assets/logo-header.png')} />
                <View style={s.headerContainer}>
                    <Text style={s.title}>NA CASA DO PAI,</Text>
                    <Text style={s.subtitle}>TEM LUGAR PARA TODOS!</Text>
                </View>
                <BannerCarousel slides={slides} />
                <Text style={s.sectionTitle}>Funcionalidades</Text>
                <View style={s.functionalitiesContainer}>
                    <TouchableOpacity
                        style={s.functionalityCard}
                        onPress={() => router.push("/(donation)")}
                    >
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0.9)', 'rgba(26, 26, 26, 0.95)']}
                            style={s.cardGradient}
                        >
                            <View style={s.cardHeader}>
                                <Image
                                    source={require('@/assets/offering.png')}
                                    style={s.functionalityIcon}
                                />
                                <Image
                                    source={require('@/assets/share.png')}
                                    style={s.shareIcon}
                                />
                            </View>
                            <Text style={s.functionalityTitle}>DÍZIMO{'\n'}OU OFERTA</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={s.functionalityCard}
                        onPress={() => router.push('/academy')}
                    >
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0.9)', 'rgba(26, 26, 26, 0.95)']}
                            style={s.cardGradient}
                        >
                            <View style={s.cardHeader}>
                                <Image
                                    source={require('@/assets/library.png')}
                                    style={s.functionalityIcon}
                                />
                                <Image
                                    source={require('@/assets/share.png')}
                                    style={s.shareIcon}
                                />
                            </View>
                            <Text style={s.functionalityTitle}>BIBLIOTECA</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={s.functionalityCard}
                        onPress={() => router.push("/(events)")}
                    >
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0.9)', 'rgba(26, 26, 26, 0.95)']}
                            style={s.cardGradient}
                        >
                            <View style={s.cardHeader}>
                                <Image
                                    source={require('@/assets/calendar.png')}
                                    style={s.functionalityIcon}
                                />
                                <Image
                                    source={require('@/assets/share.png')}
                                    style={s.shareIcon}
                                />
                            </View>
                            <Text style={s.functionalityTitle}>NOSSA{'\n'}AGENDA</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                {/*  <Functionalities />
                <AcademySection /> */}
                <UpcomingActivities
                    loading={loading}
                    error={error}
                    upcomingEvents={upcomingEvents}
                />
            </ScrollView>
        </SafeAreaView>
        // </SafeAreaProvider>
    );
}