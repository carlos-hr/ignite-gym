import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/types";

export function SignUp() {
  const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

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

          <Input placeholder="Nome" />

          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
          <Input placeholder="Confirme a senha" secureTextEntry />

          <Button title="Criar e acessar" />
        </Center>

        <Button
          mt={20}
          title="Voltar para o login"
          variant="outline"
          onPress={() => navigate("signIn")}
        />
      </VStack>
    </ScrollView>
  );
}
