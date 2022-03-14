import { getAllFilms } from '@api/movies/movies';
import { MoviesSuccessPayload } from '@api/movies/types';
import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import GenericHeader from '@components/GenericHeader';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import * as React from 'react';
import { useCallback, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useQuery } from 'react-query';
import styles from './styles';

const MoviesList: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<GenericNavigationProps>();
  const goBack = useNavigationBackAction();
  const {
    isLoading: isMoviesLoading,
    // isError,
    data: allMovies,
    refetch: getAllMovies,
    // error,
  } = useQuery<MoviesSuccessPayload[], Error>('allMovies', getAllFilms);

  const onGotoMovieDetails = useCallback(
    (movieId: string) => {
      navigation.navigate('MovieDetails', {
        movieId,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.SingleItem} key={item.key}>
        <TouchableOpacity onPress={() => onGotoMovieDetails(item.id)}>
          <Text style={styles.mainText}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    ),
    [onGotoMovieDetails],
  );

  useFocusEffect(
    useCallback(() => {
      getAllMovies();
    }, [getAllMovies]),
  );

  return (
    <CSafeAreaView>
      <GenericHeader onBackClicked={goBack} title={t('MoviesList:MoviesList')} />

      {isMoviesLoading && <CLoader fullPage />}

      <FlatList
        data={allMovies}
        style={styles.container}
        contentContainerStyle={styles.content}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </CSafeAreaView>
  );
};

export default React.memo(MoviesList);
