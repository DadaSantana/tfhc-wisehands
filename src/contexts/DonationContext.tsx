import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos
type DonationCategory = 'Dízimo' | 'Missões' | 'Ofertas' | 'Projetos Sociais';

interface DonationContextType {
  category: DonationCategory;
  amount: string; 
  email: string;
  name: string;
  paymentMethod: string;
  clientSecret: string;
  customerId: string;
  
  // Métodos para atualizar o contexto
  setCategory: (category: DonationCategory) => void;
  setAmount: (amount: string) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setPaymentMethod: (method: string) => void;
  setClientSecret: (secret: string) => void;
  setCustomerId: (id: string) => void;
  
  // Método para limpar os dados
  resetDonation: () => void;
  
  // Métodos para converter valores
  getAmountNumeric: () => number;
}

const defaultDonationContext: DonationContextType = {
  category: 'Dízimo',
  amount: '5,00',
  email: '',
  name: '',
  paymentMethod: 'credit',
  clientSecret: '',
  customerId: '',
  
  setCategory: () => {},
  setAmount: () => {},
  setEmail: () => {},
  setName: () => {},
  setPaymentMethod: () => {},
  setClientSecret: () => {},
  setCustomerId: () => {},
  resetDonation: () => {},
  getAmountNumeric: () => 0,
};

// Criação do contexto
const DonationContext = createContext<DonationContextType>(defaultDonationContext);

// Hook personalizado para usar o contexto
export const useDonation = () => useContext(DonationContext);

// Provedor do contexto
interface DonationProviderProps {
  children: ReactNode;
}

export const DonationProvider: React.FC<DonationProviderProps> = ({ children }) => {
  const [category, setCategory] = useState<DonationCategory>('Dízimo');
  const [amount, setAmount] = useState<string>('5,00');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('credit');
  const [clientSecret, setClientSecret] = useState<string>('');
  const [customerId, setCustomerId] = useState<string>('');
  
  // Função para converter o valor da string para número
  const getAmountNumeric = (): number => {
    // Converte o formato '10,00' para 10.00
    return parseFloat(amount.replace(',', '.'));
  };
  
  // Função para redefinir todos os valores
  const resetDonation = () => {
    setCategory('Dízimo');
    setAmount('5,00');
    setEmail('');
    setName('');
    setPaymentMethod('credit');
    setClientSecret('');
    setCustomerId('');
  };
  
  const value = {
    category,
    amount,
    email,
    name,
    paymentMethod,
    clientSecret,
    customerId,
    
    setCategory,
    setAmount,
    setEmail,
    setName,
    setPaymentMethod,
    setClientSecret,
    setCustomerId,
    resetDonation,
    getAmountNumeric,
  };
  
  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
}; 