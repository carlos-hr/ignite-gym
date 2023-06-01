import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AuthNavigatorRoutesProps } from '@routes/types';

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

interface FormDataProps {
  email: string;
  password: string;
}

export function SignIn() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  function onSubmit(data: FormDataProps) {}

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

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading fontSize="xl" mb={6} fontFamily="heading" color="gray.100">
            Acesse sua conta
          </Heading>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                errorMessage={errors.email?.message}
                onChangeText={onChange}
                value={value}
              />
            )}
            rules={{ required: 'Informe o e-mail' }}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                errorMessage={errors.password?.message}
                onChangeText={onChange}
                value={value}
                secureTextEntry
              />
            )}
            rules={{ required: 'Informe a senha' }}
          />

          <Input placeholder="Senha" secureTextEntry />

          <Button title="Acessar" onPress={handleSubmit(onSubmit)} />
        </Center>

        <Center mt={24}>
          <Text fontSize="sm" fontFamily="body" mb={3} color="gray.100">
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar conta"
            variant="outline"
            onPress={() => navigate('signUp')}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
