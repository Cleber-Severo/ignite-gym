import { Box, Heading, HStack, Icon, Image, Text, VStack } from '@gluestack-ui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { ArrowLeft } from 'lucide-react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { BodyIcon } from '@components/BodyIcon';
import { SeriesIcon } from '@components/SeriesIcon';
import { RepetitionsIcon } from '@components/RepetitionsIcon';
import { Button } from '@components/Button';
import { useToast } from '@gluestack-ui/themed';
import { AppError } from '@utils/AppError';
import { ToastMessage } from '@components/ToastMessage';
import { api } from '@services/api';
import { useEffect, useState } from 'react';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Loading } from '@components/Loading';

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício.';

      if (isAppError) {
        toast.show({
          placement: 'top',
          bgColor: '$red500',
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="error"
              title={title}
              onClose={() => toast.close(id)}
            />
          ),
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px="$8" bg="$gray600" pt="$12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={ArrowLeft} color="$green500" size="xl" />
        </TouchableOpacity>

        {isLoading ? (
          <Loading />
        ) : (
          <HStack justifyContent="space-between" alignItems="center" mt="$4" mb="$8">
            <Heading color="$gray100" fontFamily="$heading" fontSize="$lg" flexShrink={1}>
              {exercise.name}
            </Heading>
            <HStack alignItems="center">
              <BodyIcon />

              <Text color="$gray200" ml="$1" textTransform="capitalize">
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
        )}
      </VStack>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <VStack p="$8">
          <Box rounded="$md" mb="$3" overflow="hidden">
            <Image
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Exercício"
              resizeMode="cover"
              rounded="$lg"
              w="$full"
              h="$80"
            />
          </Box>

          <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
            <HStack alignItems="center" justifyContent="space-around" mb="$6" mt="$5">
              <HStack>
                <SeriesIcon />
                <Text color="$gray200" ml="$2">
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsIcon />
                <Text color="$gray200" ml="$2">
                  {exercise.repetitions} repetições
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
