import { Platform } from "react-native";
import * as Application from 'expo-application';
import { TextDecoder } from 'text-encoding';
import { useAuth } from "@/context/auth";
interface UserProfile {
    versionDev: string;
}

interface User {
    profile?: UserProfile;
}

export const isDevelopmentVersion = (): boolean => {
    const authContext = useAuth();
    const user = authContext ? authContext.user : undefined;

    const isDevelopmentVersion = user?.profile?.versionDev === Application.nativeApplicationVersion;

    const isIOS = Platform.OS === 'ios';

    console.log("isDevelopmentVersion: ", isDevelopmentVersion);
    console.log("isIOS: ", isIOS);
    console.log("user.profile.versionDev: ", user?.profile?.versionDev);
    console.log("Application.nativeApplicationVersion: ", Application.nativeApplicationVersion);

    return isDevelopmentVersion && isIOS;
};

export function decodeNFCPayload(payload: number[]) {
    // Convert payload array to Uint8Array
    const uint8Array = new Uint8Array(payload);

    // First byte is the language code length
    const langCodeLength = uint8Array[0];

    // Language code (not used here, but could be extracted if needed)
    const langCode = new TextDecoder().decode(uint8Array.slice(1, 1 + langCodeLength));

    // The rest is the text content
    const textContent = new TextDecoder().decode(uint8Array.slice(1 + langCodeLength));

    return textContent;
}