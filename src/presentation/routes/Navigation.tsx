import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ImageGallery } from '../screens/ImageGalleryScreen';
import { CamaraScreen } from '../screens/CamaraScreen';

export type RootStackParamList = {
    Home: undefined;
    ImageGallery: undefined;
    Camara: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      //se oculta el header en el stack
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImageGallery" component={ImageGallery} />
        <Stack.Screen name="Camara" component={CamaraScreen} />
    </Stack.Navigator>
  );
}
