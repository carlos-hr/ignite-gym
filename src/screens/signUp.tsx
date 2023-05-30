import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AuthNavigatorRoutesProps } from '@routes/types';

import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>();

  function onSubmit(data: FormDataProps) {
    console.log(data);
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
              <Input placeholder="Nome" onChangeText={onChange} value={value} />
            )}
            rules={{
              required: 'Informe o nome',
            }}
          />

          <Text color="white" alignSelf="flex-start" h={6}>
            {errors.name?.message}
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            rules={{
              required: 'Informe o e-mail',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'E-mail inválido',
              },
            }}
          />

          <Text color="white" alignSelf="flex-start" h={6}>
            {errors.email?.message}
          </Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Senha"
                secureTextEntry
              />
            )}
            rules={{
              required: 'Informe a senha',
            }}
          />

          <Text color="white" alignSelf="flex-start" h={6}>
            {errors.password?.message}
          </Text>

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Confirme a senha"
                onSubmitEditing={handleSubmit(onSubmit)}
                returnKeyType="send"
                secureTextEntry
              />
            )}
            rules={{
              required: 'Confirme a senha',
            }}
          />

          <Text color="white" alignSelf="flex-start" h={6}>
            {errors.confirm_password?.message}
          </Text>

          <Button title="Criar e acessar" onPress={handleSubmit(onSubmit)} />
        </Center>

        <Button
          mt={20}
          title="Voltar para o login"
          variant="outline"
          onPress={() => navigate('signIn')}
        />
      </VStack>
    </ScrollView>
  );
}
