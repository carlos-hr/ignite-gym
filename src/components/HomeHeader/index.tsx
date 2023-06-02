import { UserAvatar } from '@components/UserAvatar';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';

import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useAuthContext } from '@hooks/useAuthContext';

import defaultUserImage from '@assets/userPhotoDefault.png';

export function HomeHeader() {
  const { user, signOut } = useAuthContext();

  return (
    <HStack bgColor="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserAvatar
        source={user.avatar ? { uri: user.avatar } : defaultUserImage}
        alt="user profile image"
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
