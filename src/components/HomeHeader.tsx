import { Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { UserPhoto } from './UserPhoto';
import { LogOut } from 'lucide-react-native';
import { useAuth } from '@hooks/useAuth';

import defaultUserPhotoImg from '../assets/userPhotoDefault.png';

export function HomeHeader() {
  const { user } = useAuth();
  console.log('🚀 ~ HomeHeader ~ user:', user);

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserPhoto
        source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
        alt="Imagem do usuário"
        w="$16"
        h="$16"
      />

      <VStack flex={1}>
        <Text color={'$gray100'} fontSize={'$sm'}>
          Olá,{' '}
        </Text>
        <Heading color={'$gray100'} fontSize={'$md'}>
          {user.name}
        </Heading>
      </VStack>

      <Icon as={LogOut} color={'$gray200'} size="xl" />
    </HStack>
  );
}
