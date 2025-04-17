import * as AppleAuthentication from 'expo-apple-authentication';
import { TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { securityServer, SocialLoginParams } from '@/server/security-server';
import * as Application from "expo-application";
import * as Device from "expo-device";

import { s } from './styles';
import { storeValueSecurely } from '@/secure/secureStore';
import { useAuth } from '@/context/auth';

export function AppleSignButton() {

    const version = Application.nativeApplicationVersion ?? undefined;
    const device = Device.osName ?? undefined;
    const authContext = useAuth();
    if (!authContext) {
        throw new Error('AuthContext is null');
    }
    const { signIn } = authContext;

    async function handleLogin(params: SocialLoginParams) {
        try {
            const response = await securityServer.socialLogin(params);
            if (!response) {
                return;
            }
            console.log("response:", response);

            const name = response.Nome;
            const userID = response.ID;
            const token = response.Token;
            const profile = {
                photo: response?.Foto,
                imageURL: response?.FotoURL,
                catracaAudivel: response?.CatracaAudivel || "0"
            }

            storeValueSecurely("userLogin", response.Email);
            storeValueSecurely("userToken", token);
            signIn(userID, token, name, profile);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAppleSignIn = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            console.log('Apple Credential:', credential);

            let params: SocialLoginParams = {};

            if (
                credential?.email === undefined ||
                credential?.fullName?.familyName === undefined
            ) {
                params = {
                    sub: credential?.user,
                    version,
                    device,
                };
            } else {
                params = {
                    email: credential.fullName.familyName ?? undefined,
                    name: `${credential.fullName.givenName} ${credential.fullName.familyName}`,
                    sub: credential.user,
                    version,
                    device,
                };
            }
            await handleLogin(params);

        } catch (error: any) {
            if (error.code === 'ERR_CANCELED') {
                console.log('User canceled the sign-in.');
            } else {
                console.error(error);
            }
        }
    };

    return (
        <TouchableOpacity
            style={s.container}
            onPress={handleAppleSignIn}
        >
            <Image source={require('@/assets/apple-icon.svg')} style={{ width: 24, height: 28 }} />
            <Text style={s.title}>Entrar com Apple</Text>
        </TouchableOpacity>
    );
}

