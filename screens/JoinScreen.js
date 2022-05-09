import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  HStack,
  Button,
  Box,
  Center,
  FormControl,
  VStack,
  Image,
  Input,
  Modal,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

export default function JoinScreen() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <HStack
        space={6}
        alignItems="center"
        justifyContent="center"
        p="2"
        top="2">
        <Button
          onPress={() => setShowModal(true)}
          bgColor="blue.500"
          w="40"
          h="10"
          borderRadius="lg">
          <Text style={{color: '#fff', fontFamily: 'SpaceGrotesk-Medium'}}>
            Join Meeting
          </Text>
        </Button>
      </HStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Join meeting</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input
                placeholder="Enter your username"
                placeholderTextColor="darkgrey"
                defaultValue={username}
                onChangeText={text => setUsername(text)}
                borderColor="blue.500"
                p="2"
                w="100%"
                isRequired
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="gray">
                Cancel
              </Button>
              <Button
                onPress={() => {
                  navigation.navigate('Meeting');
                  setShowModal(false);
                  setUsername('');
                }}
                variant="solid"
                colorScheme="blue"
                w="20">
                Join
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Center flex="1">
        <VStack space="5" alignItems="center" w="full">
          <Box alignItems="center" justifyContent="center">
            <Image
              source={require('../assets/images/meeting-rafiki.png')}
              size="64"
              alt="meeting image"
            />
            <Text
              style={{
                fontFamily: 'SpaceGrotesk-SemiBold',
                fontSize: 22,
                textAlign: 'center',
                color: '#000111',
              }}>
              Your meeting is <Text style={{color: '#2196F3'}}>secured</Text>
            </Text>
            <Text
              style={{
                width: 300,
                color: '#000111',
                fontSize: 15,
                paddingVertical: 10,
                lineHeight: 21,
                letterSpacing: 0.2,
                textAlign: 'center',
                fontFamily: 'SpaceGrotesk-Regular',
              }}>
              Only people with the link can join the meeting. You can share the
              link with your friends and colleagues.
            </Text>
          </Box>
        </VStack>
      </Center>

      <Text
        style={{
          textAlign: 'center',
          padding: 20,
          fontFamily: 'SpaceGrotesk-SemiBold',
        }}>
        Powered by <Text style={{color: '#2196F3'}}>100ms</Text>
      </Text>
    </View>
  );
}
