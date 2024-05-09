import React, {useContext, useEffect, useState, useRef} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from './ChatScreen';
import ChatRoomScreen from './ChatRoomScreen';
import {useChatClient} from './useChatClient';
import { zegoAppSign, zegoAppId } from './ChatConfig';
import {
  Chat,
  OverlayProvider,
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  Thread,
  TouchableWithoutFeedback,
} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import {VideoAudioHeader} from './VideoAudioCall/VideoAudioHeader';
import {chatApiKey, chatUserId} from './ChatConfig';
import {
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useAppContext} from './AppContext';
import NewMesgScreen from './NewMesgScreen';
import {Dimensions} from 'react-native';
import {View} from 'react-native';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import { getFirstInstallTime } from 'react-native-device-info'
import * as ZIM from 'zego-zim-react-native';


const Data = [
  {
    id: 'kohina',
    name: 'kohina',
    img: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg',
  },
  {
    id: 'Sukku',
    name: 'Sukku',
    img: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg',
  },
  {
    id: 'Shubh',
    name: 'Shubh',
    img: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg',
  },
  {
    id: 'Hubb',
    name: 'Hubb',
    img: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg',
  },
  {
    id: 'Chhaya',
    name: 'Chhaya',
    img: 'https://img.freepik.com/premium-vector/business-global-economy_24877-41082.jpg',
  },
  {
    id: 'Pintu',
    name: 'Pintu',
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


export const onUserLogin = async (userID, userName,navigation, props) => {
  console.log(1, zegoAppId, zegoAppSign, userID, userName);
  
  return ZegoUIKitPrebuiltCallService.init(
    zegoAppId,
    zegoAppSign,
    userID,
    userName,
    [ZIM],
    {
      androidNotificationConfig: {
        channelID: "ZegoUIKit",
        channelName: "ZegoUIKit",
    },
      ringtoneConfig: { 
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      },
      notifyWhenAppRunningInBackgroundOrQuit: true,
      androidNotificationConfig: {
        channelID: "ZegoUIKit" ,
        channelName: "ZegoUIKit",
    },
      requireConfig: data => {
        return {
          onHangUp: duration => {
            console.log(duration);
            navigation.reset({
              index: 0,
              routes: [{name: 'ChannelScreen'}]
            })
          },
          durationConfig: {
            isVisible: true,
            onDurationUpdate: duration => {
              console.log(
                '########CallWithInvitation onDurationUpdate',
                duration,
              );
              if (duration === 10 * 60) {
                ZegoUIKitPrebuiltCallService.hangUp();
              }
            },
          },
          // topMenuBarConfig: {
          //   buttons: [ZegoMenuBarButtonName.minimizingButton],
          // },
          onWindowMinimized: () => {
            console.log('[Demo]CallInvitation onWindowMinimized');
            props.navigation.navigate('HomeScreen');
          },
          onWindowMaximized: () => {
            console.log('[Demo]CallInvitation onWindowMaximized');
            props.navigation.navigate('ZegoUIKitPrebuiltCallInCallScreen');
          },
        };
      },
    })}

export default function NavigationScreens() {
  const {clientIsReady} = useChatClient();

  // if (!clientIsReady) {
  //   return <Text>Loading chat ...</Text>;
  // }

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
          <Text style={{color: 'black'}}>Send New Message</Text>
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
    const {width, height} = Dimensions.get('window');
    const {navigation} = props;
    const {channel, setThread} = useAppContext();
    const [userID, setUserID] = useState('');
    const [userName, setUserName] = useState('');
    const [invitees, setInvitees] = useState([]);
// console.log(channel);
    useEffect(() => {
      getFirstInstallTime().then(firstInstallTime => {
        const id = String(firstInstallTime).slice(-5);
        setUserID(id);
        const name = 'user_' + id;
        setUserName(name);
      });
    }, []);

    useEffect(() => {
      if (userID, userName) {
        console.log('called onuser login', userID, userName);
        onUserLogin(userID, userName, navigation);
      }
    }, [userID, userName]);

    useEffect(() => {
      if (channel) {
        setInvitees([channel.id]);
      }
    }, [channel]);

    return (
      // <TouchableWithoutFeedback onPress={blankPressedHandle}>
      <View style={[styles.channelScreenC, {width: width, height: height}]}>
        <VideoAudioHeader navigation={props.navigation} userID={userID} userName={userName} />
        <View style={styles.channelC}>
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
        </View>
      </View>
      // </TouchableWithoutFeedback>
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
    const {setChannel} = useAppContext();

    const UserListItem = ({user}) => {
      const handle = async user => {
        try {
          console.log(
            'chatClient.user.id, user.id..',
            chatClient.user.id,
            user.id,
          );
          const newChannel = chatClient.channel('messaging', user.id, {
            name: user.id,
            image: user.img,
            members: [chatClient.user.id, user.id],
          });
          await newChannel.create();

          setChannel(newChannel);

          props.navigation.navigate('ChannelScreen');
        } catch (e) {
          console.log('Error....', e);
        }
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
          <ZegoCallInvitationDialog />
          <Stack.Navigator>
            <Stack.Screen
              name="ChannelListScreen"
              component={ChannelListScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChannelScreen"
              component={ChannelScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="ThreadScreen" component={ThreadScreen} />

            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="NewMesgScreen" component={NewMesgScreen} />
            <Stack.Screen
              options={{headerShown: false}}
              // DO NOT change the name
              name="ZegoUIKitPrebuiltCallWaitingScreen"
              component={ZegoUIKitPrebuiltCallWaitingScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              // DO NOT change the name
              name="ZegoUIKitPrebuiltCallInCallScreen"
              component={ZegoUIKitPrebuiltCallInCallScreen}
            />

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
  channelScreenC: {
    backgroundColor: 'rgba(216, 244, 181, 1)',
  },
  channelC: {
    height: '80%',
  },
});
