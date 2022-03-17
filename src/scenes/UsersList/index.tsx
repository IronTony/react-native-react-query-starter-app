import useUsers from '@api/hooks/useUsers';
import { User } from '@api/users/types';
import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import GenericHeader from '@components/GenericHeader';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { globalStyle } from '@theme';
import { Avatar } from '@ui-kitten/components';
import * as React from 'react';
import { useCallback, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

const UsersList: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<GenericNavigationProps>();
  const goBack = useNavigationBackAction();
  const {
    isLoading: usersLoading,
    data: usersData,
    refetch: getAllUsers,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useUsers({ per_page: 5 });
  const flattenUsersList = usersData?.pages ? usersData.pages.flatMap(page => [...(page?.data ?? [])]) : [];

  const onGotoUserDetails = useCallback(
    (userId: number) => {
      navigation.navigate('UserDetails', {
        userId,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <View style={styles.SingleItem} key={item.id}>
        <TouchableOpacity onPress={() => onGotoUserDetails(item?.id)} style={globalStyle.directionRow}>
          <Avatar source={{ uri: item?.avatar }} size="large" />
          <Text style={styles.mainText}>{`${item.first_name} ${item.last_name}`}</Text>
        </TouchableOpacity>
      </View>
    ),
    [onGotoUserDetails],
  );

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  useFocusEffect(
    useCallback(() => {
      getAllUsers();
    }, [getAllUsers]),
  );

  return (
    <CSafeAreaView>
      <GenericHeader onBackClicked={goBack} title={t('UsersList:UsersList')} />

      {usersLoading && <CLoader fullPage />}

      <FlatList
        data={flattenUsersList}
        style={styles.container}
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        onRefresh={getAllUsers}
        refreshing={usersLoading}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? <CLoader size={20} /> : null}
      />
    </CSafeAreaView>
  );
};

export default React.memo(UsersList);
