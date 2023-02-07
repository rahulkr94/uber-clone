import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import Home from './screens/Home';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import { AppProvider } from './Store/AppContext';
import 'react-native-gesture-handler'

export default function App() {
    const Stack = createStackNavigator();
    return (
        <AppProvider>
            <Provider store={store}>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? "padding" : "height"}
                            style={{flex: 1}}
                            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
                        >
                            <Stack.Navigator>
                                <Stack.Screen
                                    name="HomeScreen"
                                    component={Home}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <Stack.Screen
                                    name="MapScreen"
                                    component={MapScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                            </Stack.Navigator>
                        </KeyboardAvoidingView>
                    </SafeAreaProvider>
                </NavigationContainer>
            </Provider>
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
