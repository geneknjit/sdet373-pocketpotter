import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import CharactersScreen from "./src/screens/CharactersScreen";

export type RootStackParamList = {
  Login: undefined;
  Characters: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Characters" component={CharactersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
