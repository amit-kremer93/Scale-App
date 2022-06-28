/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import InvoiceGenerator from './components/InvoiceGenerator';
import { NavigationContainer } from '@react-navigation/native';
import InvoiceViewer from './components/InvoiceViewer';
import TrucksList from './components/TrucksList';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

try {
	LogBox.ignoreLogs(['Non-serializable values were found in the navigation state', "Can't perform a React state update on an unmounted component"]);
} catch (e) {
	console.log(e);
}

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Home'
				screenOptions={{
					cardStyle: {
						backgroundColor: 'white',
					},
				}}>
				<Stack.Screen
					name='Home'
					options={{
						headerShown: false,
						title: 'דף הבית ',
					}}
					component={HomeScreen}
				/>
				<Stack.Screen
					name='InvoiceGenerator'
					options={{
						title: 'יצירת תעודה',
					}}
					component={InvoiceGenerator}
				/>
				<Stack.Screen
					name='InvoiceViewer'
					options={{
						title: 'הצגת תעודה',
					}}
					component={InvoiceViewer}
				/>
				<Stack.Screen
					name='TrucksList'
					options={{
						title: 'רשימת הרכבים שלי',
					}}
					component={TrucksList}
				/>
			</Stack.Navigator>
			<Toast ref={(ref) => Toast.setRef(ref)} />
		</NavigationContainer>
	);
};

export default App;
