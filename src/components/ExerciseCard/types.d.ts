import { ExerciseDTO } from '@dtos/exercise';
import { TouchableOpacityProps } from 'react-native';

export interface ExerciseCardProps extends TouchableOpacityProps {
  exercise: ExerciseDTO;
}
