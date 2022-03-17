import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Homepage from '@scenes/Homepage';
import UserDetails from '@scenes/UserDetails';
import UsersList from '@scenes/UsersList';
import { FC } from 'react';
import * as React from 'react';

const MainStack = createStackNavigator();

export const MainStackScreen: FC = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Homepage}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="UsersList"
        component={UsersList}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </MainStack.Navigator>
  );
};
