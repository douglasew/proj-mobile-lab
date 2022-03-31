import * as React from 'react'
import { Formik } from 'formik'
import { View, StyleSheet, SafeAreaView, ImageBackground } from 'react-native'
import { Text, Button, Input, Icon, Image } from 'react-native-elements'
import * as Yup from 'yup'
import backgroud from '../../../src/img/image-from-rawpixel-id-594508-jpeg.jpg'
import logo from '../../img/Black__Yellow_Museum_Logo.png'
import { useNavigation } from '@react-navigation/native'

interface RegisterScreenProps {}

const RegisterScreen = (props: RegisterScreenProps) => {
  const nav = useNavigation()

  const registrar = async (dados) => {
    console.log(dados)
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
            initialValues={{ nome: '', email: '', password: '' }}
            validationSchema={Yup.object({
              nome: Yup.string().required('Informe um nome'),
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
                <Input
                  placeholder="Seu nome"
                  onChangeText={handleChange('nome')}
                  onBlur={handleBlur('nome')}
                  style={styles.input}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
                />
                {touched.nome && errors.nome && (
                  <Text style={styles.erros}>{errors.nome}</Text>
                )}
                <Text style={styles.text}>E-MAIL</Text>
                <Input
                  placeholder="Seu e-mail"
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
                  placeholder="Crie uma senha"
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  style={styles.input}
                  inputContainerStyle={{ borderBottomWidth: 0 }}
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
                  onPress={() => nav.navigate('home')}
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
