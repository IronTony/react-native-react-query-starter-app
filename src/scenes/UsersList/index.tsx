import useUsers from '@api/hooks/useUsers';
import { User } from '@api/users/types';
import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { Avatar, FlatList, Flex, Icon, Pressable, Text } from 'native-base';
import * as React from 'react';
import { useCallback, FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UsersList: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<GenericNavigationProps>();
  const { setOptions } = useNavigation<GenericNavigationProps>();
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
      <Pressable onPress={() => onGotoUserDetails(item?.id)}>
        <Flex flex={1} flexDirection="row" paddingY="20px" key={item.id} alignItems="center">
          <Avatar source={{ uri: item?.avatar }} size="md" />
          <Text
            color="CLOUDS"
            fontFamily="body"
            fontStyle="normal"
            fontSize="md"
            paddingY="10px"
            paddingX="10px">{`${item.first_name} ${item.last_name}`}</Text>
        </Flex>
      </Pressable>
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

  useLayoutEffect(() => {
    setOptions({
      headerLeft: () => (
        <Flex flex={1} justifyContent="center">
          <Pressable onPress={goBack}>
            <Icon as={MaterialIcons} name="arrow-back-ios" color="MIDNIGHT_BLUE" size="24px" />
          </Pressable>
        </Flex>
      ),
      headerTitle: () => (
        <Text fontSize="20px" fontFamily="body" fontWeight={700}>
          {t('UsersList:UsersList')}
        </Text>
      ),
    });
  }, [goBack, setOptions, t]);

  return (
    <CSafeAreaView>
      {usersLoading && <CLoader fullPage />}

      <FlatList
        data={flattenUsersList}
        backgroundColor="pageBackground"
        // @TODO: Problem of NativeBase types
        _contentContainerStyle={{
          padding: 15,
        }}
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
