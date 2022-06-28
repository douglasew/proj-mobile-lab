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

interface RegisterScreenProps {}

const RegisterScreen = (props: RegisterScreenProps) => {
  const nav = useNavigation<any>()
  const [passwordVisible, setPasswordVisible] = React.useState(true)

  const registrar = async (dados) => {
    console.log(dados)
    await api
      .post('/users', dados)
      .then((response) => {
        ToastAndroid.show('Conta criada com sucesso', 3000)
        nav.navigate('login')
      })
      .catch(() => ToastAndroid.show('O email já está em uso', 3000))
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
            initialValues={{ name: '', email: '', password: '' }}
            validationSchema={Yup.object({
              name: Yup.string().required('Informe um nome'),
              email: Yup.string()
                .required('Informe um email')
                .email('Email não é valido'),
              password: Yup.string()
                .required('Informe uma senha')
                .min(8, 'Senha invalida'),
            })}
            onSubmit={registrar}
          >
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              touched,
              errors,
              isValid,
              dirty,
            }) => (
              <View style={{ width: 350 }}>
                <Text style={styles.text}>NOME</Text>
                <TextInput
                  placeholder="Seu nome"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  mode="outlined"
                  theme={{ roundness: 10 }}
                />
                {touched.name && errors.name && (
                  <Text style={styles.erros}>{errors.name}</Text>
                )}
                <Text style={styles.text}>E-MAIL</Text>
                <TextInput
                  placeholder="Seu e-mail"
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
                  placeholder="Crie uma senha"
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
                  buttonStyle={{ backgroundColor: '#db504a', height: 50 }}
                  containerStyle={{
                    width: 150,
                    alignSelf: 'center',
                    top: 20,
                    borderRadius: 15,
                    shadowOffset: { width: -2, height: 4 },
                    shadowColor: '#171717',
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                  }}
                  title="CADASTRAR"
                  disabled={!(isValid && dirty)}
                  onPress={() => handleSubmit()}
                />
              </View>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: '5%',
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
