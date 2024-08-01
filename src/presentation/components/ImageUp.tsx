import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Image, PermissionsAndroid, Platform, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';


interface Props {
  imageUp: () => void;
}

export const ImageUp = ({ imageUp }: Props) => {

  const camaraRef = useRef<RNCamera>(null);
  const [image, setImage] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      console.log("Requesting camera permission...");
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Permiso para usar la cámara",
              message: "Esta aplicación necesita acceso a la cámara",
              buttonNeutral: "Preguntar luego",
              buttonNegative: "Cancelar",
              buttonPositive: "Aceptar"
            }
          );
          console.log("Camera permission granted: ", granted);
          setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.warn(err);
        }
      } else {
        // Suponiendo que los permisos de la cámara siempre se conceden en iOS
        setHasPermission(true);
      }
    };

    requestCameraPermission();
  }, []);

  const takePicture = async () => {
    if (camaraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await camaraRef.current.takePictureAsync(options);
      setImage(data.uri);
    }
  }

  const uploadImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri: image
      });

      try {
        const response = await axios.post("https://localhost:7193/api/imagen", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status === 200) {
          Alert.alert('Exito', 'Imagen subida correctamente');
          imageUp();
        } else {
          Alert.alert('Error', 'No se pudo subir la imagen');
        }
      } catch (error) {
        Alert.alert('Error', "No se pudo subir la imagen");
      }
    }
  }

  if (!hasPermission) {
    return <View><Text>No se han concedido permisos para usar la cámara.</Text></View>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <RNCamera
        style={{ width: '100%', height: '80%', borderWidth: 2, borderColor: 'red', }} // Agregar borde para ver si está renderizado
        type={RNCamera.Constants.Type.back}
        ref={camaraRef}
      />
      {image && (
        <View style={{ margin: 10 }}>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
      )}
      <Button title="Tomar Foto" onPress={takePicture} />
      {image && <Button title="Subir Foto" onPress={uploadImage} />}
    </View>
  );
};
