import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import * as React from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { TextInput } from 'react-native-paper'
import * as Yup from 'yup'
import Toolbar from '../../components/toolbar'
import api from '../../libs/api'
import { User } from '../../model/users'
interface AccountProps {}

const Account = (props: AccountProps) => {
  const nav = useNavigation<any>()
  const [photo, setPhoto] = React.useState(null)
  const [user, setuser] = React.useState<User[]>([])
  const [passwordVisible, setPasswordVisible] = React.useState(true)

  React.useEffect(() => {
    nav.addListener('focus', async () => {
      var user_id = await AsyncStorage.getItem('user_id')

      api.get(`/users/${user_id}`).then((response) => setuser(response.data))
    })
  }, [])

  const updateImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.2,
      base64: true,
    })

    if (!result.cancelled) {
      //setPhoto(result.base64)

      var user_id = await AsyncStorage.getItem('user_id')

      api
        .put(`/users/photo/${user_id}`, { photo: result.base64 })
        .then(() => {
          ToastAndroid.show('Foto atualizada', 3000)
          nav.navigate('home')
        })
        .catch(() =>
          ToastAndroid.show('Não foi possivel conectar ao servidor', 3000)
        )
    }
  }

  const update = async (dados) => {
    var user_id = await AsyncStorage.getItem('user_id')

    api
      .put(`/users/${user_id}`, dados)
      .then(() => {
        ToastAndroid.show('Atualizado com sucesso', 3000)
        nav.navigate('home')
      })
      .catch(() =>
        ToastAndroid.show('Não foi possivel conectar ao servidor', 3000)
      )
  }

  return (
    <View>
      <Toolbar title="Conta" />
      <View style={styles.container}>
        <Avatar
          rounded
          containerStyle={{ alignSelf: 'center', left: 10 }}
          size={200}
          source={{
            uri:
              user['photo'] == null
                ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                : `data:image/jpeg;base64,${user['photo']}`,
          }}
          onPress={() => updateImage()}
        />
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: user['name'],
            email: user['email'],
            password: user['password'],
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('informe um nome valido'),
            email: Yup.string()
              .required('Informe um email')
              .email('email invalido'),
            password: Yup.string()
              .required('informe um senha')
              .min(8, 'senha invalida'),
          })}
          onSubmit={update}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            touched,
            errors,
            isValid,
            dirty,
            values,
          }) => (
            <View style={{ top: 20, padding: 20 }}>
              <Text style={styles.text}>Nome</Text>
              <TextInput
                placeholder="Nome"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                mode="outlined"
                theme={{ roundness: 10 }}
              />
              {touched.name && errors.name && (
                <Text style={styles.erros}>{errors.name}</Text>
              )}

              <Text style={styles.text}>E-MAIL</Text>
              <TextInput
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                mode="outlined"
                theme={{ roundness: 10 }}
              />
              {touched.email && errors.email && (
                <Text style={styles.erros}>{errors.email}</Text>
              )}

              <Text style={styles.text}>Mudar a Senha</Text>
              <TextInput
                placeholder="Senha"
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
                title={'salvar'}
                onPress={() => handleSubmit()}
                disabled={!(isValid && dirty)}
                containerStyle={{
                  width: 150,
                  alignSelf: 'center',
                  top: 20,
                  borderRadius: 15,
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: 'gray',
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: { top: 50 },
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
  erros: {
    paddingLeft: 10,
    color: 'red',
  },
})
