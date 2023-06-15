import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { ScreenHeader } from '@components/ScreenHeader';
import { UserAvatar } from '@components/UserAvatar';
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Controller, useForm } from 'react-hook-form';
import { useAuthContext } from '@hooks/useAuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateProfileSchema } from '@schemas/updateProfile';
import defaultUserImage from '@assets/userPhotoDefault.png';
import { api } from '@services/api';
import { useError } from '@hooks/useError';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  confirm_password: string;
}

export function Profile() {
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [userImage, setUserImage] = useState('');

  const { showError, toast } = useError();
  const { user } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(updateProfileSchema),
  });

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
            'Essa imagem é muito grande. Selecione uma imagem de até 5.MB'
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

  async function onSubmit(data: ProfileFormData) {
    try {
      setIsProfileUpdating(true);

      await api.put('/users', data);

      toast.show({
        title: 'Perfil atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {
      showError(error, 'Ocorreu um erro ao atualizar o perfil');
    } finally {
      setIsProfileUpdating(false);
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
              source={user.avatar ? { uri: user.avatar } : defaultUserImage}
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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                bgColor="gray.600"
                errorMessage={errors.name?.message}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                isDisabled
                placeholder="E-mail"
                bgColor="gray.600"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Heading
            mb={2}
            mt={12}
            fontSize="md"
            color="gray.200"
            fontFamily="heading"
            alignSelf="flex-start"
          >
            Alterar senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha antiga"
                bgColor="gray.600"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova senha"
                bgColor="gray.600"
                secureTextEntry
                errorMessage={errors.password?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirmar nova senha"
                bgColor="gray.600"
                secureTextEntry
                errorMessage={errors.confirm_password?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Button title="Atualizar" mt={4} onPress={handleSubmit(onSubmit)} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
