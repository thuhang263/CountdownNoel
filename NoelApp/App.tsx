import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/Details';
import CountdownScreen from './src/CountdownScreen';
import CardScreen from './src/CardScreen';
import PhotoLibraryScreen from './src/PhotoLibraryScreen';
import SelfieScreen from './src/SelfieScreen';
import SettingScreen from './src/SettingScreen';
import CreateCard from './src/CreateCard';
import ScreenCard from './src/ScreenCard';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CountdownScreen" component={CountdownScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CardScreen" component={CardScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PhotoLibraryScreen" component={PhotoLibraryScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SelfieScreen" component={SelfieScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateCard" component={CreateCard} options={{ headerShown: false }} />
        <Stack.Screen name="ScreenCard" component={ScreenCard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
