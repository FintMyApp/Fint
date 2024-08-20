import * as React from "react";
import {
  NavigationContainer,
  NavigationContainerRefContext,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./Auth/SignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./Auth/Login";
import Otp from "./Auth/Otp";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import Pay from "./pages/Pay";
const Stack = createNativeStackNavigator();

export default function App() {
  React.useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        NavigationContainerRefContext.current?.navigate("Home");
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Pay" component={Pay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
