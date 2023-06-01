import { AppError } from '@utils/appError';
import { useToast } from 'native-base';

export const useError = (error: unknown, customMessage: string) => {
  const toast = useToast();

  const isAppError = error instanceof AppError;

  const title = isAppError ? error.message : customMessage;

  toast.show({
    title,
    placement: 'top',
    bgColor: 'red.500',
  });
};
