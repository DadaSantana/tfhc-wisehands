import { Event } from '../types/events';

const API_URL = 'https://api.newton.jrinvestments.uk/api/Ticket/Events';

export interface EventsResponse {
  dateTime: string;
  status: string;
  msg: string;
  msgKey: string;
  result: Event[];
}

export const fetchEvents = async (token: string): Promise<EventsResponse> => {
  try {
    console.log(token);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 1,
        category: 1,
        token: token,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar eventos');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    throw error;
  }
}; 