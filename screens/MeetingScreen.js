import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import {Circle, HStack, VStack, Button} from 'native-base';
import HmsManager, {
  HMSTrackSettings,
  HMSAudioTrackSettings,
  HMSUpdateListenerActions,
  HMSVideoTrackSettings,
  HMSVideoCodec,
  HMSCameraFacing,
  HMSVideoResolution,
  HMSConfig,
  HMSVideoViewMode,
} from '@100mslive/react-native-hms';
import {fetchToken} from './fetchToken';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjIwYjRlYmQ2ZjJiODc2ZDU4ZWYzY2JmIiwicm9vbV9pZCI6IjYyM2RmOTUyNDRhZTA0YjUxY2IwNzZhMiIsInVzZXJfaWQiOiJjcnRoYXVpaSIsInJvbGUiOiJndWVzdCIsImp0aSI6ImM3MDJjYzAyLWJiN2EtNDNlMy04ZTNlLTAzYmM4ZjA0YjU0YSIsInR5cGUiOiJhcHAiLCJ2ZXJzaW9uIjoyLCJleHAiOjE2NTE1ODI1NTZ9.vgH9pHkhXbhCZE-6h_bu5yeBZs5ieLedD3lc0rzoS5w';

export default function MeetingScreen() {
  const [isMute, setMute] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [instance, setInstance] = useState(null);

  const getTrackSettings = () => {
    let audioSettings = new HMSAudioTrackSettings({
      maxBitrate: 32,
      trackDescription: 'Simple Audio Track',
    });
    let videoSettings = new HMSVideoTrackSettings({
      codec: HMSVideoCodec.VP8,
      maxBitrate: 512,
      maxFrameRate: 25,
      cameraFacing: HMSCameraFacing.FRONT,
      trackDescription: 'Simple Video Track',
      resolution: new HMSVideoResolution({height: 180, width: 320}),
    });

    return new HMSTrackSettings({video: videoSettings, audio: audioSettings});
  };

  const setupBuild = async () => {
    const trackSettings = getTrackSettings();
    const build = await HmsManager.build({trackSettings});
    setInstance(build);
  };

  useEffect(() => {
    setupBuild();

    const joinRoom = async () => {
      const hmsConfig = new HMSConfig({authToken: token, username: '12345'});

      instance?.join(hmsConfig);
    };

    console.log('instanc', instance.localPeer.videoTrac.trackId);

    instance?.addEventListener(HMSUpdateListenerActions.ON_ERROR, data =>
      console.error('ON_ERRoR_HANDLER', data),
    );

    instance?.addEventListener(HMSUpdateListenerActions.ON_JOIN, data =>
      console.log('ON JOIN ROOM', data),
    );

    instance?.addEventListener(HMSUpdateListenerActions.ON_ROOM_UPDATE, data =>
      console.log('ON ROOM UPDATE', data),
    );

    const HmsView = instance?.HmsView;

    instance?.addEventListener(
      HMSUpdateListenerActions.ON_PEER_UPDATE,
      ({localPeer, remotePeers}) => {
        const localParticipant = {
          id: localPeer?.peerID,
          name: localPeer?.name,
          role: localPeer?.role?.name,

          avatar: (
            <HmsView
              scaleType={HMSVideoViewMode.ASPECT_FILL}
              mirror={true}
              sink={true}
            />
          ),
          isMute: localPeer?.videoTrack?.isMute(),
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

    instance?.addEventListener(
      HMSUpdateListenerActions.ON_TRACK_UPDATE,
      ({localPeer, remotePeers}) => {
        const localParticipant = {
          id: localPeer?.peerID,
          name: localPeer?.name,
          role: localPeer?.role?.name,
          avatar: (
            <HmsView
              scaleType={HMSVideoViewMode.ASPECT_FILL}
              mirror={true}
              sink={true}
            />
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

    joinRoom();
  }, []);

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
              instance?.localPeer.localAudioTrack().setMute(!isMute);
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
