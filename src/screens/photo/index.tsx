import * as ImagePicker from 'expo-image-picker'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Image } from 'react-native-elements'
import Toolbar from '../../components/toolbar'

interface PhotoProps {}

const Photo = (props: PhotoProps) => {
  const [image, setImage] = React.useState(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }
  return (
    <View style={styles.container}>
      <Toolbar title="Fotos" back={true} />

      <View style={styles.picture}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
        )}
      </View>
      <Button title="Escolha uma imagem na sua galeria" onPress={pickImage} />
    </View>
  )
}

export default Photo

const styles = StyleSheet.create({
  container: {},
  picture: {
    marginTop: 100,
    marginBottom: 100,
    alignItems: 'center',
  },
})
