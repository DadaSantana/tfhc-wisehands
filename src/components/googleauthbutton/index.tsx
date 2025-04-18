import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@/configs/keys";
import { Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as Application from "expo-application";
import * as Device from "expo-device";

import { s } from './styles';
import { securityServer, SocialLoginParams } from "@/server/security-server";
import { storeValueSecurely } from "@/secure/secureStore";
import { useAuth } from "@/context/auth";

// Add a props interface to accept the title
interface GoogleAuthButtonProps {
    title?: string;
}

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    // scopes: ["https://www.googleapis.com/auth/drive.metadata.readonly"],
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    iosClientId: IOS_CLIENT_ID
});

export function GoogleAuthButton({ title = "Entrar com Google" }: GoogleAuthButtonProps) {
    const version = Application.nativeApplicationVersion;
    const device = Device.osName;
    const auth = useAuth();

    async function handleLogin(params: SocialLoginParams) {
        if (!auth || !auth.signIn) {
            console.error("Auth context or signIn function is not available.");
            return;
        }
        const { signIn } = auth;

        try {
            const response = await securityServer.socialLogin(params);
            if (!response) {
                return;
            }
            console.log("response:", response);
            // const { Usuario: userID, Senha: token, Nome: name, Pago: paid, Aprovado: approved, Termos: terms, Perfis: roles, Perfil: profile } = response;
            const name = response.Nome;
            const userID = response.ID;
            const token = response.Token;
            const profile = {
                photo: response?.Foto,
                imageURL: response?.FotoURL,
                catracaAudivel: response?.CatracaAudivel || "0"
            }
            // const paid = response.Paid ?? false;
            // router.replace('/home');
            storeValueSecurely("userLogin", response.Email);
            storeValueSecurely("userToken", token);
            console.log("AuthContext: Calling signIn with:", { userID, token, name, profile });
            signIn(userID, token, name, profile);
        } catch (error) {
            console.error(error);
        }
    }
    async function GoogleSignIn() {
        try {
            await GoogleSignin.hasPlayServices();
            const { data: userInfo } = await GoogleSignin.signIn();
            if (!userInfo) {
                return;
            }
            console.log("userInfor: ", userInfo);
            let params: SocialLoginParams = {
                email: userInfo?.user?.email,
                name: userInfo?.user.name ?? '',
                photo: userInfo?.user.photo ?? undefined,
                version: version || '',
                device: device || '',
            };
            await handleLogin(params);

        } catch (error) {
            if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("User cancelled the login flow");
            } else if ((error as any).code === statusCodes.IN_PROGRESS) {
                console.log("Operation (e.g. sign in) is in progress already");
            } else if ((error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("Play Services not available or outdated");
            } else {
                console.log("Something went wrong", error);
            }
        }
    }

    return (
        // <GoogleSigninButton
        //     style={{ width: 192, height: 48 }}
        //     size={GoogleSigninButton.Size.Wide}
        //     color={GoogleSigninButton.Color.Light}
        //     onPress={signIn}
        // />
        <TouchableOpacity
            style={s.container}
            onPress={GoogleSignIn}
        >
            <Image source={require('@/assets/google-icon.svg')} style={{ width: 22.635, height: 23 }} />
            <Text style={s.title}>{title}</Text>
        </TouchableOpacity>
    );
}