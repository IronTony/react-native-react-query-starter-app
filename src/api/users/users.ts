import ApiClient from '@api';
import env from '@env';
import {
  UserDetailsRequestPayload,
  UserDetailsSuccessPayload,
  UsersRequestPayload,
  UsersSuccessPayload,
} from './types';

export async function getUsers({ pageParam, per_page }: UsersRequestPayload): Promise<UsersSuccessPayload> {
  try {
    const response = await ApiClient.get<UsersSuccessPayload>(`${env.API_URL}/users`, {
      params: {
        ...(pageParam && {
          page: pageParam,
        }),
        ...(per_page && {
          per_page,
        }),
      },
    });

    return response.data;
  } catch (error) {
    console.error('getUsers - Error: ', error);
    throw error;
  }
}

export async function getUserDetails({ userId }: UserDetailsRequestPayload) {
  try {
    const response = await ApiClient.get<UserDetailsSuccessPayload>(`${env.API_URL}/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error('getUserDetails - Error: ', error);
    throw error;
  }
}
