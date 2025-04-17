import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
    signIn: (
        userId: string,
        token: string,
        name: string,
        profile: any
        // paid: boolean,
        // approved: boolean,
        // terms: boolean,
        // roles: string[],
    ) => void;
    signOut: () => void;
    user: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

function useProtectedRoute(user: any) {
    const router = useRouter();

    useEffect(() => {
        console.log("AuthContext: useProtectedRoute useEffect triggered. User state:", user);
        if (!user || !user.userId || !user.token) {
            router.replace("/");
        } else if (user) {
            router.replace("/home");
        }
        // Don't redirect if user is undefined (still loading)
    }, [user]);
}

interface User {
    userId: string;
    token: string;
    name: string;
    // paid: boolean;
    // approved: boolean;
    // terms: boolean;
    // roles: string[];
    profile: any;
}

interface ProviderProps {
    children: React.ReactNode;
}

export function Provider(props: ProviderProps) {
    const [user, setAuth] = useState<User | null | undefined>(undefined); // Use undefined for initial loading state
    const router = useRouter();

 // Load user data on mount
 useEffect(() => {
    async function loadUserData() {
        try {
            const userId = await SecureStore.getItemAsync("userLogin");
            const token = await SecureStore.getItemAsync("userToken");
            // Load other user data as needed
            
            if (userId && token) {
                // Retrieve other user data
                const name = await SecureStore.getItemAsync("userName") || "";
                const profileStr = await SecureStore.getItemAsync("userProfile");
                const profile = profileStr ? JSON.parse(profileStr) : null;
                
                setAuth({ userId, token, name, profile });
            } else {
                setAuth(null); // Explicitly set to null when no valid auth
            }
        } catch (error) {
            console.error("Failed to load auth data", error);
            setAuth(null);
        }
    }
    
    loadUserData();
}, []);

useProtectedRoute(user);

    const signOut = () => {
        GoogleSignin.signOut();
        SecureStore.deleteItemAsync("userLogin");
        SecureStore.deleteItemAsync("userToken");
        setAuth(null);
        router.replace("/");
    };

    return (
        <AuthContext.Provider
            value={{
                signIn: (userId, token, name, profile) =>
                    setAuth({ userId, token, name, profile }),
                signOut,
                user,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}