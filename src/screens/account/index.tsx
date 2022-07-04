import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { Formik } from 'formik'
import * as React from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { Modalize } from 'react-native-modalize'
import { TextInput } from 'react-native-paper'
import * as Yup from 'yup'
import unknown from '../../assets/images/no-pick-profile.png'
import Toolbar from '../../components/toolbar'
import api from '../../libs/api'
import { User } from '../../model/users'

interface AccountProps {}

const Account = (props: AccountProps) => {
  const nav = useNavigation<any>()
  const [user, setuser] = React.useState<User[]>([])
  const [passwordVisible, setPasswordVisible] = React.useState(true)
  const modal = React.useRef<Modalize>()

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
    modal.current?.close()
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

  const deleteImage = async () => {
    Alert.alert('Remover foto', `Deseja remover a foto do perfil ?`, [
      {
        text: 'Sim',
        onPress: async () => {
          var user_id = await AsyncStorage.getItem('user_id')
          api
            .put(`/users/photo/${user_id}`, { photo: null })
            .then(() => {
              ToastAndroid.show('Foto de perfil deletada', 3000)
              nav.navigate('home')
            })
            .catch(() =>
              ToastAndroid.show('Não foi possivel conectar ao servidor', 3000)
            )

          modal.current?.close()
        },
      },
      { text: 'Não', onPress: () => modal.current?.close() },
    ])
  }

  return (
    <>
      <Toolbar title="Conta" />
      <ScrollView style={{ backgroundColor: 'white', top: 14 }}>
        <View style={styles.container}>
          <Avatar
            rounded
            containerStyle={{ alignSelf: 'center' }}
            size={250}
            source={
              user['photo'] == null
                ? unknown
                : { uri: `data:image/jpeg;base64,${user['photo']}` }
            }
            onPress={() => modal.current?.open()}
          />
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: user['name'],
              email: user['email'],
              password: '',
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
              <View style={{ top: 10, padding: 20 }}>
                <Text style={styles.text}>Nome</Text>
                <TextInput
                  placeholder="Nome"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.input}
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
                  style={styles.input}
                  mode="outlined"
                  theme={{ roundness: 10 }}
                />
                {touched.email && errors.email && (
                  <Text style={styles.erros}>{errors.email}</Text>
                )}
                <Text style={styles.text}>Mudar a senha</Text>
                <TextInput
                  placeholder="Senha"
                  secureTextEntry={passwordVisible}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  mode="outlined"
                  theme={{ roundness: 10 }}
                  style={styles.input}
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
                  buttonStyle={{ backgroundColor: '#1E82D1', height: 50 }}
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
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>
      </ScrollView>
      <>
        <Modalize ref={modal} modalHeight={180}>
          <View style={{ padding: 20, height: '100%' }}>
            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                height: 40,
              }}
            >
              <Text>Alterar foto de perfil</Text>
            </View>
            <View style={{ top: 10 }}>
              <TouchableOpacity onPress={updateImage} style={{ top: 15 }}>
                <Text>Nova foto do perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteImage} style={{ top: 40 }}>
                <Text style={{ color: 'red' }}>Remover foto do perfil</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text></Text>
          <Text></Text>
        </Modalize>
      </>
    </>
  )
}

export default Account

const styles = StyleSheet.create({
  container: { top: 30 },
  input: {
    backgroundColor: 'white',
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
