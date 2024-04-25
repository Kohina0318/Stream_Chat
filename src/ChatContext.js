import React, {createContext, useContext, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {StreamChat} from 'stream-chat';
import {OverlayProvider, Chat} from 'stream-chat-react-native';

const ChatContext = createContext();

const ChatContextProvider = ({children}) => {
  const [chatClient, setChatClient] = useState();
  const [currentChannel, setCurrentChannel] = useState();

  const client = StreamChat.getInstance('3jfj9tbccxjm');
  useEffect(() => {
    const initChat = async () => {
      // if (!chatClient) {
        await client.connectUser(
          {
            id: 'john',
            name: 'John Doe',
            image: 'https://getstream.io/random_svg/?name=John',
          },
          client.devToken('john')
        );

        setChatClient(client);

        // const globalChannel = client.channel("livestream", "global", {
        //   name: "notJust.dev",
        // });
  
        // await globalChannel.watch();

      // }
    };
  
    initChat();
  
    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, []);


  const value = {
    chatClient,
    currentChannel,
    setCurrentChannel,
  };

  return (
    <OverlayProvider>
      <Chat client={client}>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export {ChatContextProvider, ChatContext};
