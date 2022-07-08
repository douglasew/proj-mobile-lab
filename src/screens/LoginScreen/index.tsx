import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as React from 'react'
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native'
import { Button, Image, Text } from 'react-native-elements'
import { TextInput } from 'react-native-paper'
import * as Yup from 'yup'
import logo from '../../assets/images/Black__Yellow_Museum_Logo.png'
import backgroud from '../../assets/images/image-from-rawpixel-id-594508-jpeg.jpg'
import api from '../../libs/api'

interface LoginScreenProps {}

const LoginScreen = (props: LoginScreenProps) => {
  const nav = useNavigation<any>()
  const [passwordVisible, setPasswordVisible] = React.useState(true)

  const logar = async (dados) => {
    await api
      .post('/login', dados)
      .then((response) => {
        AsyncStorage.setItem('jwt', response.data.token)
        nav.navigate('app')
      })
      .catch(() => ToastAndroid.show('Email ou senha incorreta', 3000))
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={backgroud} style={styles.background}>
        <View style={styles.container}>
          <Image
            source={logo}
            containerStyle={{
              width: 250,
              height: 250,
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .required('Informe um email')
                .email('Email não é valido'),
              password: Yup.string()
                .required('Informe uma senha')
                .min(8, 'Senha invalida'),
            })}
            onSubmit={logar}
          >
            {({
              handleChange,
              handleSubmit,
              touched,
              handleBlur,
              errors,
              isValid,
              dirty,
            }) => (
              <View style={{ width: 350 }}>
                <Text style={styles.text}>E-MAIL</Text>
                <TextInput
                  placeholder="Seu email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  mode="outlined"
                  theme={{ roundness: 10 }}
                />
                {touched.email && errors.email && (
                  <Text style={styles.erros}>{errors.email}</Text>
                )}
                <Text style={styles.text}>SENHA</Text>
                <TextInput
                  placeholder="Sua senha"
                  secureTextEntry={passwordVisible}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  mode="outlined"
                  theme={{ roundness: 10 }}
                  right={
                    <TextInput.Icon
                      name={passwordVisible ? 'eye' : 'eye-off'}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  }
                />
                {touched.password && errors.password && (
                  <Text style={styles.erros}>{errors.password}</Text>
                )}
                <Button
                  buttonStyle={{ backgroundColor: '#56a3a6', height: 50 }}
                  containerStyle={{
                    width: 150,
                    alignSelf: 'center',
                    top: 20,
                    borderRadius: 15,
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: '#gray',
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                  }}
                  title="ACESSAR"
                  disabled={!(isValid && dirty)}
                  onPress={() => handleSubmit()}
                />
                <Button
                  buttonStyle={{ backgroundColor: '#db504a', height: 50 }}
                  containerStyle={{
                    width: 150,
                    alignSelf: 'center',
                    top: 40,
                    borderRadius: 15,
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: 'gray',
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                  }}
                  onPress={() => nav.navigate('register')}
                  title="CADASTRAR"
                />
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    color: 'gray',
    padding: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  erros: {
    paddingLeft: 10,
    color: 'red',
  },
})
