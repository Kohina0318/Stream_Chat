import React, { useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { ChatContext } from './ChatContext';
import { Channel, MessageList, MessageInput } from "stream-chat-react-native";
import { useNavigation } from "@react-navigation/native";

export default function ChatRoomScreen() {
  const{currentChannel} = useContext(ChatContext)
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: currentChannel?.data?.name || "Channel" });
  }, [currentChannel?.data?.name]);

  return (
    <Channel channel={currentChannel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}
