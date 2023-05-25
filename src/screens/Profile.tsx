import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserAvatar } from "@components/UserAvatar";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export function Profile() {
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);

  return (
    <VStack>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        <Center mt={6} px={10}>
          {isAvatarLoading ? (
            <Skeleton
              h={33}
              w={33}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserAvatar alt="Foto do usuário" size={33} />
          )}

          <TouchableOpacity>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mb={8}
              mt={2}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input placeholder="Nome" bgColor="gray.600" />
          <Input placeholder="E-mail" bgColor="gray.600" />
        </Center>

        <VStack px={10} mb={10}>
          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            alignSelf="flex-start"
            mt={12}
          >
            Alterar senha
          </Heading>

          <Input
            placeholder="Senha antiga"
            bgColor="gray.600"
            secureTextEntry
          />

          <Input placeholder="Nova senha" bgColor="gray.600" secureTextEntry />
          <Input
            placeholder="Confirmar nova senha"
            bgColor="gray.600"
            secureTextEntry
          />

          <Button title="Atualizar" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
