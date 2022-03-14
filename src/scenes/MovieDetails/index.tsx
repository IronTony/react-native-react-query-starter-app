import { getFilmDetails } from '@api/movies/movies';
import { MovieDetailsSuccessPayload } from '@api/movies/types';
import CLoader from '@components/CLoader';
import CSafeAreaView from '@components/CSafeAreaView';
import GenericHeader from '@components/GenericHeader';
import { useNavigationBackAction } from '@hooks/useNavigationBack';
import { Route, useRoute } from '@react-navigation/native';
import { FC } from 'react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text } from 'react-native';
import { useQuery } from 'react-query';
import styles from './styles';

interface MovieDetailsProps {
  movieId: string;
}

const MovieDetails: FC = () => {
  const { t } = useTranslation();
  const route = useRoute<Route<'MovieDetails', MovieDetailsProps>>();
  const goBack = useNavigationBackAction();
  const movieId = route?.params?.movieId;
  const { isLoading, data: singleMovieDetails } = useQuery<MovieDetailsSuccessPayload, Error>(
    ['MovieDetails', movieId],
    () => getFilmDetails({ movieId }),
  );

  if (isLoading) {
    return <CLoader fullPage />;
  }

  return (
    <CSafeAreaView>
      <GenericHeader onBackClicked={goBack} title={t('MovieDetails:MovieDetails')} />

      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text>{singleMovieDetails?.title}</Text>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default MovieDetails;
