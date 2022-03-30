import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as React from 'react'
import { StyleSheet, ImageBackground, View, SafeAreaView } from 'react-native'
import { Text, Button, Input, Icon, Image } from 'react-native-elements'
import * as Yup from 'yup'
import backgroud from '../../../src/img/image-from-rawpixel-id-594508-jpeg.jpg'
import logo from '../../img/Black__Yellow_Museum_Logo.png'

interface LoginProps {}

const Login = (props: LoginProps) => {
  const nav = useNavigation()

  const logar = async (dados) => {
    console.log(dados)

    if (dados.nome == 'teste') console.log('Logado com sucesso !!!!')
    else console.log('Email ou senha incorreto')
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
            {({ handleChange, handleSubmit, touched, handleBlur, errors }) => (
              <View style={{ width: 350 }}>
                <Text style={styles.text}>E-MAIL</Text>
                <Input
                  placeholder="Seu nome"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  style={styles.input}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                />
                {touched.email && errors.email && (
                  <Text style={styles.erros}>{errors.email}</Text>
                )}
                <Text style={styles.text}>SENHA</Text>
                <Input
                  placeholder="Seu e-mail"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  style={styles.input}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
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

export default Login

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 55,
    padding: 10,
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
    paddingLeft: 20,
    color: 'red',
  },
})
