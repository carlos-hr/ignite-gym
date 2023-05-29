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
import { Alert, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export function Profile() {
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [userImage, setUserImage] = useState("");

  async function handleSelectUserImage() {
    try {
      setIsAvatarLoading(true);
      const selectedImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (selectedImage.canceled) {
        return;
      }

      const { uri } = selectedImage.assets[0];

      if (uri) {
        const imageInfo = await FileSystem.getInfoAsync(uri);

        if (imageInfo.exists && imageInfo.size / 1024 / 1024 > 5) {
          Alert.alert(
            "Essa imagem é muito grande. Selecione uma imagem de até 5.MB"
          );
        }
        setUserImage(uri);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAvatarLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
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
            <UserAvatar
              alt="Foto do usuário"
              size={33}
              source={{ uri: userImage }}
            />
          )}

          <TouchableOpacity onPress={handleSelectUserImage}>
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
        </Center>
      </ScrollView>
    </VStack>
  );
}
