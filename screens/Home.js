import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useContext } from 'react'
import tw from 'twrnc';
import NavOptions from '../Components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import AppContext from '../Store/AppContext';
import NavFavourites from '../Components/NavFavourites';

const Home = () => {
    const dispatch = useDispatch();
    const appContext = useContext(AppContext);

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={{ uri: 'https://links.papareact.com/gzs' }}
                />
                <GooglePlacesAutocomplete 
                    placeholder='Where From?'
                    styles={{
                        container: {
                            flex: 0,
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                    onPress={(data, details = null) => {
                        appContext.setOrigin({"location": details.geometry.location, "description": data.description});

                        // dispatch(setOrigin({
                        //     location: details.geometry.location,
                        //     description: data.description
                        // }))
                        // dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={3}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en"
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400}
                />
                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default Home