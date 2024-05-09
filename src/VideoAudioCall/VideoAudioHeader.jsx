import Call from '../assets/images/Call.png';
import Video from '../assets/images/Video.png';
import Back from '../assets/images/back.png';
import activeDot from '../assets/images/activeDot.png';
import options from '../assets/images/options.png';
import user from '../assets/images/user.png';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRef, useState, useEffect} from 'react';
import ZegoUIKitPrebuiltCallService, {
  ZegoCallInvitationDialog,
  ZegoUIKitPrebuiltCallWaitingScreen,
  ZegoUIKitPrebuiltCallInCallScreen,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {zegoAppId, zegoAppSign} from '../ChatConfig';

export const onUserLogin = async (userID, userName, navigation, props) => {
  console.log(2, zegoAppId, zegoAppSign, userID, userName);
  return ZegoUIKitPrebuiltCallService.init(
    zegoAppId,
    zegoAppSign,
    userID,
    userName,
    [ZIM],
    {
      androidNotificationConfig: {
        channelID: 'ZegoUIKit',
        channelName: 'ZegoUIKit',
      },
      ringtoneConfig: {
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      },
      notifyWhenAppRunningInBackgroundOrQuit: true,
      androidNotificationConfig: {
        channelID: 'ZegoUIKit',
        channelName: 'ZegoUIKit',
      },
      requireConfig: data => {
        return {
          onHangUp: duration => {
            console.log(duration);
            navigation.reset({
              index: 0,
              routes: [{name: 'ChannelScreen'}],
            });
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
    },
  );
};

const onUserLogout = async () => {
  return ZegoUIKitPrebuiltCallService.uninit();
};

export const VideoAudioHeader = ({navigation, userID, userName}) => {
  const windowDimensions = Dimensions.get('window');
  const [invitees, setInvitees] = useState([]);
  // useEffect(() => {
  //   // Simulated auto login if there is login info cache
  //       onUserLogin(userID, userName , navigation)

  // }, [])

  console.log(userID, userName, invitees);
  const viewRef = useRef(null);
  const blankPressedHandle = () => {
    viewRef.current.blur();
  };
  const changeTextHandle = value => {
    setInvitees(value ? value.split(',') : []);
  };
  return (
    <View style={styles.dummyC}>
      <View style={[styles.container]}>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <Image style={{marginRight: 5}} source={Back} />
          <Image source={user} />
          <View>
            <Text style={styles.name}>Robert Fox</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image source={activeDot} />
              <Text style={styles.activeNow}>Active Now</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={false}
            resourceID={'zego_call'}
          />
          <ZegoSendCallInvitationButton
            invitees={invitees.map(inviteeID => {
              return {userID: inviteeID, userName: 'user_' + inviteeID};
            })}
            isVideoCall={true}
            resourceID={'zego_call'}
          />
          {/* <Image source={Call} />
        <TouchableOpacity
          >
          <Image source={Video} />
        </TouchableOpacity> */}
          <Image source={options} />
        </View>
      </View>
      <View style={styles.textBox}>
      <TextInput
        ref={viewRef}
        style={styles.input}
        onChangeText={changeTextHandle}
        placeholderTextColor={'black'}
        placeholder="Invitees ID, Separate ids by ','"
      />
      <Text style={{color: 'black'}}> current user id: </Text>
      <Text style={{color: 'black'}}>{userID}</Text>

      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  dummyC: {
    height: '20%',
    borderBottomColor: 'rgba(216, 244, 181, 1)',
    borderBottomWidth: 2,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: '50%',
    borderBottomColor: 'rgba(216, 244, 181, 1)',
    borderBottomWidth: 2,
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  word: {
    color: 'black',
  },
  name: {
    fontSize: 18,
    color: 'rgba(23, 28, 27, 1)',
    fontWeight: 'bold',
  },
  activeNow: {
    fontSize: 14,
    color: 'rgba(70, 83, 82, 1)',
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
    marginRight: 10,
    color: 'black',
    // width: 80,
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-center'
  }
});
