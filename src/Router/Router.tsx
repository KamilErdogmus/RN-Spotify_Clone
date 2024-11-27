import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DrawerContent from "../Screens/Drawer/DrawerContent";
import MainStackNavigator from "./MainStackNavigator";

const Drawer = createDrawerNavigator();

const Router = () => {
  return (
    <SafeAreaProvider>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#121212",
            width: "85%",
          },
          drawerActiveBackgroundColor: "#282828",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "#b3b3b3",
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen
          name="MainStacks"
          component={MainStackNavigator}
          options={{
            swipeEnabled: false,
          }}
        />
      </Drawer.Navigator>
    </SafeAreaProvider>
  );
};

export default Router;
