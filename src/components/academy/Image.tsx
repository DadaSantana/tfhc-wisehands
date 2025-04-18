import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';


export default function ImageItem(props) {
    const { image } = props;
    const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={image}
        contentFit="cover"
        placeholder={blurhash}
        onError={() => console.log('Error loading image')}
        transition={1000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    
  },
  image: {
    flex: 1,
    width: 120,
    height: 120,
    backgroundColor: '#0553',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});