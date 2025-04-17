import * as SecureStore from 'expo-secure-store';

export const storeValueSecurely = async (key: string, value: string) => {
    try {
        await SecureStore.setItemAsync(key, value);
        console.log('Value stored securely.');
    } catch (error) {
        console.error('Failed to store value:', error);
    }
};