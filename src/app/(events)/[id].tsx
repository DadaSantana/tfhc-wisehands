import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Image, ActivityIndicator, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { ticketServer } from '@/server/ticket-server';
import { Event } from '@/types/events';
import { useAuth } from '@/context/auth';

const commentsData = [
  {
    id: 1,
    userName: 'Nome de Usuário',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod sed do eiusmod tempo consectetur adipiscing elit.',
    likes: 14,
  },
  {
    id: 2,
    userName: 'Nome de Usuário',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod sed do eiusmod tempo consectetur adipiscing elit.',
    likes: 0,
  }
];

export default function EventDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const auth = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentLikes, setCommentLikes] = useState(commentsData.map(comment => comment.likes));

  const handleCommentLike = (index: number) => {
    const newCommentLikes = [...commentLikes];
    newCommentLikes[index] = newCommentLikes[index] + 1;
    setCommentLikes(newCommentLikes);
  };

  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Montserrat_600SemiBold,
    Inter_500Medium,
  });

  useEffect(() => {
    const loadEvent = async () => {
      if (!auth?.user?.token) {
        setError('Usuário não autenticado ou token inválido.');
        setLoading(false);
        return;
      }
      
      const userToken = auth.user.token;

      try {
        console.log("Fetching events with token (using ticketServer):", userToken);
        const response = await ticketServer.getAllEvents(userToken);
        
        console.log("Response from ticketServer.getAllEvents:", response);

        if (response && Array.isArray(response.result)) {
          const foundDTO = response.result.find((dto: any) => dto.id === Number(id));

          if (foundDTO) {
            const mappedEvent: Event = {
              id: foundDTO.id,
              idcategory: foundDTO.idcategory,
              category: foundDTO.category,
              price: foundDTO.price,
              date: foundDTO.date,
              time: foundDTO.time,
              title: foundDTO.title,
              description: foundDTO.description,
              image: foundDTO.image,
              currency: foundDTO.currency,
              addressimage: foundDTO.addressimage,
              addressurl: foundDTO.addressurl,
              place: foundDTO.place,
              obs: foundDTO.obs,
              speaker: 'Palestrante não informado',
              status: foundDTO.status,
            };
            setEvent(mappedEvent);
          } else {
            setError('Evento não encontrado');
          }
        } else {
          console.error("Invalid response structure from ticketServer.getAllEvents", response);
          setError('Resposta inválida do servidor ao buscar evento.');
        }
      } catch (err) {
        setError('Erro ao carregar evento');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (fontsLoaded && auth !== undefined) {
      loadEvent();
    }
  }, [id, fontsLoaded, auth]);

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFB800" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Evento não encontrado'}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4C5B73" />
        </TouchableOpacity>
        <Text style={styles.title}>Eventos</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.mainCard}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>

          <View style={styles.eventInfo}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.infoText}>{event.place}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={20} color="#666" />
              <Text style={styles.infoText}>{event.speaker}</Text>
            </View>
          </View>

          <View style={styles.eventStats}>
            <View style={styles.statItem}>
              <Ionicons name="calendar-outline" size={20} color="#FFB800" />
              <Text style={styles.statText}>{formatDate(event.date)}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color="#FFB800" />
              <Text style={styles.statText}>{event.time}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="cash-outline" size={20} color="#FFB800" />
              <Text style={styles.statText}>{event.price} {event.currency}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailsGrid}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailLabel}>Palestrante</Text>
              <Text style={styles.detailValue}>{event.speaker}</Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailLabel}>Data</Text>
              <Text style={styles.detailValue}>{formatDate(event.date)}</Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailLabel}>Horário</Text>
              <Text style={styles.detailValue}>{event.time}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsGrid}>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailLabel}>Local</Text>
              <Text style={styles.detailValue}>{event.place}</Text>
            </View>
            <View style={styles.detailsColumn}>
              <Text style={styles.detailLabel}>Preço</Text>
              <Text style={styles.detailValue}>{event.price} {event.currency}</Text>
            </View>
          </View>

          {event.addressurl && (
            <>
              <View style={styles.divider} />
              <TouchableOpacity 
                style={styles.mapButton}
                onPress={() => {
                  if (event.addressurl) {
                    Linking.openURL(event.addressurl);
                  }
                }}
              >
                <Image 
                  source={{ uri: event.addressimage }} 
                  style={styles.mapImage}
                />
                <View style={styles.mapOverlay}>
                  <Text style={styles.mapText}>Ver no mapa</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <Text style={styles.notesTitle}>Notas</Text>
            <TouchableOpacity>
              <Ionicons name="open-outline" size={24} color="#4C5B73" />
            </TouchableOpacity>
          </View>

          <Text style={styles.emptyNote}>empty note</Text>

          <View style={styles.editButtonContainer}>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push('/(events)/notes')}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.plusButton}
              onPress={() => router.push('/(events)/notes')}
            >
              <Ionicons name="add" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.bottomButton} onPress={() => router.back()}>
        <Text style={styles.bottomButtonText}>Voltar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalBackButton}>
                <Ionicons name="arrow-back" size={24} color="#4C5B73" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Comentários</Text>
              <TouchableOpacity style={styles.modalSortButton}>
                <Ionicons name="menu-outline" size={24} color="#4C5B73" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.commentsList}>
              {commentsData.map((comment, index) => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <View style={styles.userInfo}>
                      <View style={styles.userAvatar}>
                        <Ionicons name="person" size={24} color="#fff" />
                      </View>
                      <Text style={styles.userName}>{comment.userName}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.commentContent}>
                    <Text style={styles.commentText}>{comment.comment}</Text>
                    <TouchableOpacity 
                      style={styles.replyButton}
                      onPress={() => {}}
                    >
                      <Text style={styles.replyButtonText}>Responder</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {index === 1 ? null : (
                    <View style={styles.commentFooter}>
                      <TouchableOpacity 
                        style={styles.likeButton} 
                        onPress={() => handleCommentLike(index)}
                      >
                        <Ionicons name="thumbs-up" size={20} color="#FFB800" />
                        <Text style={styles.likeCount}>{commentLikes[index]}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.modalBottomButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalBottomButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Manrope_600SemiBold',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  mainCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#000',
    marginBottom: 16,
  },
  eventDescription: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  eventInfo: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#000',
    marginLeft: 10,
  },
  eventStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#000',
  },
  detailsCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailsColumn: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
  mapButton: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    alignItems: 'center',
  },
  mapText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
  notesCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  notesTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#000',
  },
  emptyNote: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
  },
  editButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
    marginRight: 10,
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#000',
  },
  plusButton: {
    backgroundColor: '#f0f0f0',
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bottomButton: {
    backgroundColor: '#000',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_500Medium',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 60,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  modalBackButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Manrope_600SemiBold',
    textAlign: 'center',
    flex: 1,
  },
  modalSortButton: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  commentsList: {
    flex: 1,
    padding: 16,
  },
  commentItem: {
    marginBottom: 24,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFB800',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#000',
  },
  commentContent: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  replyButton: {
    alignSelf: 'flex-end',
  },
  replyButtonText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#333',
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 60,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  likeCount: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#000',
  },
  modalBottomButton: {
    backgroundColor: '#000',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalBottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_500Medium',
  },
}); 