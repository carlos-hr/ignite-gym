import { Button as NBButton, Text } from 'native-base';
import { ButtonProps } from './types';

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  return (
    <NBButton
      w="full"
      h={14}
      bgColor={variant === 'outline' ? 'transparent' : 'green.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        bgColor: variant === 'outline' ? 'gray.500' : 'green.500',
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </NBButton>
  );
}
