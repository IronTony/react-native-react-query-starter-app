import { getAllFilms } from '@api/movies/movies';
import { GetAllFilmsSuccessPayload } from '@api/movies/types';
import GenericHeader from '@components/GenericHeader';
import NHCSafeAreaView from '@components/NHCSafeAreaView';
import { useNavigation, StackActions } from '@react-navigation/native';
import * as React from 'react';
import { useCallback, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import styles from './styles';

const OtherPage: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const popAction = useCallback(() => StackActions.pop(), []);
  const {
    isLoading: isMoviesLoading,
    // isError,
    data: allMovies,
    // refetch: getAllMovies,
    // error,
  } = useQuery<GetAllFilmsSuccessPayload[], Error>('allMovies', getAllFilms);

  const goBack = useCallback(() => {
    navigation.dispatch(popAction);
  }, [navigation, popAction]);

  const renderItem = useCallback(
    ({ item }) => (
      <View key={item.key}>
        <Text style={styles.mainText}>{item.title}</Text>
      </View>
    ),
    [],
  );

  return (
    <NHCSafeAreaView>
      <GenericHeader onBackClicked={goBack} title={t('AnotherPage:OtherPage')} />

      {isMoviesLoading && <Text>Is loading...</Text>}

      <FlatList
        data={allMovies}
        style={styles.container}
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </NHCSafeAreaView>
  );
};

export default React.memo(OtherPage);
