import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { useDonation } from '@/contexts/DonationContext';

// Definição de tipo para garantir consistência
type DonationCategory = 'Dízimo' | 'Missões' | 'Ofertas' | 'Projetos Sociais';

// Categorias de doação disponíveis
const CATEGORIES = [
  { id: 'dizimo', label: 'Dízimo', value: 'Dízimo' as DonationCategory },
  { id: 'missoes', label: 'Missões', value: 'Missões' as DonationCategory },
  { id: 'ofertas', label: 'Ofertas', value: 'Ofertas' as DonationCategory },
  { id: 'projetos', label: 'Projetos Sociais', value: 'Projetos Sociais' as DonationCategory },
];

export default function DonationScreen() {
  const router = useRouter();
  const { category, setCategory } = useDonation();
  const [showCategories, setShowCategories] = useState(false);

  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Montserrat_600SemiBold,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Encontra a categoria selecionada
  const selectedCategory = CATEGORIES.find(c => c.value === category) || CATEGORIES[0];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4C5B73" />
        </TouchableOpacity>
        <Text style={styles.title}>Dízimo ou Oferta</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.dollarIcon}>$</Text>
        </View>
        <Text style={styles.sectionTitle}>SELECIONE A CATEGORIA</Text>
        <Text style={styles.subtitle}>Escolha o tipo de doação que deseja realizar</Text>

        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => setShowCategories(!showCategories)}
        >
          <Text style={styles.categoryText}>{selectedCategory.label}</Text>
          <Ionicons 
            name={showCategories ? "chevron-up" : "chevron-down"} 
            size={24} 
            color="#FFF" 
          />
        </TouchableOpacity>

        {showCategories && (
          <View style={styles.categoriesDropdown}>
            {CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.categoryOption,
                  category === item.value && styles.categoryOptionSelected,
                ]}
                onPress={() => {
                  setCategory(item.value);
                  setShowCategories(false);
                }}
              >
                <Text 
                  style={[
                    styles.categoryOptionText,
                    category === item.value && styles.categoryOptionTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#FFB800" />
            <Text style={styles.infoTitle}>Informações</Text>
          </View>
          <Text style={styles.infoText}>
            {category === 'Dízimo' && 'O dízimo é uma forma bíblica de contribuição que representa 10% de seus ganhos doados para o sustento do trabalho da igreja.'}
            {category === 'Missões' && 'Sua contribuição para missões ajuda a financiar o trabalho missionário no Brasil e no exterior, levando a palavra de Deus a novos lugares.'}
            {category === 'Ofertas' && 'As ofertas são contribuições livres que complementam o dízimo e ajudam a igreja a manter suas atividades e projetos.'}
            {category === 'Projetos Sociais' && 'Sua doação para projetos sociais ajuda no trabalho de assistência a pessoas carentes e em situação de vulnerabilidade.'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push('/(donation)/amount')}
        >
          <Text style={styles.nextButtonText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    padding: 24,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  dollarIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#212525',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: 'rgba(33, 37, 37, 0.6)',
    marginBottom: 32,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat_600SemiBold',
  },
  categoriesDropdown: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  categoryOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryOptionSelected: {
    backgroundColor: '#f0f0f0',
  },
  categoryOptionText: {
    fontSize: 16,
    color: '#212525',
    fontFamily: 'Inter_500Medium',
  },
  categoryOptionTextSelected: {
    color: '#000',
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#212525',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Inter_500Medium',
    color: 'rgba(33, 37, 37, 0.7)',
  },
  nextButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat_600SemiBold',
  },
}); 