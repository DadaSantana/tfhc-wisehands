import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { useDonation } from '@/contexts/DonationContext';

export default function AmountScreen() {
  const router = useRouter();
  const { category, amount, setAmount } = useDonation();
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Montserrat_600SemiBold,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const amounts = [
    { value: '5,00', label: '£5,00' },
    { value: '10,00', label: '£ 10,00' },
    { value: '20,00', label: '£ 20,00' },
    { value: '50,00', label: '£ 50,00' },
    { value: '100,00', label: '£ 100,00' },
    { value: '200,00', label: '£ 200,00' },
  ];

  const handleCustomAmount = () => {
    if (customAmount.trim() !== '') {
      const formattedAmount = customAmount.replace('.', ',');
      setAmount(formattedAmount);
      setShowCustomInput(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4C5B73" />
        </TouchableOpacity>
        <Text style={styles.title}>{category}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="wallet" size={32} color="#FFB800" />
        </View>
        <Text style={styles.sectionTitle}>SELECIONE A QUANTIA</Text>
        <Text style={styles.subtitle}>Escolha o valor da sua contribuição</Text>

        <View style={styles.amountsContainer}>
          <View style={styles.amountRow}>
            {amounts.slice(0, 3).map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[styles.amountButton, amount === item.value && styles.amountButtonSelected]}
                onPress={() => setAmount(item.value)}
              >
                <Text style={[styles.amountButtonText, amount === item.value && styles.amountButtonTextSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.amountRow}>
            {amounts.slice(3, 6).map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[styles.amountButton, amount === item.value && styles.amountButtonSelected]}
                onPress={() => setAmount(item.value)}
              >
                <Text style={[styles.amountButtonText, amount === item.value && styles.amountButtonTextSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {!showCustomInput ? (
          <TouchableOpacity 
            style={styles.customAmountButton}
            onPress={() => setShowCustomInput(true)}
          >
            <Text style={styles.customAmountText}>Outro valor</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.customInputContainer}>
            <Text style={styles.currencySymbol}>£</Text>
            <TextInput
              style={styles.customInput}
              placeholder="Digite um valor"
              keyboardType="numeric"
              value={customAmount}
              onChangeText={setCustomAmount}
              autoFocus
            />
            <TouchableOpacity 
              style={styles.confirmButton}
              onPress={handleCustomAmount}
            >
              <Text style={styles.confirmButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.infoContainer}>
          <View style={styles.infoHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#FFB800" />
            <Text style={styles.infoTitle}>Informações</Text>
          </View>
          <Text style={styles.infoText}>
            Você está contribuindo com {amount} libras para {category.toLowerCase()}.
            O valor será processado pela plataforma de pagamentos e estará disponível
            para a igreja em até 2 dias úteis.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={() => router.push('/(donation)/payment')}
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginBottom: 24,
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
  amountsContainer: {
    marginBottom: 24,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountButton: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  amountButtonSelected: {
    backgroundColor: '#000',
  },
  amountButtonText: {
    fontSize: 16,
    color: '#212525',
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  amountButtonTextSelected: {
    color: '#fff',
  },
  customAmountButton: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 24,
  },
  customAmountText: {
    color: '#FFB800',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 18,
    color: '#212525',
    marginRight: 8,
  },
  customInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#FFB800',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontFamily: 'Montserrat_600SemiBold',
  },
  infoContainer: {
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: 'rgba(33, 37, 37, 0.6)',
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
    fontWeight: '600',
  },
}); 