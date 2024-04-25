import React, { useContext } from 'react';
import { Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import { ChannelList, Chat, OverlayProvider } from 'stream-chat-react-native';
import { Channel } from "stream-chat";
import { useNavigation } from "@react-navigation/native";
import { ChatContext,  } from './ChatContext';

export default function ChatScreen() {

  const{setCurrentChannel} = useContext(ChatContext)

  const navigation = useNavigation();
  

  const onSelect = (chanel) => {
    console.log("hi")
    setCurrentChannel(chanel);
    navigation.navigate("ChatRoom");
  };

  return <ChannelList onSelect={onSelect} />;

}
