import { Stack } from 'expo-router';
import { colors } from '@/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { 
    useFonts,
    Rubik_600SemiBold,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold
} from '@expo-google-fonts/rubik';

import { Loading } from '@/components/loading';
import { StatusBar } from 'expo-status-bar';

export default function _Layout() {
    // Carregando fontes
    const [fontsLoaded] = useFonts({
        Rubik_600SemiBold,
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_700Bold
    });

    // Verifica se as fontes foram carregadas
    if (!fontsLoaded) {
        return <Loading />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar backgroundColor="transparent" translucent={true} />
            
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: colors.gray[100],
                    },
                }}
            />
        </GestureHandlerRootView>
    );
}
