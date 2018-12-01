//import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { RegisterScreen, HomeScreen, LoginScreen } from './components/screens';
import './Global'; // Importing global constants from Global.js

const AppStackNavigator = createStackNavigator({
  Register: {
    screen: RegisterScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  HomeScreen: {
    screen: HomeScreen
  },
},
{
  defaultNavigationOptions: {
    header: null
  }
});

export default createAppContainer(AppStackNavigator);
