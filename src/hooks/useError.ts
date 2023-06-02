import { AppError } from '@utils/appError';
import { useToast } from 'native-base';

export const useError = () => {
  const toast = useToast();

  const showError = (error: unknown, customMessage: string) => {
    const isAppError = error instanceof AppError;

    const title = isAppError ? error.message : customMessage;

    toast.show({
      title,
      placement: 'top',
      bgColor: 'red.500',
    });
  };

  return { showError };
};
