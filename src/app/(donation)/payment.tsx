import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { useDonation } from '@/contexts/DonationContext';
import { createPaymentIntent } from '@/services/payments';

export default function PaymentScreen() {
  const router = useRouter();
  const { 
    category, 
    amount, 
    setPaymentMethod, 
    paymentMethod, 
    setClientSecret,
    setCustomerId,
    getAmountNumeric
  } = useDonation();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [fontsLoaded] = useFonts({
    Manrope_600SemiBold,
    Montserrat_600SemiBold,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const amountValue = getAmountNumeric();

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      
      // Usando email e nome fixos para demonstração
      // Em produção, esses dados viriam do contexto de autenticação do usuário
      const userEmail = "usuario@example.com";
      const userName = "Usuário Teste";
      
      // Criar intenção de pagamento no Stripe
      const response = await createPaymentIntent(
        userEmail,
        userName,
        amountValue,
        category
      );
      
      if (response.Status === "OK" && response.Result) {
        // Aqui teríamos o clientSecret do Stripe para processar o pagamento
        // Em uma implementação completa, usaríamos algo como react-native-stripe-sdk
        setClientSecret(response.Result);
        setCustomerId(response.Result); // Apenas para exemplo
        
        // Em uma implementação real, abriríamos o formulário de pagamento do Stripe
        // E somente após confirmação, navegaríamos para a tela de sucesso
        router.push('/(donation)/success');
      } else {
        Alert.alert(
          'Erro no Pagamento',
          response.Msg || 'Não foi possível processar o pagamento. Tente novamente.'
        );
      }
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      Alert.alert(
        'Erro no Pagamento',
        'Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente mais tarde.'
      );
    } finally {
      setIsProcessing(false);
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
          <Ionicons name="card" size={24} color="#FFB800" />
        </View>
        <Text style={styles.sectionTitle}>PAGAMENTO</Text>
        <Text style={styles.subtitle}>Escolha a forma de pagamento</Text>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>£{amount}</Text>
        </View>

        <TouchableOpacity 
          style={[styles.paymentOption, paymentMethod === 'google' && styles.paymentOptionSelected]}
          onPress={() => setPaymentMethod('google')}
        >
          <View style={styles.paymentIconContainer}>
            <Text style={[styles.googleIcon, paymentMethod === 'google' && { color: '#fff' }]}>G</Text>
          </View>
          <Text style={[styles.paymentText, paymentMethod === 'google' && styles.paymentTextSelected]}>
            Pagar com Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.paymentOption, paymentMethod === 'apple' && styles.paymentOptionSelected]}
          onPress={() => setPaymentMethod('apple')}
        >
          <View style={styles.paymentIconContainer}>
            <Ionicons 
              name="logo-apple" 
              size={24} 
              color={paymentMethod === 'apple' ? "white" : "black"} 
            />
          </View>
          <Text style={[styles.paymentText, paymentMethod === 'apple' && styles.paymentTextSelected]}>
            Pagar com Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.paymentOption, paymentMethod === 'credit' && styles.paymentOptionSelected]}
          onPress={() => setPaymentMethod('credit')}
        >
          <View style={styles.paymentIconContainer}>
            <Ionicons 
              name="card-outline" 
              size={24} 
              color={paymentMethod === 'credit' ? "white" : "black"} 
            />
          </View>
          <Text style={[styles.paymentText, paymentMethod === 'credit' && styles.paymentTextSelected]}>
            Cartão de Crédito
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.paymentOption, paymentMethod === 'debit' && styles.paymentOptionSelected]}
          onPress={() => setPaymentMethod('debit')}
        >
          <View style={styles.paymentIconContainer}>
            <Ionicons 
              name="card-outline" 
              size={24} 
              color={paymentMethod === 'debit' ? "white" : "black"} 
            />
          </View>
          <Text style={[styles.paymentText, paymentMethod === 'debit' && styles.paymentTextSelected]}>
            Cartão de Débito
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.nextButton, isProcessing && styles.disabledButton]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.nextButtonText}>Pagar</Text>
          )}
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
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    color: '#212525',
    fontFamily: 'Montserrat_600SemiBold',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212525',
    fontFamily: 'Montserrat_600SemiBold',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
  },
  paymentOptionSelected: {
    backgroundColor: '#000',
  },
  paymentIconContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentText: {
    fontSize: 16,
    color: '#212525',
    fontFamily: 'Inter_500Medium',
  },
  paymentTextSelected: {
    color: '#fff',
  },
  nextButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 'auto',
    justifyContent: 'center',
    minHeight: 60,
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Montserrat_600SemiBold',
  },
}); 