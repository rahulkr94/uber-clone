import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const AppContext = React.createContext({});
export default AppContext;
export const AppConsumer = AppContext.Consumer;

export const AppProvider = (props) => {
    const [loading, setLoading] = useState(false);
    const [origin, setOrigin] = useState({
        location: {},
        description: null
    });
    const [destination, setDestination] = useState({
        location: {},
        description: null
    });
    const [splashLoading, setSplashLoading] = useState(false);


    const layoutInfo = {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    }

    const appData = {
        loading,
        setLoading,
        splashLoading,
        layoutInfo,
        origin, 
        setOrigin,
        destination, 
        setDestination
    };
    
    return <AppContext.Provider value={{ ...appData }} >
         {props.children} 
    </ AppContext.Provider>
}