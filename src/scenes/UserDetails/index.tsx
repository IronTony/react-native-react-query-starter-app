import { useUser } from '@api/hooks/useUser';
import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Avatar, Flex, Icon, Pressable, ScrollView, Text } from 'native-base';
import { FC, useLayoutEffect } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface UserDetailsProps {
  userId: number;
}

const UserDetails: FC = () => {
  const { t } = useTranslation();
  const route = useRoute<Route<'UserDetails', UserDetailsProps>>();
  const { setOptions } = useNavigation<GenericNavigationProps>();
  const goBack = useNavigationBackAction();
  const userId = route?.params?.userId;
  const { isLoading, data: singleUserDetails } = useUser({ userId });

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => (
        <Pressable onPress={goBack}>
          <Icon as={MaterialIcons} name="arrow-back-ios" color="MIDNIGHT_BLUE" size="24px" />
        </Pressable>
      ),
      headerTitle: () => (
        <Text fontSize="20px" fontFamily="body" fontWeight={700}>
          {t('UserDetails:UserDetails')}
        </Text>
      ),
    });
  }, [goBack, setOptions, t]);

  return (
    <CSafeAreaView>
      {isLoading && <CLoader fullPage />}

      <ScrollView
        backgroundColor="pageBackground"
        _contentContainerStyle={{
          padding: '15px',
        }}
        showsVerticalScrollIndicator={false}>
        <Avatar source={{ uri: singleUserDetails?.data?.avatar }} size="lg" />
        <Flex>
          <Text
            color="CLOUDS"
            fontFamily="body"
            fontStyle="normal"
            fontSize="md"
            paddingY="10px">{`${singleUserDetails?.data?.first_name} ${singleUserDetails?.data?.last_name}`}</Text>
        </Flex>
        <Text color="CLOUDS" fontFamily="body" fontStyle="normal" fontSize="md" paddingY="10px">
          {singleUserDetails?.data?.email}
        </Text>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default UserDetails;
