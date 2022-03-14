import ApiClient from '@api';
import env from '@env';
import { MovieDetailsRequestPayload, MovieDetailsSuccessPayload, MoviesSuccessPayload } from './types';

export async function getAllFilms() {
  try {
    const response = await ApiClient.get<MoviesSuccessPayload[]>(`${env.API_URL}/films`);

    return response.data;
  } catch (error) {
    console.error('getAllFilms - Error: ', error);
    throw error;
  }
}

export async function getFilmDetails({ movieId }: MovieDetailsRequestPayload) {
  try {
    const response = await ApiClient.get<MovieDetailsSuccessPayload>(`${env.API_URL}/films/${movieId}`);

    return response.data;
  } catch (error) {
    console.error('getFilmDetails - Error: ', error);
    throw error;
  }
}
