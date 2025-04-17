import * as SecureStore from 'expo-secure-store';

export const retrieveValueSecurely = async (key: string) => {
    try {
        const value = await SecureStore.getItemAsync(key);
        return value;
    } catch (error) {
        console.error('Failed to retrieve value:', error);
    }
};