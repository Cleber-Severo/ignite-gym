import { Center, Heading, Image, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import BackgroundImg from '@assets/background.png';
import { Logo } from '@components/Logo';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
  password: yup
    .string()
    .required('Informe a senha')
    .min(6, 'A senha deve ter pelo menos 6 dígitos'),
  confirmPassword: yup
    .string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });
  console.log('🚀 ~ SignUp ~ errors:', errors);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  async function handleSignUp({ name, email, password }: FormDataProps) {
    console.log('🚀 ~ handleSignUp ~ data:', { name, email, password });

    try {
      const response = await fetch('http://192.168.1.104:3333/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log('🚀 ~ handleSignUp ~ data:', data);
    } catch (error) {
      console.log('🚀 ~ handleSignUp ~ error:', error);
    }
  }

  function handleGoBackLogIn() {
    navigation.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          w="$full"
          h={624}
          position="absolute"
        />

        <VStack flex={1} px={'$10'} pb="$16">
          <Center my="$12">
            <Logo width={189} height={40} />

            <Text color="$gray100" fontSize={'$sm'}>
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center gap={8} flex={1}>
            <Heading color="$gray100">Crie sua conta</Heading>

            <Controller
              control={control}
              name={'name'}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors?.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={'email'}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  errorMessage={errors?.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={'password'}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Senha"
                  secureTextEntry
                  errorMessage={errors?.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name={'confirmPassword'}
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirme a senha"
                  secureTextEntry
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  errorMessage={errors?.confirmPassword?.message}
                />
              )}
            />

            <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} />
          </Center>

          <Button
            title="Voltar para o login"
            variant="outline"
            onPress={handleGoBackLogIn}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
}
