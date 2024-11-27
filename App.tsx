import "react-native-gesture-handler";
import React from "react";
import "./global.css";
import Router from "./src/Router/Router";
import { Provider } from "jotai";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider>
        <NavigationContainer>
          <View className="flex-1 bg-bg">
            <StatusBar style="light" backgroundColor="transparent" />
            <Router />
          </View>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
