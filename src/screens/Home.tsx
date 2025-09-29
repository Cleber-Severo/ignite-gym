import { ExerciseCard } from '@components/ExerciseCard';
import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { Loading } from '@components/Loading';
import { ToastMessage } from '@components/ToastMessage';
import { ExerciseDTO } from '@dtos/ExerciseDTO';
import { Center, Heading, HStack, Text, useToast, VStack } from '@gluestack-ui/themed';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

export function Home() {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [exercices, setExercises] = useState<ExerciseDTO[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [groupSelected, setGroupSelected] = useState('antebraço');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId });
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups');

      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares.';

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
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os exercícios.';

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
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack px="$8" flex={1}>
          <HStack justifyContent="space-between" alignItems="center" mb="$5">
            <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
              Exercícios
            </Heading>

            <Text color="$gray200" fontSize="$sm" fontFamily="$body">
              {exercices.length}
            </Text>
          </HStack>

          <FlatList
            data={exercices}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      )}
    </VStack>
  );
}
