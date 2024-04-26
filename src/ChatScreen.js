import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity ,View} from 'react-native';
import { StreamChat } from 'stream-chat';
import { ChannelList, Chat, OverlayProvider } from 'stream-chat-react-native';
import { Channel } from "stream-chat";
import { useNavigation } from "@react-navigation/native";
import { ChatContext,  } from './ChatContext';

export default function ChatScreen() {

  const{setCurrentChannel} = useContext(ChatContext)

  const navigation = useNavigation();
  

  const onSelect = (chanel) => {
    setCurrentChannel(chanel);
    navigation.navigate("ChatRoom");
  };

  return(
    <>
      <TouchableOpacity onPress={()=>navigation.navigate("Users")} style={{alignItems:"flex-end",padding:5}}>
      <Image style={{width:30, height:30}}  source={{uri:"https://banner2.cleanpng.com/20180419/vpw/kisspng-computer-icons-user-icon-design-numerous-5ad8d537c8ab25.359337661524159799822.jpg"}}/>
      </TouchableOpacity>
     <ChannelList onSelect={onSelect} />
     </>
    )

}
