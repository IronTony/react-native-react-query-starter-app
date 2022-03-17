import useUser from '@api/hooks/useUser';
import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import GenericHeader from '@components/GenericHeader';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { Route, useRoute } from '@react-navigation/native';
import { globalStyle } from '@theme';
import { Avatar } from '@ui-kitten/components';
import { FC } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles';

interface UserDetailsProps {
  userId: number;
}

const UserDetails: FC = () => {
  const { t } = useTranslation();
  const route = useRoute<Route<'UserDetails', UserDetailsProps>>();
  const goBack = useNavigationBackAction();
  const userId = route?.params?.userId;
  const { isLoading, data: singleUserDetails } = useUser({ userId });

  return (
    <CSafeAreaView>
      <GenericHeader onBackClicked={goBack} title={t('UserDetails:UserDetails')} />

      {isLoading && <CLoader fullPage />}

      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Avatar source={{ uri: singleUserDetails?.data?.avatar }} size="giant" />
        <View style={globalStyle.directionRow}>
          <Text
            style={styles.text}
          >{`${singleUserDetails?.data?.first_name} ${singleUserDetails?.data?.last_name}`}</Text>
        </View>
        <Text style={styles.text}>{singleUserDetails?.data?.email}</Text>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default UserDetails;
