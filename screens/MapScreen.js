import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Map from '../Components/Map';
import NavigateCard from '../Components/NavigateCard';
import { createStackNavigator } from '@react-navigation/stack';
import RideOptionCard from '../Components/RideOptionCard';

const MapScreen = () => {
    const Stack = createStackNavigator();
  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
            <Stack.Screen 
                name='NavigateCard'
                component={NavigateCard}
                options={{
                    headerShown: false,
                }}
            />
               <Stack.Screen 
                name='RideOptionCard'
                component={RideOptionCard}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen