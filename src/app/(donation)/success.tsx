import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { useDonation } from '@/contexts/DonationContext';

export default function SuccessScreen() {
  const router = useRouter();
  const { category, amount, paymentMethod, resetDonation } = useDonation();
  
  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Inter_500Medium,
  });
  
  // Quando sair da tela, resetar o estado de doação
  useEffect(() => {
    return () => {
      resetDonation();
    };
  }, []);
  
  if (!fontsLoaded) {
    return null;
  }

  // Identifica o método de pagamento para exibição amigável
  const getPaymentMethodText = () => {
    switch (paymentMethod) {
      case 'apple':
        return 'Apple Pay';
      case 'google':
        return 'Google Pay';
      case 'credit':
        return 'Cartão de Crédito';
      case 'debit':
        return 'Cartão de Débito';
      default:
        return 'Método de Pagamento';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={40} color="#fff" />
        </View>
        <Text style={styles.title}>Obrigado pela Doação</Text>
        <Text style={styles.subtitle}>
          Sua contribuição de <Text style={styles.highlightText}>£{amount}</Text> para 
          <Text style={styles.highlightText}> {category}</Text> foi processada com sucesso 
          via {getPaymentMethodText()}.
        </Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Informações da Transação</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Valor:</Text>
            <Text style={styles.infoValue}>£{amount}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Categoria:</Text>
            <Text style={styles.infoValue}>{category}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Data:</Text>
            <Text style={styles.infoValue}>{new Date().toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.successStatus}>APROVADO</Text>
          </View>
        </View>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/home")}
        >
          <Text style={styles.buttonText}>Voltar para o Início</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat_700Bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.8,
    fontFamily: 'Inter_500Medium',
    lineHeight: 24,
  },
  highlightText: {
    color: '#FFB800',
    fontFamily: 'Montserrat_600SemiBold',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    marginBottom: 32,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoLabel: {
    color: '#fff',
    opacity: 0.7,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
  },
  successStatus: {
    color: '#00C853',
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
  },
  button: {
    backgroundColor: '#FFB800',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
}); 