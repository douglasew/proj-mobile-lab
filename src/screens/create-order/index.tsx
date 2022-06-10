import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as React from 'react'
import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import * as Yup from 'yup'
import Toolbar from '../../components/toolbar'
import api from '../../libs/api'
import { User } from '../../model/users'

interface CreateOrderProps {}

const CreateOrder = (props: CreateOrderProps) => {
  const nav = useNavigation<any>()
  const [user, setUser] = React.useState<User[]>([])

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
        ToastAndroid.show('Encomenda adicionada', 3000)
        nav.navigate('home')
      })
      .catch(() =>
        ToastAndroid.show('Não foi possivel conectar ao servidor', 3000)
      )
  }

  return (
    <View style={styles.container}>
      <Toolbar title="Encomendas" back={true} />
      <Formik
        enableReinitialize={true}
        initialValues={{
          number: '',
          reminder: '',
          userId: user['id'],
          categoryId: 1,
        }}
        validationSchema={Yup.object({
          number: Yup.string().required('Informe um nome'),
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
        }) => (
          <View style={{ top: 20 }}>
            <Text style={styles.text}>Número de rastreio</Text>
            <Input
              placeholder="Número de rastreio"
              onChangeText={handleChange('number')}
              onBlur={handleBlur('number')}
              style={styles.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
            {touched.number && errors.number && (
              <Text style={styles.erros}>{errors.number}</Text>
            )}
            <Text style={styles.text}>Lembrete</Text>
            <Input
              placeholder="Lembrete"
              onChangeText={handleChange('reminder')}
              onBlur={handleBlur('reminder')}
              style={styles.input}
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
            {touched.reminder && errors.reminder && (
              <Text style={styles.erros}>{errors.reminder}</Text>
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
              title="ADICIONAR"
              disabled={!(isValid && dirty)}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </View>
  )
}

export default CreateOrder

const styles = StyleSheet.create({
  container: {},
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
    paddingLeft: 20,
    color: 'red',
  },
})
