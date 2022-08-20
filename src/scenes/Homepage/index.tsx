import { useCreateUser, useDeleteUser, useModifyUser } from '@api/hooks/useUser';
import EnvInfoView from '@components/AppVersion';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Button, Flex, Icon, ScrollView, Text } from 'native-base';
import React, { useCallback, FC, memo, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Home: FC = () => {
  const [t, i18n] = useTranslation();
  const navigation = useNavigation<GenericNavigationProps>();
  const { setOptions } = useNavigation<GenericNavigationProps>();
  const { mutate: createUser } = useCreateUser();
  const { mutate: modifyUser } = useModifyUser();
  const { mutate: deleteUser } = useDeleteUser();
  const currentLocale = i18n.language;

  const switchLocaleToEn = useCallback(() => {
    i18n.changeLanguage('en');
  }, [i18n]);

  const switchLocaleToIt = useCallback(() => {
    i18n.changeLanguage('it');
  }, [i18n]);

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => <></>,
      headerTitle: () => <Icon as={FontAwesome5} name="react" color="PETER_RIVER" size="30px" />,
    });
  }, [setOptions]);

  return (
    <CSafeAreaView>
      <ScrollView
        backgroundColor="pageBackground"
        _contentContainerStyle={{
          alignItems: 'center',
          flex: 1,
          flexGrow: 1,
          justifyContent: 'center',
          padding: '15px',
        }}>
        <Text
          color="WHITE"
          fontFamily="body"
          fontWeight={700}
          fontStyle="normal"
          fontSize="3xl"
          paddingBottom="20px"
          textAlign="center">
          {t('Homepage:welcome')}
        </Text>
        <Text
          color="WHITE"
          fontFamily="body"
          fontWeight={400}
          fontStyle="normal"
          fontSize="sm"
          paddingBottom="20px"
          textAlign="center">
          {t('Homepage:releasedWithLove')}
        </Text>

        <Flex flexDirection="row">
          <Button
            backgroundColor="CARROT"
            onPress={switchLocaleToIt}
            margin={2}
            isPressed={currentLocale === 'it'}
            _pressed={{
              backgroundColor: currentLocale === 'it' ? 'primary' : 'tertiary',
            }}>
            <Text color="WHITE" fontFamily="body" fontStyle="normal">
              {t('common:italian')}
            </Text>
          </Button>

          <Button
            backgroundColor="CARROT"
            onPress={switchLocaleToEn}
            margin={2}
            isPressed={currentLocale === 'en'}
            _pressed={{
              backgroundColor: currentLocale === 'en' ? 'primary' : 'tertiary',
            }}>
            <Text color="WHITE" fontFamily="body" fontStyle="normal">
              {t('common:english')}
            </Text>
          </Button>
        </Flex>

        <Button
          onPress={() => navigation.navigate('Main', { screen: 'UsersList' })}
          backgroundColor="SUN_FLOWER"
          mb="5px">
          <Flex flexDirection="row" alignItems="center">
            <Icon as={EvilIcons} name="arrow-right" color="WHITE" marginRight={2} fontSize={20} />
            <Text color="WHITE" fontFamily="body" fontStyle="normal">
              {t('Homepage:gotoUsersList')}
            </Text>
          </Flex>
        </Button>

        <Button onPress={() => createUser({ name: 'John', job: 'some-title' })} backgroundColor="SUN_FLOWER" mb="5px">
          <Flex flexDirection="row" alignItems="center">
            <Icon as={EvilIcons} name="arrow-right" color="WHITE" marginRight={2} fontSize={20} />
            <Text color="WHITE" fontFamily="body" fontStyle="normal">
              {t('Homepage:createNewUser')}
            </Text>
          </Flex>
        </Button>

        <Button
          onPress={() => modifyUser({ userId: '666', name: 'Jil', job: 'some-title-edited' })}
          backgroundColor="SUN_FLOWER"
          mb="5px">
          <Flex flexDirection="row" alignItems="center">
            <Icon as={EvilIcons} name="arrow-right" color="WHITE" marginRight={2} fontSize={20} />
            <Text color="WHITE" fontFamily="body" fontStyle="normal">
              {t('Homepage:ModifyUser')}
            </Text>
          </Flex>
        </Button>

        <Button onPress={() => deleteUser({ userId: '999' })} backgroundColor="SUN_FLOWER" mb="5px">
          <Flex flexDirection="row" alignItems="center">
            <Icon as={EvilIcons} name="arrow-right" color="WHITE" marginRight={2} fontSize={20} />
            <Text color="WHITE" fontFamily="body" fontStyle="normal">
              {t('Homepage:DeleteUser')}
            </Text>
          </Flex>
        </Button>

        <Button
          alignSelf="center"
          backgroundColor="TRANSPARENT"
          borderColor="ALIZARIN"
          borderWidth={1}
          marginTop={15}
          onPress={() => navigation.navigate('MyModal')}>
          <Text color="WHITE" fontFamily="body" fontStyle="normal">
            {t('Homepage:openModal')}
          </Text>
        </Button>

        <EnvInfoView />
      </ScrollView>
    </CSafeAreaView>
  );
};

export default memo(Home);
