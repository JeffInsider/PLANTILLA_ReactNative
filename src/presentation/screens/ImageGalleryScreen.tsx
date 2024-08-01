import { StackScreenProps } from '@react-navigation/stack';
import {Text, View} from 'react-native';
import { RootStackParamList } from '../routes/Navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ImageList } from '../components/ImageList';

interface Props extends StackScreenProps<RootStackParamList, 'ImageGallery'> {}

export const ImageGallery = ({navigation}: Props) => {
  const [images, setImages] = useState<{publicId: string; url: string}[]>([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await axios.get("https://localhost:7193/api/imagen");
        const data = await response.data();
        setImages(data);
        setLoad(false);
      } catch (error) {
        setError('No se pudo cargar las imagenes');
      }finally{
        setLoad(false);
      }
    }
    getImages();
  }, []);

  //comprobar si hay error
  if(error){
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, padding: 10, backgroundColor:'#fff'}}>
      <Text style={{fontSize:20, fontWeight:'bold', marginBottom: 10}}>Galería de Imágenes</Text>
      <ImageList images={images} />
    </View>
  );
};
