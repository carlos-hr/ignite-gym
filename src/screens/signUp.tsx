import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AuthNavigatorRoutesProps } from '@routes/types';

import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base';

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
  const { control, handleSubmit } = useForm();

  function onSubmit(data) {
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
          />

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
          />

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
          />

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
          />

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
