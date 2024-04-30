import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native'; 
import {MessageInput, MessageList, Channel} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import {chatApiKey} from './ChatConfig';

const client = StreamChat.getInstance(chatApiKey);

export default function NewMesgScreen() {
  const route = useRoute();
  const {user} = route.params;
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const createAndWatchChannel = async () => {
     
        const newChannel = client.channel(
          'messaging',
          'sample-room1',
          {
            name: user.id,
          },
        );

        await newChannel.create();
        
        console.log('newChannel...', newChannel);
        setChannel(newChannel);
     
    };

    createAndWatchChannel();
    return () => {
      if (channel) {
        channel.stopWatching();
      }
    };
  }, [user]);

  const sendMessage = async text => {
    if (!channel) return;
      await channel.sendMessage({
        text: text,
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      
      {channel && (
        <Channel channel={channel}>
          <MessageList />
          <MessageInput sendMessage={sendMessage} />
        </Channel>
      )}
    </SafeAreaView>
  );
}
