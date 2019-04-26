import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import Colors from '../constants/Colors';

//Pages
import Home from '../pages/Home';
import Cart from '../pages/Cart';


const HomeStack = createStackNavigator({
  Home: Home,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `home`
          : 'home'
      }
    />
  ),
};

const CartStack = createStackNavigator({
  Cart,

});


CartStack.navigationOptions = {
  tabBarLabel: 'Cart',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'person' : 'ios-person'}
    />
  ),
};



export default createBottomTabNavigator({
  HomeStack,
  CartStack,

  
}, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: Colors.text,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: Colors.primary,
    },
  }
});
