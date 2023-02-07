import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from 'react-native-elements'

const NavFavourites = () => {

    const data = [
        {
            id: '1',
            icon: 'home',
            location: 'Home',
            destination: 'Kukrarh, Bihar, India'
        },
        {
            id: '2',
            icon: 'briefcase',
            location: 'Work',
            destination: 'Eservecloud Solutions Private Limited, 19th Main Road, Garden Layout, Sector 2, HSR Layout, Bengaluru, Karnataka, India'
        }
    ]
  return (
    <FlatList 
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={[tw`bg-gray-200`, {height: 0.5}]}></View>}
        renderItem={({ item: {location, destination, icon }}) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
                <Icon 
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name={icon}
                    type="ionicon"
                    color='white'
                    size={18}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>
                </View>
            </TouchableOpacity>
        )}
    />
  )
}

export default NavFavourites