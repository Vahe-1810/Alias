import Menu from 'screens/menu/MenuScreen';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from 'screens/settings/SettingsScreen';
import { RootStackParamList } from 'types';
import GameSetup from 'screens/game-setap/GameSetupScreen';
import GameInProgress from 'screens/Progress/GameInProgressScreen';
import GameProgressState from 'screens/game-progress-state/GameProgressStateScreen';
import Preparation from 'screens/Progress/PreparationScreen';
import GameResult from 'screens/game-result/GameResultScreen';
import Modal from 'components/modal';
import { useEffect, useState } from 'react';
import { addEventListener } from '@react-native-community/netinfo';
import { NetContext } from 'src/context/netContext';
import SplashScreen from 'screens/splash/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [hasNet, setHasNet] = useState(false);
  const navigatorOptions: NativeStackNavigationOptions = {
    animation: 'fade_from_bottom',
    statusBarHidden: true,
    headerShown: false,
  };

  useEffect(() => {
    const unsubscribe = addEventListener((/*state*/) => {
      setHasNet(false); //state.isConnected  Todo...
    });

    return unsubscribe;
  }, []);

  return (
    <NetContext.Provider value={{ hasNet }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={navigatorOptions}>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'none' }} />
          <Stack.Screen name="Menu" component={Menu} options={{ animation: 'none' }} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="GameSetup" component={GameSetup} />
          <Stack.Screen name="GameProgressState" component={GameProgressState} />
          <Stack.Screen name="GameInProgress" component={GameInProgress} />
          <Stack.Screen name="Preparation" component={Preparation} />
          <Stack.Screen name="GameResult" component={GameResult} />
          <Stack.Screen name="Modal" component={Modal} options={{ presentation: 'transparentModal' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NetContext.Provider>
  );
}

export default App;
