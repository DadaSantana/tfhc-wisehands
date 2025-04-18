import { useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Pdf from 'react-native-pdf';

export default function PdfViewer(props: any) {
    // const { info, contentPath } = useSearchParams();
    const { info, contentPath } = useLocalSearchParams();
    const infoString = Array.isArray(info) ? info[0] : info;
    const contentPathString = Array.isArray(contentPath) ? contentPath[0] : contentPath;
    const infoObj = infoString ? JSON.parse(infoString) : "";
    const contentPathObj = contentPathString ? JSON.parse(contentPathString) : "";

    if (contentPathObj && contentPathObj.uri) {
        contentPathObj.uri = encodeURI(contentPathObj.uri);
    }

    return (
        <View style={styles.containerPdf}>
            {contentPathObj.uri &&
                <Pdf
                    trustAllCerts={false}
                    source={contentPathObj}
                    onLoadComplete={(numberOfPages: number, filePath: string) => {
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page: number, numberOfPages: number) => {
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error: any) => {
                        console.log(error);
                    }}
                    onPressLink={(uri: string) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}
                    fitWidth={true}
                /> || <Text>PDF not found</Text>}
        </View>
    )
}

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
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 0,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});
