import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Toolbar from '../../components/toolbar'
import { User } from '../../model/users'
import ItemUser from './itens-user'

interface ListProps {}

const List = (props: ListProps) => {
  const [users, setUsers] = React.useState<User[]>([
    { id: '1', name: 'Isabel Débora da Rosa', status: 'ATIVO' },
    { id: '2', name: 'Francisca Sônia Fernandes', status: 'INATIVO' },
    { id: '3', name: 'Vicente Osvaldo José Dias', status: 'ATIVO' },
    { id: '4', name: 'Laís Patrícia Jesus', status: 'INATIVO' },
    { id: '5', name: 'Amanda Isabella Francisca de Paula', status: 'ATIVO' },
    { id: '6', name: 'Mariana Daiane Clarice Pereira', status: 'INATIVO' },
    { id: '7', name: 'Nina Eliane Corte Real', status: 'ATIVO' },
    { id: '8', name: 'Isabelly Sônia Helena da Conceição', status: 'ATIVO' },
    { id: '9', name: 'Nathan Arthur Ryan Oliveira', status: 'ATIVO' },
    { id: '10', name: 'Maitê Daniela Campos', status: 'INATIVO' },
    { id: '11', name: 'Rebeca Alessandra Luna Galvão', status: 'ATIVO' },
    { id: '12', name: 'Emilly Alana Mendes', status: 'INATIVO' },
    { id: '13', name: 'Isabela Alícia Tereza Aparício', status: 'ATIVO' },
    { id: '14', name: 'Márcia Eloá Benedita Lima', status: 'INATIVO' },
    { id: '15', name: 'Ester Sônia Nascimento', status: 'ATIVO' },
  ])

  return (
    <View>
      <Toolbar title="Lista de usuarios" back={true} />

      <FlatList
        style={styles.list}
        data={users}
        extraData={users}
        renderItem={({ item }) => <ItemUser users={item} />}
      />
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  container: {},
  list: {
    marginTop: 100,
    marginBottom: 40,
  },
})
