import { Platform } from 'react-native';

const API_URL = 'https://api.newton.jrinvestments.uk/api/Financial';
const AUTH_TOKEN = '65f6530e09e8dd2c04cfadbf4d7401';

interface CreateCustomerPayload {
  email: string;
  name: string;
  productName: string;
  productId: number;
  productPrice: number;
  metadata: string;
  production: string;
  country: string;
}

interface SetupIntentPayload {
  customerid: string;
}

interface ApiResponse {
  DateTime: string;
  Status: string;
  Msg: string;
  MsgKey: string;
  Result: string;
}

/**
 * Cria um cliente no Stripe para processar pagamentos
 */
export const createCustomer = async (payload: CreateCustomerPayload): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/CreatePaymentStripe`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar cliente');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
};

/**
 * Cria uma configuração de pagamento para o cliente
 */
export const createSetupIntent = async (customerId: string): Promise<ApiResponse> => {
  try {
    const payload: SetupIntentPayload = {
      customerid: customerId
    };

    const response = await fetch(`${API_URL}/CreateSetup`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar setup intent');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao criar setup intent:', error);
    throw error;
  }
};

/**
 * Cria uma intenção de pagamento para processar a doação
 */
export const createPaymentIntent = async (
  email: string,
  name: string,
  amount: number,
  category: string
): Promise<ApiResponse> => {
  try {
    const payload: CreateCustomerPayload = {
      email,
      name,
      productName: category || 'Dízimo',
      productId: 0,
      productPrice: amount,
      metadata: `Doação de ${amount} para ${category || 'Dízimo'}`,
      production: Platform.OS, // 'ios' ou 'android'
      country: 'UK'
    };

    const response = await fetch(`${API_URL}/CreatePaymentStripe`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar intenção de pagamento');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao criar intenção de pagamento:', error);
    throw error;
  }
}; 