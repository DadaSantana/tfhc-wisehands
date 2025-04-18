import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Vimeo } from "react-native-vimeo-iframe";
import Video from 'react-native-video';
import styled from "styled-components/native";
import { useRouter } from "expo-router";

export default function AulasCard(props: any) {
  const router = useRouter();
  const { URL, isActive, title } = props;
  const isVideoVimeo = URL.includes("vimeo")
  const isVideo = URL.includes(".mp4") || URL.includes(".MP4");
  let contentPath = isVideoVimeo ? URL.split("/").pop() : { uri: URL };

  const queryParams = new URLSearchParams({
    info: JSON.stringify({ name: title }),
    contentPath: JSON.stringify(contentPath),
  });


  if (isVideo) {
    return (
      <AulasContainer>
        <Video
          source={{ uri: URL }}
          style={{ width: "100%", height: 230 }}
          controls={true}
        />
      </AulasContainer>
    )
  }

  return (
    <AulasContainer>
      {/* <Paragraph>{URL}</Paragraph> */}

      {isVideoVimeo ? (isActive ? (
        <Vimeo style={{ backgroundColor: "#1F2229" }} videoId={contentPath} />
      ) : (
        null
      )) : (
        <View style={styles.containerPdf}>
          <TouchableOpacity style={styles.button} onPress={() => router.push(`/academy/pdf/${title}?${queryParams.toString()}`)}>
            <Text style={styles.buttonText}>Abrir arquivo</Text>
          </TouchableOpacity>
          {/* <Pdf
            trustAllCerts={false}
            source={contentPath}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
            fitWidth={true}

          /> */}
        </View>
      )}
    </AulasContainer>
  );
}

const AulasContainer = styled.View`
  background-color: #1f2229;
  width: 100%;
  min-height: 230px;
`;

const Paragraph = styled.Text`
  color: white;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
  containerPdf: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  button: {
    backgroundColor: "#ff8500",
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
  }
});
