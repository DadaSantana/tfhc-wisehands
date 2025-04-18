import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { fetchEvents } from '@/services/events';
import { Event } from '@/types/events';
import { useAuth } from '@/context/auth';

type TabType = 'proximos' | 'todos' | 'compareci';

// Meses em português
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Dias da semana abreviados
const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export default function EventsScreen() {
  const auth = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('todos');
  
  // Inicializa com a data atual
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Montserrat_600SemiBold,
    Inter_500Medium,
  });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        // TODO: Obter o token do usuário logado
        const token = auth?.user.token;
        const response = await fetchEvents(token);
        setAllEvents(response.result);
        
        // Inicialmente filtra os eventos do mês atual
        filterEventsByMonth(response.result, currentMonth, currentYear);
      } catch (err) {
        setError('Erro ao carregar eventos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);
  
  // Filtrar eventos quando o mês ou ano mudar
  useEffect(() => {
    filterEventsByMonth(allEvents, currentMonth, currentYear);
  }, [currentMonth, currentYear, allEvents, activeTab]);
  
  // Função para filtrar eventos por mês
  const filterEventsByMonth = (events: Event[], month: number, year: number) => {
    // Formatação do mês para comparação (MM)
    const monthStr = (month + 1).toString().padStart(2, '0');
    const yearStr = year.toString();
    
    // Cria a data atual para comparação de datas
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    // Filtra eventos pelo mês e ano selecionados
    const filtered = events.filter(event => {
      const eventYear = event.date.substring(0, 4);
      const eventMonth = event.date.substring(4, 6);
      const eventDay = event.date.substring(6, 8);
      
      const eventDate = new Date(
        parseInt(eventYear),
        parseInt(eventMonth) - 1,
        parseInt(eventDay)
      );
      eventDate.setHours(0, 0, 0, 0);
      const eventTimestamp = eventDate.getTime();

      // Para a aba 'proximos', exibe eventos futuros independente do mês selecionado
      if (activeTab === 'proximos') {
        return eventTimestamp >= todayTimestamp;
      }
      
      // Para a aba 'todos', exibimos todos os eventos do mês selecionado
      if (activeTab === 'todos') {
        return eventYear === yearStr && eventMonth === monthStr;
      }
      
      // Para a aba 'compareci', mostramos eventos passados
      if (activeTab === 'compareci') {
        return eventTimestamp < todayTimestamp;
      }
      
      // Para outras abas, mantemos o filtro original por mês/ano
      return eventYear === yearStr && eventMonth === monthStr;
    });
    
    // Ordenar eventos por data e hora
    filtered.sort((a, b) => {
      // Primeiro compara por data
      const dateA = a.date;
      const dateB = b.date;
      
      if (dateA !== dateB) {
        return dateA.localeCompare(dateB);
      }
      
      // Se a data for a mesma, compara por hora
      return a.time.localeCompare(b.time);
    });
    
    setFilteredEvents(filtered);
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Obter dias da semana atual
  const renderCalendarDays = () => {
    // Cria uma data para o primeiro dia do mês
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    // Obtém o dia da semana do primeiro dia (0 = domingo, 1 = segunda, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Obtém o último dia do mês
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Encontrar a semana que contém o dia atual ou o dia selecionado
    let targetDay = selectedDay;
    let targetWeekStart;
    
    // Se estamos no mês atual, destacamos o dia atual
    const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;
    if (isCurrentMonth) {
      targetDay = today.getDate();
    }
    
    // Calcular o primeiro dia da semana (domingo) que contém o dia alvo
    targetWeekStart = new Date(currentYear, currentMonth, targetDay);
    const dayOfWeek = targetWeekStart.getDay(); // 0 para domingo, 1 para segunda, etc.
    targetWeekStart.setDate(targetDay - dayOfWeek); // Ajusta para domingo
    
    // Gerar os 7 dias da semana
    const weekDays = [];
    const currentDate = new Date(targetWeekStart);
    
    for (let i = 0; i < 7; i++) {
      const dayNum = currentDate.getDate();
      const dayMonth = currentDate.getMonth();
      const dayYear = currentDate.getFullYear();
      
      // Verifica se o dia está no mês atual
      const isCurrentMonthDay = dayMonth === currentMonth;
      
      // Verifica se é o dia atual
      const isToday = 
        dayNum === today.getDate() && 
        dayMonth === today.getMonth() && 
        dayYear === today.getFullYear();
      
      weekDays.push({
        day: dayNum,
        isCurrentMonth: isCurrentMonthDay,
        isToday: isToday,
        date: new Date(dayYear, dayMonth, dayNum)
      });
      
      // Avança para o próximo dia
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return (
      <View style={styles.calendarDaysContainer}>
        {WEEKDAYS.map((day, index) => (
          <Text key={`weekday-${index}`} style={styles.weekdayText}>
            {day}
          </Text>
        ))}
        
        {weekDays.map((dayInfo, index) => (
          <TouchableOpacity
            key={`day-${index}`}
            style={[
              styles.dayButton,
              !dayInfo.isCurrentMonth && styles.otherMonthDayButton,
              dayInfo.isToday && styles.todayButton,
              selectedDay === dayInfo.day && dayInfo.isCurrentMonth && styles.selectedDayButton
            ]}
            onPress={() => {
              if (dayInfo.isCurrentMonth) {
                setSelectedDay(dayInfo.day);
                
                // Obter a data formatada para o dia selecionado
                const selectedDateStr = 
                  `${currentYear}${(currentMonth + 1).toString().padStart(2, '0')}${dayInfo.day.toString().padStart(2, '0')}`;
                
                // Se estiver na aba "todos", filtra eventos para o dia selecionado
                if (activeTab === 'todos') {
                  const dayEvents = allEvents.filter(event => event.date === selectedDateStr);
                  setFilteredEvents(dayEvents);
                }
                // Para outras abas, mantém a lógica de filtragem da aba, mas atualiza o dia selecionado
                else {
                  filterEventsByMonth(allEvents, currentMonth, currentYear);
                }
              }
            }}
            disabled={!dayInfo.isCurrentMonth}
          >
            <Text 
              style={[
                styles.dayText,
                !dayInfo.isCurrentMonth && styles.otherMonthDayText,
                dayInfo.isToday && styles.todayText,
                selectedDay === dayInfo.day && dayInfo.isCurrentMonth && styles.selectedDayText
              ]}
            >
              {dayInfo.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const formatDate = (dateStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFB800" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4C5B73" />
        </TouchableOpacity>
        <Text style={styles.title}>Eventos</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'proximos' && styles.activeTab]}
          onPress={() => setActiveTab('proximos')}
        >
          <Text style={[styles.tabText, activeTab === 'proximos' && styles.activeTabText]}>
            Próximos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'todos' && styles.activeTab]}
          onPress={() => setActiveTab('todos')}
        >
          <Text style={[styles.tabText, activeTab === 'todos' && styles.activeTabText]}>
            Todos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'compareci' && styles.activeTab]}
          onPress={() => setActiveTab('compareci')}
        >
          <Text style={[styles.tabText, activeTab === 'compareci' && styles.activeTabText]}>
            Compareci
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'todos' && (
          <View style={styles.calendarContainer}>
            <View style={styles.monthHeader}>
              <View style={styles.monthYearContainer}>
                <Text style={styles.monthText}>{MONTHS[currentMonth]}</Text>
                <Text style={styles.yearText}>{currentYear}</Text>
              </View>
              <View style={styles.navigationButtons}>
                <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
                  <Ionicons name="chevron-back" size={24} color="#212525" />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
                  <Ionicons name="chevron-forward" size={24} color="#212525" />
                </TouchableOpacity>
              </View>
            </View>
            {renderCalendarDays()}
          </View>
        )}
        
        <Text style={styles.resultsTitle}>Resultados</Text>
        
        {filteredEvents.length === 0 ? (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>Não há eventos para o período selecionado</Text>
          </View>
        ) : (
          filteredEvents.map((event) => (
            <View key={event.id}>
              <Text style={styles.eventDateTime}>{event.time}</Text>
              <View style={styles.eventCard}>
                <View style={styles.eventContent}>
                  <View style={styles.eventHeader}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <TouchableOpacity onPress={() => router.push(`/(events)/${event.id}`)}>
                      <Ionicons name="open-outline" size={24} color="#4C5B73" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                  
                  <View style={styles.eventInfo}>
                    <View style={styles.infoRow}>
                      <Ionicons name="location-outline" size={20} color="#4C5B73" />
                      <Text style={styles.infoText}>{event.place}</Text>
                    </View>
                    <View style={styles.infoRow}>
                      <Ionicons name="person-outline" size={20} color="#4C5B73" />
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

                  {(() => {
                    const todayDate = new Date();
                    const todayYear = todayDate.getFullYear();
                    const todayMonth = todayDate.getMonth() + 1;
                    const todayDay = todayDate.getDate();
                    
                    const todayStr = `${todayYear}${todayMonth.toString().padStart(2, '0')}${todayDay.toString().padStart(2, '0')}`;
                    
                    if (event.date === todayStr) {
                      return (
                        <TouchableOpacity 
                          style={styles.enterButton}
                          onPress={() => router.push(`/(events)/${event.id}`)}
                        >
                          <Text style={styles.enterButtonText}>Entrar</Text>
                        </TouchableOpacity>
                      );
                    }
                    return null;
                  })()}
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.bottomButton} onPress={() => router.back()}>
        <Text style={styles.bottomButtonText}>Voltar</Text>
      </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  tab: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFB800',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#212525',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  calendarContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthYearContainer: {
    flex: 1,
  },
  monthText: {
    fontSize: 28,
    fontFamily: 'Manrope_600SemiBold',
    color: '#212525',
  },
  yearText: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    color: '#666',
  },
  navigationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: 8,
  },
  calendarDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weekdayText: {
    width: '14.28%',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
    color: '#999',
    fontFamily: 'Inter_500Medium',
  },
  dayButton: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  otherMonthDayButton: {
    opacity: 0.3,
  },
  selectedDayButton: {
    backgroundColor: '#FFB800',
    borderRadius: 8,
  },
  todayButton: {
    borderWidth: 2,
    borderColor: '#FFB800',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 18,
    fontFamily: 'Inter_500Medium',
    color: '#212525',
  },
  otherMonthDayText: {
    color: '#999',
  },
  selectedDayText: {
    color: '#fff',
  },
  todayText: {
    color: '#FFB800',
    fontWeight: 'bold',
  },
  resultsTitle: {
    fontSize: 24,
    fontFamily: 'Manrope_600SemiBold',
    marginBottom: 20,
  },
  noEventsContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  noEventsText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  eventDateTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    fontFamily: 'Inter_500Medium',
  },
  eventCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  eventContent: {
    padding: 16,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontFamily: 'Manrope_600SemiBold',
    color: '#212525',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontFamily: 'Inter_500Medium',
  },
  eventInfo: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#212525',
    marginLeft: 8,
    fontFamily: 'Inter_500Medium',
  },
  eventStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: '#212525',
    fontFamily: 'Inter_500Medium',
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
  },
  enterButton: {
    backgroundColor: '#FFB800',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 16,
  },
  enterButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    textAlign: 'center',
  },
}); 