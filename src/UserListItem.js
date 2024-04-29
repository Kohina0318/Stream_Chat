import {
  Pressable,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {ChatContext} from './ChatContext';
import {useNavigation} from '@react-navigation/native';

const UserListItem = ({user}) => {
  // const {startDMChatRoom, setCurrentChannel, chatClient} =
  //   useContext(ChatContext);
  const navigation = useNavigation();

  const handle = async user => {
    //  await startDMChatRoom(user);
     console.log("handle..")
    // navigation.navigate('ChatRoom');
  };

  return (
    <TouchableOpacity onPress={() => handle(user)} style={styles.container}>
      <Image source={{uri: user.img}} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.6,
    borderColor: '#000',
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
  },
  name: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default UserListItem;
