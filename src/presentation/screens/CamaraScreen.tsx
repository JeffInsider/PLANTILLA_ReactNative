import { StackScreenProps } from '@react-navigation/stack';
import {Text, View} from 'react-native';
import { RootStackParamList } from '../routes/Navigation';
import { ImageUp } from '../components/ImageUp';

interface Props extends StackScreenProps<RootStackParamList, 'Camara'> {}

export const CamaraScreen = ({navigation}: Props) => {

  const handleUpload = () => {
    navigation.navigate('ImageGallery');
  }

  return (
    <View>
      <Text style={{color:'black'}}>CamaraScreen</Text>
      <ImageUp imageUp={handleUpload} />
    </View>
  );
};
