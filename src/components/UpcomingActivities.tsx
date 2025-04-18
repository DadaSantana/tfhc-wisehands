import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Event } from '@/types/events'; // Ajustar o caminho se necessário
import {
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
} from '@expo-google-fonts/montserrat'; // Presume que fontes estão carregadas no App

interface UpcomingActivitiesProps {
  loading: boolean;
  error: string | null;
  upcomingEvents: Event[];
}

const UpcomingActivities: React.FC<UpcomingActivitiesProps> = ({
  loading,
  error,
  upcomingEvents,
}) => {
  const router = useRouter();

  return (
    <View style={styles.activitiesSection}>
      <Text style={styles.sectionTitle}>Próximas Atividades</Text>
      {/* <View style={styles.activitiesHeader}>
        <Text style={styles.today}>PRÓXIMOS EVENTOS</Text>
        <TouchableOpacity onPress={() => router.push("/(events)")}>
          <Text style={styles.event}>VER TODOS</Text>
        </TouchableOpacity>
      </View> */}

      {loading ? (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="small" color="#FFB800" />
        </View>
      ) : error ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{error}</Text>
        </View>
      ) : upcomingEvents.length === 0 ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Não há próximos eventos agendados</Text>
        </View>
      ) : (
        // Limitar a 3 eventos como antes
        upcomingEvents.slice(0, 3).map((event) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          let isToday = false;
          let displayDate = event.date; // Default to original format

          try {
            const year = parseInt(event.date.substring(0, 4), 10);
            const month = parseInt(event.date.substring(4, 6), 10) - 1;
            const day = parseInt(event.date.substring(6, 8), 10);
            const eventDate = new Date(year, month, day);
            eventDate.setHours(0, 0, 0, 0);

            if (!isNaN(eventDate.getTime())) { // Check if date is valid
                 isToday = eventDate.getTime() === today.getTime();
                 // Format date for display if not today
                 if (!isToday) {
                    displayDate = `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}`;
                 }
            }
          } catch (e) {
              console.error("Error parsing event date in UpcomingActivities:", e);
              // Keep default displayDate if parsing fails
          }


          return (
            <TouchableOpacity
              key={event.id}
              style={styles.activityContainer}
              onPress={() => router.push(`/(events)/${event.id}`)}
            >
              <View style={styles.activityTime}>
                <Text style={styles.timeText}>{isToday ? event.time : displayDate}</Text>
              </View>
              <View style={styles.activityCard}>
                <View style={styles.eventCardHeader}>
                  <Text style={styles.activityTitle}>{event.title}</Text>
                  <Image
                    source={require('@/assets/share.png')} // Caminho ajustado
                    style={styles.eventShareIcon}
                  />
                </View>
                <Text style={styles.activityDescription} numberOfLines={2}>
                  {event.description}
                </Text>
                <Text style={styles.activityLocation}>{event.place}</Text>
                <View style={styles.activityUser}>
                  <Image
                    source={{ uri: event.speaker_photo || undefined }}
                    style={styles.userIcon}
                    defaultSource={require('@/assets/user-outline.png')} // Caminho ajustado
                  />
                  <Text style={styles.userName}>{event.speaker}</Text>
                </View>

                {isToday && (
                  <TouchableOpacity
                    style={styles.enterButton}
                    onPress={() => router.push(`/(events)/${event.id}`)}
                  >
                    <Text style={styles.enterButtonText}>Entrar</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
};

// Copiar estilos relevantes de home.tsx
const styles = StyleSheet.create({
    activitiesSection: {
        marginBottom: 24,
      },
      sectionTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat_500Medium',
        color: '#000000',
        marginBottom: 16,
      },
      activitiesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        alignItems: 'center',
      },
      today: {
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
        color: '#000000',
        marginLeft: 0,
      },
      event: {
        fontSize: 14,
        fontFamily: 'Montserrat_500Medium',
        color: '#FFB800',
      },
      activityContainer: {
        flexDirection: 'row',
        marginBottom: 16,
      },
      activityTime: {
        marginRight: 12,
        paddingTop: 4,
        width: 50,
        alignItems: 'center',
      },
      timeText: {
        fontSize: 14,
        fontFamily: 'Montserrat_600SemiBold',
        color: 'rgba(33, 37, 37, 0.8)',
      },
      activityCard: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.00,
        elevation: 2,
      },
      eventCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
      },
      activityTitle: {
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold',
        color: '#212525',
        flex: 1,
        marginRight: 8,
      },
      eventShareIcon: {
        width: 20,
        height: 20,
        tintColor: '#888888',
      },
      activityDescription: {
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        color: '#444444',
        marginBottom: 12,
        lineHeight: 20,
      },
      activityLocation: {
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        color: '#666666',
        marginBottom: 12,
      },
      activityUser: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      userIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
        borderRadius: 12,
      },
      userName: {
        fontSize: 14,
        fontFamily: 'Montserrat_500Medium',
        color: '#212525',
      },
      messageContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        marginTop: 10,
        minHeight: 100,
      },
      messageText: {
        fontSize: 15,
        color: '#555',
        // Tentativa de usar fonte Montserrat, se falhar, usará default
        fontFamily: 'Montserrat_400Regular', 
        textAlign: 'center',
      },
      enterButton: {
        backgroundColor: '#FFB800',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginTop: 12,
      },
      enterButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Montserrat_600SemiBold',
        textAlign: 'center',
      },
});

export default UpcomingActivities; 