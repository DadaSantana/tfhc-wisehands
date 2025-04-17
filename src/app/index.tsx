import { View, Text, ImageBackground, StyleSheet, Image, StatusBar, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/colors';
import { Button } from '@/components/button';
import { AppleSignButton } from '@/components/applesignbutton';
import { GoogleAuthButton } from '@/components/googleauthbutton';
import React, { useState } from 'react';
import { securityServer } from '@/server/security-server';
import { useAuth } from '@/context/auth';
import { storeValueSecurely } from '@/secure/secureStore';

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
        <ImageBackground
            source={require('../assets/login-bg.png')}
            style={styles.background}
        >
            {/* <StatusBar
                backgroundColor={colors.white}
            /> */}
            <LinearGradient
                colors={['rgba(45, 45, 45, 0)', '#083B41']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}
            >
                <View style={{
                    flex: 1,
                }}>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={require('../assets/logo.png')}
                        />
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    {!showUsernamePasswordInput ? (
                        <>
                            <Button onPress={() => setShowUsernamePasswordInput(true)}>
                                <Button.Title>
                                    Entrar com Email
                                </Button.Title>
                            </Button>
                            <AppleSignButton />
                            <GoogleAuthButton />
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
                            <Button onPress={() => setShowUsernamePasswordInput(false)}>
                                <Button.Title>
                                    Voltar
                                </Button.Title>
                            </Button>
                        </>
                    )}
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonsContainer: {
        paddingBottom: 82,
        paddingLeft: "10%",
        paddingRight: "10%",
        gap: 8,
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
    }
});