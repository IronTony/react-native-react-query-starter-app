import { AntDesignIconsPack } from '@components/IconsAdapter/antdesign-icons';
import { EntypoIconsPack } from '@components/IconsAdapter/entypo-icons';
import { EvilIconsPack } from '@components/IconsAdapter/evil-icons';
import { FeatherIconsPack } from '@components/IconsAdapter/feather-icons';
import { FontAwesome5IconsPack } from '@components/IconsAdapter/fontawesome5-icons';
import { FontAwesomeIconsPack } from '@components/IconsAdapter/fontawesome-icons';
import { FontistoIconsPack } from '@components/IconsAdapter/fontisto-icons';
import { FoundationIconsPack } from '@components/IconsAdapter/foundation-icons';
import { IoniconsIconsPack } from '@components/IconsAdapter/ionicons-icons';
import { MaterialIconsPack } from '@components/IconsAdapter/material-icons';
import { MaterialCommunityIconsPack } from '@components/IconsAdapter/materialcommunity-icons';
import { OcticonsIconsPack } from '@components/IconsAdapter/octicons-icons';
import { SimpleLineIconsIconsPack } from '@components/IconsAdapter/simpleline-icons';
import { ZocialIconsPack } from '@components/IconsAdapter/zocial-icons';
import Splashscreen from '@components/Splashscreen';
import * as eva from '@eva-design/eva';
import '@i18n';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from '@routes';
import { isMountedRef, navigationRef } from '@routes/navigationUtils';
import theme, { globalStyle } from '@theme';
import { palette } from '@theme/colors';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import React, { FC, Suspense, useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';

enableScreens();

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App: FC = () => {
  useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Suspense fallback={<Splashscreen />}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <IconRegistry
          icons={[
            AntDesignIconsPack,
            EntypoIconsPack,
            EvilIconsPack,
            FeatherIconsPack,
            FontAwesomeIconsPack,
            FontAwesome5IconsPack,
            FontistoIconsPack,
            FoundationIconsPack,
            IoniconsIconsPack,
            MaterialIconsPack,
            MaterialCommunityIconsPack,
            OcticonsIconsPack,
            SimpleLineIconsIconsPack,
            ZocialIconsPack,
          ]}
        />

        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
              <StatusBar barStyle="dark-content" backgroundColor={palette.WHITE} />

              <Layout style={[globalStyle.flex1, globalStyle.justifyCenter]}>
                <RootStackScreen />
              </Layout>
            </NavigationContainer>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ApplicationProvider>
    </Suspense>
  );
};

export default App;
