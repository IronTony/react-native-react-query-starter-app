import ApiClient from '@api';
import env from '@env';
import { GetAllFilmsSuccessPayload } from './types';

export async function getAllFilms() {
  try {
    const response = await ApiClient.get<GetAllFilmsSuccessPayload[]>(`${env.API_URL}/films`);

    return response.data;
  } catch (error) {
    console.error('getAllFilms - Error: ', error);
    throw error;
  }
}
