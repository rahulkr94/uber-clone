import { View, Text, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { Icon } from 'react-native-elements'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import AppContext from '../Store/AppContext'

const RideOptionCard = () => {
    const appContext = useContext(AppContext);
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const SURGE_CHARGE_RATE = 1.5;
    const data = [
        {
            id: "uber-x-1",
            title: "UberX",
            multiplier: 1,
            image: "https://links.papareact.com/3pn"
        },
        {
            id: "uber-x-2",
            title: "Uber XL",
            multiplier: 1.2,
            image: "https://links.papareact.com/5w8"
        },
        {
            id: "uber-x-3",
            title: "Uber LUX",
            multiplier: 1.75,
            image: "https://links.papareact.com/7pf"
        },
    ]
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
        <View>
            <TouchableOpacity 
                onPress={() => navigation.navigate("NavigateCard")}
                style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
                <Icon name="chevron-left" type="fontawesome" />
            </TouchableOpacity>
            <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {appContext?.travelTimeInfo?.distance?.text}</Text>
        </View>

        <FlatList 
            data={data} 
            keyExtractor={(item) => item.id}
            renderItem={({item: {id, title, multiplier, image}, item}) => (
                <TouchableOpacity 
                    onPress={() => setSelected(item)}
                    style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}>
                    <Image 
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain"
                        }}
                        source={{ uri: image}}
                    />
                    <View style={tw`-ml-6`}>
                        <Text style={tw`text-xl font-semibold`}>{title}</Text>
                        <Text>{appContext?.travelTimeInfo?.duration?.text} Travel time</Text>
                    </View>
                    <Text style={tw`text-xl`}>
                        {
                            new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                minimumFractionDigits: 0,
                            }).format((appContext?.travelTimeInfo?.duration?.value 
                                * SURGE_CHARGE_RATE * multiplier) / 10)
                        }
                    </Text>
                </TouchableOpacity>
            )}
        />

        <View style={tw`mt-auto border-t border-gray-200`}>
            <TouchableOpacity 
                disabled={!selected}
                style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
                <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionCard