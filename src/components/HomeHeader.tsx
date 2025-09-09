import { Heading, HStack, Icon, Text, VStack } from '@gluestack-ui/themed';
import { UserPhoto } from './UserPhoto';
import { LogOut } from 'lucide-react-native';
import { useEffect } from 'react';

export function HomeHeader() {
  useEffect(() => {
    console.log('HomeHeader mounted successfully');
    return () => {
      console.log('HomeHeader unmounted');
    };
  }, []);

  try {
    console.log('HomeHeader rendering...');

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
            Cléber Severo
          </Heading>
        </VStack>

        <Icon as={LogOut} color={'$gray200'} size="xl" />
      </HStack>
    );
  } catch (error) {
    console.log('HomeHeader render error:', error);
    return (
      <VStack p="$4">
        <Text color="$red500">HomeHeader Error: {String(error)}</Text>
      </VStack>
    );
  }
}
