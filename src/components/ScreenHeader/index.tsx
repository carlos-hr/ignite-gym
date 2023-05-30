import { Center, Heading } from 'native-base';
import { ScreenHeaderProps } from './types';

export function ScreenHeader(props: ScreenHeaderProps) {
  const { title } = props;
  return (
    <Center bg="gray.600" pb={6} pt={16}>
      <Heading color="gray.100" fontSize="xl" fontFamily="heading">
        {title}
      </Heading>
    </Center>
  );
}
