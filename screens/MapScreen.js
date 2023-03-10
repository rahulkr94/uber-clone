import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import Map from '../Components/Map';
import NavigateCard from '../Components/NavigateCard';
import { createStackNavigator } from '@react-navigation/stack';
import RideOptionCard from '../Components/RideOptionCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
    const navigation = useNavigation();
    const Stack = createStackNavigator();
  return (
    <View>
        <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full`}
        >
            <Icon name="menu" />
        </TouchableOpacity>
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