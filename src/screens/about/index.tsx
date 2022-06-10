import * as React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
//import { Avatar, Image } from 'react-native-elements'
//import { Image } from 'react-native-elements'
import logo from '../../assets/images/Black__Yellow_Museum_Logo.png'
import Toolbar from '../../components/toolbar'

interface AboutProps {}

const About = (props: AboutProps) => {
  const APP_LOGO = Image.resolveAssetSource(logo).uri

  return (
    <View style={styles.container}>
      <Toolbar title="Sobre" back={true} />

      <View style={{ top: 100, alignItems: 'center' }}>
        <Image
          source={{
            uri: APP_LOGO,
          }}
          style={{ width: 200, height: 200 }}
        />

        <Text>1.0.0</Text>
        <Text>app desenvolvido por: Douglas Ewerton</Text>
      </View>
    </View>
  )
}

export default About

const styles = StyleSheet.create({
  container: {},
})
