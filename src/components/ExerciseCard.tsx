import { Heading, HStack, Icon, Image, Text, VStack } from '@gluestack-ui/themed';
import { ChevronRight } from 'lucide-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps;

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="$gray500" alignItems="center" p="$2" pr="$4" rounded="$md" mb="$3">
        <Image
          source={{
            uri: 'https://treinomestre.com.br/wp-content/uploads/2014/01/remada-baixa-treino-costas.jpg',
          }}
          alt="Imagem do exercício"
          w="$16"
          h="$16"
          rounded="$md"
          mr="$4"
          resizeMode="cover"
        />

        <VStack flex={1}>
          <Heading fontSize={'$lg'} color="$white" fontFamily="$heading">
            Remada Baixa
          </Heading>
          <Text color="$gray200" fontSize="$sm" mt="$1" numberOfLines={2}>
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon as={ChevronRight} color="$gray300" />
      </HStack>
    </TouchableOpacity>
  );
}
