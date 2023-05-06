import { VStack, Image, Text, Center, Heading } from "native-base";
import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

export function SignIn() {
  return (
    <VStack flex={1} bgColor="gray.700">
      <Image
        source={BackgroundImg}
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
      </Center>
    </VStack>
  );
}
