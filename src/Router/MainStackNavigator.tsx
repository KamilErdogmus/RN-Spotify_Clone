import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Screens } from "../utils/Screens";
import LoginScreen from "../Screens/Stack/LoginScreen";
import BottomTabs from "./BottomTabs";
import SearchDetail from "../Screens/SearchDetail";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Screens.Login} component={LoginScreen} />
      <Stack.Screen name={Screens.Main} component={BottomTabs} />
      <Stack.Screen name={Screens.SearchDetail} component={SearchDetail} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
