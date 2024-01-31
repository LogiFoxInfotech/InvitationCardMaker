import { StatusBar } from 'expo-status-bar';
import { Button, Image, LogBox, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import Home from './src/screens/Home';
import { COLOR } from './src/common/color';
import { loadFonts } from './src/utils/useFonts';

export default function App() {
  const [image, setImage] = useState(null);
  LogBox.ignoreAllLogs()
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    loadFonts()
  },[])

  return (
    <View style={styles.container}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 100 }} />}
      <StatusBar style="auto" /> */}
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.infinity,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
