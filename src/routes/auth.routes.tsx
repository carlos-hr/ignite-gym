import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { AuthRoutesType } from './types';
import { AuthContextProvider } from '@contexts/AuthContext';

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesType>();

export function AuthRoutes() {
  return (
    <AuthContextProvider>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="signIn" component={SignIn} />
        <Screen name="signUp" component={SignUp} />
      </Navigator>
    </AuthContextProvider>
  );
}
