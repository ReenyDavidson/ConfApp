import React, {useState, useContext, useEffect, useRef} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {Circle, HStack, VStack, Button} from 'native-base';
import {HMSUpdateListenerActions, HMSConfig} from '@100mslive/react-native-hms';
import HMSContext, {HMSProvider} from '../components/HmsContext';
import {fetchToken} from './fetchToken';

const joinRoom = async hmsInstance => {
  if (!hmsInstance) {
    console.error('HMS instance is not loaded');
    return;
  }

  const {token} = await fetchToken({
    roomID: '623df95244ae04b51cb076a2',
    userID: '12345',
    role: 'speaker',
  }).catch(error => {
    console.log('An error occurred:', error);
  });
  console.log('token', token);

  const hmsConfig = new HMSConfig({authToken: token, username: '12345'});

  hmsInstance.join(hmsConfig);
};

export default function MeetingScreen() {
  const [isMute, setMute] = useState(false);
  const [participants, setParticipants] = useState([]);
  const hmsInstance = useRef(HMSContext.Provider);

  const userID = useRef('demouser').current;

  useEffect(() => {
    if (hmsInstance) {
      hmsInstance.addEventListener(HMSUpdateListenerActions.ON_ERROR, data =>
        console.error('ON_ERROR_HANDLER', data),
      );

      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_JOIN,
        ({room, localPeer, remotePeers}) => {
          const localParticipant = {
            id: localPeer?.peerID,
            name: localPeer?.name,
            role: localPeer?.role?.name,
            avatar: (
              <Circle w="12" h="12" p="2" bg="blue.600">
                {localPeer?.name?.substring(0, 2)?.toLowerCase()}
              </Circle>
            ),
            isMute: localPeer?.audioTrack?.isMute(),
          };

          const remoteParticipants = remotePeers.map(remotePeer => {
            return {
              id: remotePeer?.peerID,
              name: remotePeer?.name,
              role: remotePeer?.role?.name,
              avatar: (
                <Circle w="12" h="12" p="2" bg="blue.600">
                  {remotePeer?.name?.substring(0, 2)?.toLowerCase()}
                </Circle>
              ),
              isMute: remotePeer?.audioTrack?.isMute(),
            };
          });

          setParticipants([localParticipant, ...remoteParticipants]);
        },
      );

      hmsInstance.addEventListener(
        HMSUpdateListenerActions.ON_ROOM_UPDATE,
        data => console.log('ON ROOM UPDATE', data),
      );

      hmsInstance?.addEventListener(
        HMSUpdateListenerActions.ON_PEER_UPDATE,
        ({localPeer, remotePeers}) => {
          const localParticipant = {
            id: localPeer?.peerID,
            name: localPeer?.name,
            role: localPeer?.role?.name,
            avatar: (
              <Circle w="12" h="12" p="2" bg="blue.600">
                {localPeer?.name?.substring(0, 2)?.toLowerCase()}
              </Circle>
            ),
            isMute: localPeer?.audioTrack?.isMute(),
          };

          const remoteParticipants = remotePeers.map(remotePeer => {
            return {
              id: remotePeer?.peerID,
              name: remotePeer?.name,
              role: remotePeer?.role?.name,
              avatar: (
                <Circle w="12" h="12" p="2" bg="blue.600">
                  {remotePeer?.name?.substring(0, 2)?.toLowerCase()}
                </Circle>
              ),
              isMute: remotePeer?.audioTrack?.isMute(),
            };
          });

          setParticipants([localParticipant, ...remoteParticipants]);
        },
      );

      hmsInstance?.addEventListener(
        HMSUpdateListenerActions.ON_TRACK_UPDATE,
        ({localPeer, remotePeers}) => {
          const localParticipant = {
            id: localPeer?.peerID,
            name: localPeer?.name,
            role: localPeer?.role?.name,
            avatar: (
              <Circle w="12" h="12" p="2" bg="blue.600">
                {localPeer?.name?.substring(0, 2)?.toLowerCase()}
              </Circle>
            ),
            isMute: localPeer?.audioTrack?.isMute(),
          };

          const remoteParticipants = remotePeers.map(remotePeer => {
            return {
              id: remotePeer?.peerID,
              name: remotePeer?.name,
              role: remotePeer?.role?.name,
              avatar: (
                <Circle w="12" h="12" p="2" bg="blue.600">
                  {remotePeer?.name?.substring(0, 2)?.toLowerCase()}
                </Circle>
              ),
              isMute: remotePeer?.audioTrack?.isMute(),
            };
          });

          setParticipants([localParticipant, ...remoteParticipants]);
        },
      );
    }

    joinRoom(hmsInstance);
  }, [hmsInstance, userID]);

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <VStack
        p="4"
        flex="1"
        space="4"
        _light={{bg: 'white'}}
        _dark={{bg: 'darkBlue.900'}}>
        <HStack ml="auto" alignItems="center">
          <Button variant="unstyled">
            <Text fontSize="md" fontWeight="bold" color="red.600">
              Leave
            </Text>
          </Button>
        </HStack>
        <Text fontSize="xl" fontWeight="bold">
          Building a Twitter Space Clone in React Native using NativeBase and
          100ms
        </Text>
        <FlatList
          numColumns={4}
          ListEmptyComponent={<Text>Loading...</Text>}
          data={participants}
          renderItem={({item}) => (
            <VStack w="25%" p="2" alignItems="center">
              {item.avatar}
              <Text numberOfLines={1} fontSize="xs">
                {item.name}
              </Text>
              <HStack alignItems="center" space="1">
                {item.isMute && <Icons name="mic" size="2" color="red" />}
                <Text numberOfLines={1} fontSize="xs">
                  {item.role}
                </Text>
              </HStack>
            </VStack>
          )}
          keyExtractor={item => item.id}
        />
      </VStack>
      <HStack
        p="4"
        zIndex="1"
        safeAreaBottom
        borderTopWidth="1"
        alignItems="center"
        _light={{bg: 'white'}}
        _dark={{bg: 'darkBlue.900'}}>
        <VStack space="2" justifyContent="center" alignItems="center">
          <Pressable
            onPress={() => {
              hmsInstance.localPeer.localAudioTrack().setMute(!isMute);
              setMute(!isMute);
            }}>
            <Circle p="2" borderWidth="1" borderColor="coolGray.400">
              {isMute ? (
                <Icons name="mic-off" size={24} color="red" />
              ) : (
                <Icons name="mic" size={24} color="red" />
              )}
            </Circle>
          </Pressable>
          <Text fontSize="md">{isMute ? 'Mic is off' : 'Mic is on'}</Text>
        </VStack>
      </HStack>
    </View>
  );
}
