import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as React from 'react'
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button } from 'react-native-elements'
import {
  Dialog,
  Portal,
  Provider,
  RadioButton,
  TextInput,
} from 'react-native-paper'
import * as Yup from 'yup'
import Toolbar from '../../components/toolbar'
import api from '../../libs/api'
import { User } from '../../model/users'

interface CreateOrderScreenProps {}

const CreateOrderScreen = (props: CreateOrderScreenProps) => {
  const nav = useNavigation<any>()
  const [user, setUser] = React.useState<User[]>([])
  const [category, setCategory] = React.useState('1')
  const [visible, setVisible] = React.useState(false)

  const showDialog = () => setVisible(true)
  const hideDialog = () => setVisible(false)

  React.useEffect(() => {
    nav.addListener('focus', async () => {
      var user_id = await AsyncStorage.getItem('user_id')

      api.get(`/users/${user_id}`).then((response) => setUser(response.data))
    })
  }, [])

  const registrar = async (dados) => {
    api
      .post('/orders', dados)
      .then(() => {
        ToastAndroid.show('Encomenda adicionada', ToastAndroid.SHORT)
        nav.navigate('home')
      })
      .catch(() =>
        ToastAndroid.show(
          'Não foi possivel conectar ao servidor',
          ToastAndroid.SHORT
        )
      )
  }

  const categoryOptions: Array<string> = [
    '',
    'Presente',
    'Comida',
    'Eletrônicos',
    'Roupas',
  ]

  return (
    <>
      <Toolbar title="Adicionar" back={true} />
      <View style={styles.container}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            number: '',
            reminder: '',
            userId: user['id'],
            categoryId: parseInt(category),
          }}
          validationSchema={Yup.object({
            number: Yup.string().required('Informe um número de rastreio'),
            reminder: Yup.string().required('Informe um lembrete'),
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
            values,
          }) => (
            <View style={{ top: 20, padding: 20 }}>
              <Text style={styles.text}>Número de rastreio</Text>
              <TextInput
                placeholder="Número de rastreio"
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                maxLength={30}
                style={styles.input}
                mode="outlined"
                theme={{ roundness: 10 }}
              />
              {touched.number && errors.number && (
                <Text style={styles.erros}>{errors.number}</Text>
              )}
              <Text style={styles.text}>Lembrete</Text>
              <TextInput
                placeholder="Lembrete"
                onChangeText={handleChange('reminder')}
                onBlur={handleBlur('reminder')}
                maxLength={30}
                style={styles.input}
                mode="outlined"
                theme={{ roundness: 10 }}
              />
              {touched.reminder && errors.reminder && (
                <Text style={styles.erros}>{errors.reminder}</Text>
              )}
              <TouchableOpacity onPress={showDialog} activeOpacity={1}>
                <TextInput
                  placeholder="Categoria"
                  disabled
                  style={{ top: 25 }}
                  value={categoryOptions[values.categoryId]}
                  mode="outlined"
                  theme={{ roundness: 10 }}
                  right={<TextInput.Icon name={'arrow-down'} />}
                />
              </TouchableOpacity>

              <Button
                buttonStyle={{ backgroundColor: '#1E82D1', height: 50 }}
                containerStyle={{
                  width: 150,
                  alignSelf: 'center',
                  top: 40,
                  borderRadius: 15,
                  shadowOffset: { width: -2, height: 4 },
                  shadowColor: '#171717',
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                }}
                title="ADICIONAR"
                disabled={!(isValid && dirty)}
                onPress={() => handleSubmit()}
              />
            </View>
          )}
        </Formik>
      </View>
      <></>
      <Provider>
        <View>
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={hideDialog}
              style={{ backgroundColor: 'white' }}
            >
              <Dialog.Title>Escolha uma categoria</Dialog.Title>
              <Dialog.Content>
                <RadioButton.Group
                  onValueChange={(category) => setCategory(category)}
                  value={category}
                >
                  <RadioButton.Item label="Presente" value="1" />
                  <RadioButton.Item label="Comida" value="2" />
                  <RadioButton.Item label="Eletrônicos" value="3" />
                  <RadioButton.Item label="Roupas" value="4" />
                </RadioButton.Group>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} title="CANCELAR" />
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    </>
  )
}

export default CreateOrderScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    top: 14,
  },
  text: {
    color: 'gray',
    padding: 10,
  },
  erros: {
    paddingLeft: 10,
    color: 'red',
  },
  modal: {
    backgroundColor: 'white',
  },
  input: {
    backgroundColor: 'white',
  },
})
