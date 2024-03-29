import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './screens/Welcome';
import SensorTest from './screens/SensorTest';
import NorthStar from './screens/NorthStar';
import Navigation from './screens/Navigation';
import map from './screens/map';
const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={
        {
          headerShown: false
        }
      }>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="map" component={map} />
        <Stack.Screen name="Navigation" component={Navigation} />
        <Stack.Screen name="NorthStar" component={NorthStar} />
        <Stack.Screen name="SensorTest" component={SensorTest} />
        {/* <Stack.Screen name="Test" component={Test} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
