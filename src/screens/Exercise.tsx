import { Box, Heading, HStack, Icon, Image, Text, VStack } from '@gluestack-ui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { ArrowLeft } from 'lucide-react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { BodyIcon } from '@components/BodyIcon';
import { SeriesIcon } from '@components/SeriesIcon';
import { RepetitionsIcon } from '@components/RepetitionsIcon';
import { Button } from '@components/Button';

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps;
  console.log('🚀 ~ Exercise ~ exerciseId:', exerciseId);

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        <HStack justifyContent="space-between" alignItems="center" mt="$4" mb="$8">
          <Heading color="$gray100" fontFamily="$heading" fontSize="$lg" flexShrink={1}>
            Puxada frontal
          </Heading>
          <HStack alignItems="center">
            <BodyIcon />

            <Text color="$gray200" ml="$1" textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack p="$8">
          <Image
            source={{
              uri: 'https://treinomestre.com.br/wp-content/uploads/2014/01/remada-baixa-treino-costas.jpg',
            }}
            alt="Exercício"
            mb="$3"
            resizeMode="cover"
            rounded="$lg"
            w="$full"
            h="$80"
          />

          <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
            <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
              <HStack>
                <SeriesIcon />
                <Text color="$gray200" ml="$2">
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsIcon />
                <Text color="$gray200" ml="$2">
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" onPress={() => {}} />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
