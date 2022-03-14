// import { TransitionPresets } from '@react-navigation/stack';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Homepage from '@scenes/Homepage';
import MovieDetails from '@scenes/MovieDetails';
import MoviesList from '@scenes/MoviesList';
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
        name="MoviesList"
        component={MoviesList}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <MainStack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </MainStack.Navigator>
  );
};
