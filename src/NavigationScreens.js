import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from './ChatScreen';
import ChatRoomScreen from './ChatRoomScreen';
import {useChatClient} from './useChatClient';
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  Thread,
} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import {chatApiKey, chatUserId} from './ChatConfig';
import {
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useAppContext} from './AppContext';

const Data = [
  {
    id: 1,
    name: 'kohina',
    img: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg',
  },
  {
    id: 2,
    name: 'Sukku',
    img: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg',
  },
  {
    id: 3,
    name: 'Shubh',
    img: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg',
  },
];

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#fff',
    card: '#fff',
    border: 'transparent',
  },
};

const Stack = createNativeStackNavigator();
const chatClient = StreamChat.getInstance(chatApiKey);

export default function NavigationScreens() {
  const {clientIsReady} = useChatClient();

  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  const ChannelListScreen = props => {
    const {setChannel} = useAppContext();

    const filters = {
      members: {
        $in: [chatUserId],
      },
    };

    const sort = {
      last_message_at: -1,
    };
    return (
      <>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Users')}
          style={{alignItems: 'flex-end', padding: 5}}>
          <Text>Send New Message</Text>
        </TouchableOpacity>
        <ChannelList
          filters={filters}
          sort={sort}
          onSelect={channel => {
            const {navigation} = props;
            setChannel(channel);
            navigation.navigate('ChannelScreen');
          }}
        />
      </>
    );
  };

  const ChannelScreen = props => {
    const {navigation} = props;
    const {channel, setThread} = useAppContext();

    return (
      <Channel channel={channel}>
        <MessageList
          onThreadSelect={message => {
            if (channel?.id) {
              setThread(message);
              navigation.navigate('ThreadScreen');
            }
          }}
        />
        <MessageInput />
      </Channel>
    );
  };

  const ThreadScreen = props => {
    const {channel, thread} = useAppContext();

    return (
      <Channel channel={channel} thread={thread} threadList>
        <Thread />
      </Channel>
    );
  };

  const UsersScreen = props => {
    const UserListItem = ({user}) => {
      const handle = async user => {
        console.log('handle..');
      };

      return (
        <TouchableOpacity onPress={() => handle(user)} style={styles.container}>
          <Image source={{uri: user.img}} style={styles.image} />
          <Text style={styles.name}>{user.name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <FlatList
        data={Data}
        renderItem={({item}) => <UserListItem user={item} />}
      />
    );
  };

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="ChannelListScreen"
              component={ChannelListScreen}
            />
            <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
            <Stack.Screen name="ThreadScreen" component={ThreadScreen} />

            <Stack.Screen name="Users" component={UsersScreen} />

            {/* <Stack.Screen
          name="Chat"
          component={ChatScreen}
        />
        <Stack.Screen
          name="ChatRoom"
          component={ChatRoomScreen}
        />
        <Stack.Screen
          name="Users"
          component={UsersScreen}       
           /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Chat>
    </OverlayProvider>
  );
}

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
