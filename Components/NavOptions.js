import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import tw from 'twrnc'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import AppContext from '../Store/AppContext'

const NavOptions = () => {
    const navigation = useNavigation();
    const appContext = useContext(AppContext);
    const data = [
        {
            id: '1',
            title: 'Get a ride',
            image: 'https://links.papareact.com/3pn',
            screen: 'MapScreen'
        },
        {
            id: '2',
            title: 'Order food',
            image: 'https://links.papareact.com/28w',
            screen: 'EatsScreen'
        }
    ]
    return <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            disabled={!appContext?.origin?.location?.lat}
        >
            <View style={tw`${!appContext?.origin?.location?.lat && 'opacity-20'}`}>
                <Image
                    style={{
                        width: 120,
                        height: 120,
                        resizeMode: 'contain'
                    }}
                    source={{
                        uri: item.image
                    }}
                />
                <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                <Icon
                    style={tw`p-2 bg-black rounded-full w-10 mt-4`} 
                    name='arrowright' color='white' type='antdesign' />
            </View>
        </TouchableOpacity>
        }
    />
}

export default NavOptions