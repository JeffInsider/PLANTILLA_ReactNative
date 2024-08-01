import { StackScreenProps } from '@react-navigation/stack';
import {Button, Text, View} from 'react-native';
import { RootStackParamList } from '../routes/Navigation';

interface Props extends StackScreenProps<RootStackParamList, 'Home'> {}

export const HomeScreen = ({navigation}: Props) => {
  return (
    <View>
      <Button title="Tomar Foto" onPress={() => navigation.navigate('Camara')} />
      <Button title="Ver Galería" onPress={() => navigation.navigate('ImageGallery')} />
    </View>
  );
};
