import React from 'react'
import { Text,FlatList } from 'react-native'
import UserListItem from './UserListItem'

export default function UsersScreen() {
    const Data=[
        {
            id:1,
            name:'kohina',
            img:"https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg"
        },
        {
            id:2,
            name:'Sukku',
            img:"https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg"
        },
        {
            id:3,
            name:'Shubh',
            img:"https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg"
        },
        {
            id:3,
            name:'Shubhhhh',
            img:"https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg"
        },
    ]
  return (
    <FlatList
    data={Data}
    renderItem={({ item }) => <UserListItem user={item} />}
  />
  )
}
