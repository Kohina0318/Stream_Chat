import React, {createContext, useContext, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {StreamChat} from 'stream-chat';
import {OverlayProvider, Chat} from 'stream-chat-react-native';

const ChatContext = createContext();

const ChatContextProvider = ({children}) => {
  const [chatClient, setChatClient] = useState(() =>
    StreamChat.getInstance('3jfj9tbccxjm'),
  );
  const [currentChannel, setCurrentChannel] = useState();


  useEffect(() => {
    const initChat = async () => {
      await chatClient.connectUser(
        {
          id: 'john',
          name: 'John Doe',
          image: 'https://getstream.io/random_svg/?name=John',
        },
        chatClient.devToken('john'),
      );

      const globalChannel = chatClient.channel('livestream', 'global', {
        name: 'notJust.dev',
      });

      await globalChannel.watch();
    };

    initChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [chatClient]);

  const startDMChatRoom = async chatWithUser => {
      if (!chatClient) {
        return;
      }
      const newChannel = chatClient.channel('messaging', {
        members: [chatClient.userID, chatWithUser.name],
      });
      await newChannel.watch();
      setCurrentChannel(newChannel);
      return;
  };

  const value = {
    chatClient,
    currentChannel,
    setCurrentChannel,
    startDMChatRoom,
  };

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </Chat>
    </OverlayProvider>
  );
};

export {ChatContextProvider, ChatContext};
