import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const CameraScreen = () => {
  const navigation = useNavigation();
  const [photoUri, setPhotoUri] = useState(null);

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.cancelled) {
        setPhotoUri(result.uri);
        navigation.navigate('Form', { photoUri: result.uri }); // Passar o photoUri para o FormScreen
      }
    } catch (error) {
      console.log('Failed to take photo:', error);
      alert('Failed to take photo. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Photo" style={styles.button} onPress={takePhoto} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  
});

export default CameraScreen;
