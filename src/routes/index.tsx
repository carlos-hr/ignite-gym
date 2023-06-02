import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { Box, useTheme } from 'native-base';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuthContext } from '@hooks/useAuthContext';
import { Loading } from '@components/Loading';

export function Routes() {
  const { user, isFetchingUserData } = useAuthContext();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isFetchingUserData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user?.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
