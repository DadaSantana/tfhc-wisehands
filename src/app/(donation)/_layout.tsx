import { Stack } from 'expo-router';
import { DonationProvider } from '@/contexts/DonationContext';

export default function DonationLayout() {
  return (
    <DonationProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="amount" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="success" />
      </Stack>
    </DonationProvider>
  );
} 