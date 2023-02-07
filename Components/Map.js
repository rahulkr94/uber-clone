import { Platform } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import tw from 'twrnc';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import AppContext from '../Store/AppContext';
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_APIKEY } from "@env"
const Map = () => {
    const origin = useSelector(selectOrigin);

    const appContext = useContext(AppContext);
    const mapRef = useRef(null);

    useEffect(() => {
        if(appContext?.destination?.location?.lat && appContext?.origin?.location?.lat) {
            const getTravelTime = async () => {
                fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${appContext?.origin?.description}&destinations=${appContext?.destination?.description}&key=${GOOGLE_MAPS_APIKEY}`)
                .then((res) => res.json())
                .then((res) => {
                    appContext.setTravelTimeInfo(res.rows[0].elements[0])
                })
            }
            getTravelTime();
        }
    }, [appContext?.origin?.location, appContext?.destination?.location, GOOGLE_MAPS_APIKEY])

    useEffect(() => {
        if(appContext?.destination?.location?.lat && appContext?.origin?.location?.lat) {

            // zoom and fit to marker lines on map
            if(Platform.OS === 'ios') {
                mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
                    animated: true,
                    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
                })
            } else {
                mapRef.current.fitToCoordinates([{
                    latitude: appContext?.origin?.location?.lat,
                    longitude: appContext?.origin?.location?.lng,
                  },
                  {
                    latitude: appContext?.destination?.location?.lat,
                    longitude: appContext?.destination?.location?.lng,
                  }
                ], {
                    animated: true,
                    edgePadding: { top: 50, right: 30, bottom: 30, left: 30 }
                })
            }
        }
    }, [appContext?.origin?.location, appContext?.destination?.location])
    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType="mutedStandard"
            initialRegion={{
                latitude: origin?.location?.lat || appContext?.origin?.location?.lat || 12.9715987,
                longitude: origin?.location?.lng || appContext?.origin?.location?.lng || 77.5945627,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {
                appContext?.origin?.description 
                && appContext?.destination?.description 
                && <MapViewDirections 
                    origin={appContext.origin.description}
                    destination={appContext.destination.description}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />

            }
            {
               (origin?.location || appContext?.origin?.location)
                && <Marker 
                    coordinate={{
                        latitude: origin?.location?.lat || appContext?.origin?.location?.lat,
                        longitude: origin?.location?.lng || appContext?.origin?.location?.lng,
                    }}
                    title="Origin"
                    description={ appContext?.origin?.description}
                    identifier="origin"
                />
            }
            {
                appContext?.destination?.location?.lat
                && <Marker
                    coordinate={{
                        latitude: appContext?.destination?.location?.lat,
                        longitude: appContext?.destination?.location?.lng
                    }}
                    title="Destination"
                    description={ appContext?.destination?.description }
                    identifier="destination"
                />
            }
        </MapView>
    )
}

export default Map