import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera, CameraView, CameraType } from "expo-camera";
import { colors } from "@/styles/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/context/auth";
import { wiseBookServer } from "@/server/wisebook-server";
import { HeaderMenuBack } from "@/components/globals/headermenuback";
import { fontFamily } from "@/styles/font-family";
import ImageProofOfReturn from "@/assets/photo-proofofreturn.png";
import { Image } from "expo-image";

export default function ProofOfReturn() {
    const params = useLocalSearchParams();
    const [openCamera, setOpenCamera] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [cameraRef, setCameraRef] = useState(null);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const router = useRouter();
    const bookInfo = JSON.parse(params.bookInfo as string);
    const { user } = useAuth();

    const handleNextButton = async () => {

        const response = await wiseBookServer.uploadPhoto(photoUri, user.userId);
        const photoURL = response.result.URL;
        router.push({
            pathname: '/(tabs)/books/returnbook/confirmationreturn',
            params: {
                bookInfo: JSON.stringify(bookInfo),
                photoURLi: photoUri
            }
        });
    }

    function isPhotoUriEmpty() {
        return photoUri === null;
    }

    // Request Camera Permissions
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Handle Take Picture
    const takePicture = async () => {
        if (cameraRef) {
            const photo: CameraCapturedPicture = await cameraRef.takePictureAsync();
            setPhotoUri(photo.uri);
            console.log('Photo URI:', photo.uri);
            setOpenCamera(false);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission...</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.green.light }}>
            <HeaderMenuBack title="Wise Book" color={colors.white.default} />
            <View style={{
                flex: 1,
                paddingHorizontal: 16,
                paddingBottom: 24,
            }}>
                <View style={{
                    alignItems: 'center',
                }}>
                    <FontAwesome5
                        name="camera" size={34} color="white"
                        style={{ paddingBottom: 10 }}
                    />
                    <Text style={s.h1}>Foto para comparação</Text>
                </View>
                {!openCamera && isPhotoUriEmpty() && (
                    <View style={{
                        paddingVertical: 42
                    }}>
                        <Image source={ImageProofOfReturn} style={{
                            width: "100%",
                            height: 340,
                            borderRadius: 6,

                        }} />
                        <TouchableOpacity
                            onPress={() => setOpenCamera(true)}
                            style={s.button}
                        >
                            <Text style={s.buttonText}>Abrir câmera</Text>
                            <FontAwesome5 name="camera" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                )}

                {openCamera && (
                    <View style={{
                        flex: 1,
                        backgroundColor: colors.green.light,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <CameraView
                            style={{
                                flex: 1,
                                width: '100%',
                                marginTop: 42,
                                borderRadius: 6,
                            }}
                            facing={facing}
                            ref={(ref) => setCameraRef(ref)}
                        >
                            <View style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                margin: 20,
                                marginBottom: 50,
                                width: '100%',
                                justifyContent: 'center',
                            }}>
                                <TouchableOpacity
                                    style={s.buttonCamera}
                                    onPress={toggleCameraFacing}
                                >
                                    {/* <Text style={styles.text}>Flip</Text> */}
                                    <FontAwesome5 name="sync" size={20} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={s.buttonCamera} onPress={takePicture}>
                                    {/* <Text style={styles.text}>Snap</Text> */}
                                    <FontAwesome5 name="camera" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        </CameraView>
                        {/* {photoUri && (
                        <View style={styles.previewContainer}>
                            <Text style={styles.text}>Last photo: {photoUri}</Text>
                        </View>
                    )} */}
                    </View>
                )}

                {!isPhotoUriEmpty() && (
                    <>
                        <View style={{
                            flex: 1,
                            marginTop: 42,
                            borderRadius: 6,
                            width: '100%',
                        }}>
                            <Image source={{ uri: photoUri }} style={{
                                width: "100%",
                                height: 340,
                                borderRadius: 6,
                                // flex: 1,
                            }}
                                contentFit="cover"
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setPhotoUri(null)
                                    setOpenCamera(true)
                                }}
                                style={s.button}
                            >
                                <Text style={s.buttonText}>Refazer foto</Text>
                                <FontAwesome5 name="redo-alt" size={20} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style={{
                                    padding: 16,
                                    backgroundColor: colors.yellow,
                                    borderRadius: 9,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                }}
                                onPress={handleNextButton}
                            >
                                <Text
                                    style={{
                                        color: colors.green.light,
                                        fontFamily: fontFamily.inter700,
                                        fontSize: 16,
                                    }}
                                >
                                    Devolver livro
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    h1: {
        fontFamily: fontFamily.bold,
        fontWeight: 600,
        fontSize: 20,
        color: colors.white.white1
    },
    button: {
        backgroundColor: colors.green.dark2,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 25
    },
    buttonText: {
        fontFamily: fontFamily.inter700,
        fontSize: 16,
        color: colors.white.default,
        fontWeight: 700
    },
    buttonCamera: {
        flex: 0.3,
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        margin: 5,
    }
});