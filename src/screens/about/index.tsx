import * as React from 'react'
import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import logo from '../../assets/images/Black__Yellow_Museum_Logo.png'
import Toolbar from '../../components/toolbar'

interface AboutProps {}

const About = (props: AboutProps) => {
  const APP_LOGO = Image.resolveAssetSource(logo).uri

  return (
    <>
      <Toolbar title="Sobre" back={true} />
      <View style={styles.container}>
        <View style={{ top: 100, alignItems: 'center' }}>
          <Image
            source={{
              uri: APP_LOGO,
            }}
            style={{ width: 200, height: 200 }}
          />
          <Text>1.0.5</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text>App desenvolvido por: </Text>
            <Text
              style={{ color: 'blue', fontWeight: 'bold' }}
              onPress={() => Linking.openURL('https://github.com/douglasew')}
            >
              @douglasew
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    top: 14,
  },
})
