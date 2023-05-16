import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppRoutesType } from "./types";

import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";
import { Exercise } from "@screens/Exercise";

export function AppRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator<AppRoutesType>();

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="history" component={History} />
      <Screen name="profile" component={Profile} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  );
}
