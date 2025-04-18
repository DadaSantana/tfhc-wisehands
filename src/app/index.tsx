import { View, Text, StyleSheet, Image, StatusBar, TextInput, Alert } from 'react-native';
import { colors } from '@/styles/colors';
import { Button } from '@/components/button';
import { AppleSignButton } from '@/components/applesignbutton';
import { GoogleAuthButton } from '@/components/googleauthbutton';
import React, { useState } from 'react';
import { securityServer } from '@/server/security-server';
import { useAuth } from '@/context/auth';
import { storeValueSecurely } from '@/secure/secureStore';

// Define the yellow color used in the image
const goldColor = '#FFC72C'; // Adjust this hex code if needed to match exactly

export default function App() {
    const [showUsernamePasswordInput, setShowUsernamePasswordInput] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const handleUsernamePasswordLogin = async () => {
        if (!auth || !auth.signIn) {
            console.error("Auth context or signIn function is not available.");
            Alert.alert("Erro", "Ocorreu um problema ao tentar fazer login. Tente novamente.");
            return;
        }
        if (!username || !password) {
            Alert.alert("Erro", "Por favor, preencha o usuário e a senha.");
            return;
        }
        const { signIn } = auth;
        setIsLoading(true);

        try {
            const params = { username, password };
            console.log("Calling securityServer.socialLogin with:", params);
            const response = await securityServer.socialLogin(params);
            console.log("Username/Password Login Response:", response);

            if (response && response.ID && response.Token) {
                const name = response.Nome || username;
                const userID = response.ID;
                const token = response.Token;
                const profile = {
                    photo: response?.Foto,
                    imageURL: response?.FotoURL,
                    catracaAudivel: response?.CatracaAudivel || "0"
                };

                storeValueSecurely("userLogin", username);
                storeValueSecurely("userToken", token);
                storeValueSecurely("userName", name);
                storeValueSecurely("userProfile", JSON.stringify(profile));

                signIn(userID, token, name, profile);
            } else {
                console.error("Login failed:", response);
                Alert.alert("Falha no Login", response?.Mensagem || "Usuário ou senha inválidos.");
            }
        } catch (error) {
            console.error("Error during username/password login:", error);
            Alert.alert("Erro", "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={'#000000'}
            />

            <View style={styles.content}>
                <Image
                    source={require('../assets/tfhc.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.buttonsContainer}>
                    {!showUsernamePasswordInput ? (
                        <>
                            <Button
                                style={styles.mainButton}
                                onPress={() => setShowUsernamePasswordInput(true)}
                            >
                                <Button.Title style={styles.mainButtonText}>
                                    Entrar
                                </Button.Title>
                            </Button>
                            <AppleSignButton title="Entrar com Google" />
                            <GoogleAuthButton title="Entrar com Apple" />
                        </>
                    ) : (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Usuário ou Email"
                                placeholderTextColor={colors.gray[400]}
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                placeholderTextColor={colors.gray[400]}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                            <Button onPress={handleUsernamePasswordLogin} isLoading={isLoading}>
                                <Button.Title>
                                    {isLoading ? "Entrando..." : "Confirmar Login"}
                                </Button.Title>
                            </Button>
                            <Button onPress={() => setShowUsernamePasswordInput(false)} style={styles.backButton}>
                                <Button.Title style={styles.backButtonText}>
                                    Voltar
                                </Button.Title>
                            </Button>
                        </>
                    )}
                </View>

                <View style={styles.poweredByContainer}>
                    <Text style={styles.poweredByText}>powered by</Text>
                    <Image
                        source={require('../assets/jr-logo.png')}
                        style={styles.jrLogo}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black.default,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '10%',
    },
    logo: {
        width: '80%',
        height: 100,
    },
    footer: {
        paddingBottom: 40,
        paddingHorizontal: '10%',
    },
    buttonsContainer: {
        gap: 12,
        marginBottom: 30,
    },
    mainButton: {
        backgroundColor: goldColor,
        borderRadius: 8,
    },
    mainButtonText: {
        color: colors.black.default,
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        height: 50,
        backgroundColor: colors.gray[900],
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: colors.white.default,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.gray[600]
    },
    backButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.gray[600],
    },
    backButtonText: {
        color: colors.white.default,
    },
    poweredByContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    poweredByText: {
        color: colors.gray[400],
        fontSize: 12,
    },
    jrLogo: {
        width: 100,
        height: 20,
    }
});