import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

const FormScreen = ({ route, navigation }) => {
  const { photoUri } = route.params; // Receber o photoUri dos parâmetros da navegação
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    console.log('Name:', name);
    console.log('Birthday:', birthday);
    console.log('Address:', address);
    console.log('Photo URI:', photoUri); // Logar o photoUri para depuração

    if (name && birthday && address && photoUri) {
      // Convert the photo to Base64
      let base64Photo;
      try {
        base64Photo = await FileSystem.readAsStringAsync(photoUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      } catch (error) {
        alert('Failed to read photo file: ' + error.message);
        return;
      }

      // Create the payload
      const payload = {
        photo: base64Photo,
        name,
        birthday,
        address,
      };

      try {
        const response = await axios.post('https://4niaadnpgf.execute-api.af-south-1.amazonaws.com/photos', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          alert('Data submitted successfully!');
          navigation.navigate('Camera');
        } else {
          alert('Submission failed!');
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    } else {
      alert('Please fill all the fields!');
    }
  };

  return (
    <View style={styles.container}>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.photo} />}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Birthday"
        value={birthday}
        onChangeText={setBirthday}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  photo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#CFCFCF',
    color: '#52665A',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  
});

export default FormScreen;
