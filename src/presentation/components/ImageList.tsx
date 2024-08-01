import {Image, Text, View} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from '../theme/styles';

interface Props {
  images: {publicId: string; url: string}[];
}


export const ImageList = ({images}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList 
      data={images}
      keyExtractor={item => item.publicId}
      renderItem={({item}) => (
        <View style={{marginBottom:15, alignItems: 'center'}}>
          <Image source={{uri: item.url}} style={{width:200, height:200, borderRadius:10}} />
          <Text>{item.publicId}</Text>
        </View>
      )}
      />
    </View>
  );
};
