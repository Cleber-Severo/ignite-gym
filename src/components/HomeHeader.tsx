import { Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { UserPhoto } from './UserPhoto';
import { LogOut } from 'lucide-react-native';
import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';

export function HomeHeader() {
  const { user } = useAuth();

  return (
    <HStack bg="$gray600" pt="$16" pb="$5" px="$8" alignItems="center" gap="$4">
      <UserPhoto
        source={{ uri: 'https://github.com/Cleber-severo.png' }}
        alt="Imagem do usuário"
        w="$16"
        h="$16"
        onError={error => {
          console.log('UserPhoto error:', error);
        }}
        onLoad={() => {
          console.log('UserPhoto loaded successfully');
        }}
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
