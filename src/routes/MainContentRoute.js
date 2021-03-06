import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Headers/Header';
import MainTabRoute from './MainTabRoute';

const MainContentStack = createStackNavigator();

export default function MainContentRoute() {

    return (
        <MainContentStack.Navigator
            headerMode='float'
            screenOptions={({navigation}) => {
                return (
                    {
                        headerTitle: () => <Header navigation={navigation} />,
                        headerStyle: {
                            backgroundColor: '#7C6FBD', 
                            height: 95,
                        },
                        headerLeft: () => null,
                        headerTitleAlign: 'center',
                    }
                );
            }}
        >
            <MainContentStack.Screen name='MainTabRoute' component={ MainTabRoute } />
        </MainContentStack.Navigator>
    );
} 
