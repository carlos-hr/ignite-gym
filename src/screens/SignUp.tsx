import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { api } from '@services/api';
import { Input } from '@components/Input';
import { AppError } from '@utils/appError';
import { Button } from '@components/Button';
import { signUpSchema } from '@schemas/signUp';
import { AuthNavigatorRoutesProps } from '@routes/types';

import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
  Spinner,
} from 'native-base';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  async function onSubmit(data: FormDataProps) {
    setIsCreatingUser(true);
    const { name, email, password } = data;

    try {
      const response = await api.post('/users', {
        name,
        email,
        password,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsCreatingUser(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="People training"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={20}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading fontSize="xl" mb={6} fontFamily="heading" color="gray.100">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                placeholder="Senha"
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                onSubmitEditing={handleSubmit(onSubmit)}
                errorMessage={errors.confirm_password?.message}
                placeholder="Confirme a senha"
                returnKeyType="send"
                secureTextEntry
              />
            )}
          />

          <Button
            title={
              isCreatingUser ? <Spinner color="white" /> : 'Criar e acessar'
            }
            onPress={handleSubmit(onSubmit)}
          />
        </Center>

        <Button
          mt={12}
          title="Voltar para o login"
          variant="outline"
          onPress={() => navigate('signIn')}
        />
      </VStack>
    </ScrollView>
  );
}
