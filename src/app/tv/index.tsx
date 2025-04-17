import { TvServer, Videos } from "@/server/tv-server";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { useRouter } from "expo-router";
import { colors } from "@/styles/colors";
import { HeaderMenuBack } from "@/components/globals/headermenuback";


export default function TV() {
    const router = useRouter();
    const [videos, setVideos] = useState<Videos[]>([]);
    const video = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [videoDimensions, setVideoDimensions] = useState({
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    });
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);



    async function getVideos() {
        try {
            const response = await TvServer.getTvVideos();
            if (response && response.result) {
                console.log("Videos: ", response.result);
                setVideos(response.result);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Play the video from the beginning
    const playFromStart = async () => {
        if (video.current) {
            await video.current.setPositionAsync(0); // Reset to the beginning
            await video.current.playAsync(); // Play the video
        }
    };

    // Handle video end and play the next one
    const handleVideoEnd = async () => {
        const nextIndex = currentVideoIndex + 1 < videos.length ? currentVideoIndex + 1 : 0;
        setCurrentVideoIndex(nextIndex);

        // Play the next video from the beginning
        setTimeout(() => {
            playFromStart();
        }, 200); // Slight delay to ensure video state is updated

        await video.current.dismissFullscreenPlayer(); // Sai do fullscreen
    };

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <HeaderMenuBack title="TV" color={colors.white.default} />
            {
                videos.length > 0 && videos[currentVideoIndex].url && (
                    <Video
                        ref={video}
                        style={{
                            width: videoDimensions.width,
                            height: videoDimensions.height,
                            flex: 1
                        }}
                        source={{ uri: videos[currentVideoIndex].url }} // Replace with your video URL

                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        shouldPlay
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                handleVideoEnd(); // Avança para o próximo vídeo
                            }
                        }}

                        onLoad={() => {
                            video.current?.presentFullscreenPlayer();
                        }}
                    />
                )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
});
