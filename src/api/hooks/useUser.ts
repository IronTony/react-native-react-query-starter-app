import {
  CreateUserRequestPayload,
  CreateUserSuccessPayload,
  DeleteUserRequestPayload,
  ModifyUserRequestPayload,
  ModifyUserSuccessPayload,
  UserDetailsRequestPayload,
  UserDetailsSuccessPayload,
} from '@api/users/types';
import { createUser, deleteUser, getUserDetails, modifyUser } from '@api/users/users';
import { useMutation, useQuery } from 'react-query';

function useUser({ userId }: UserDetailsRequestPayload) {
  return useQuery<UserDetailsSuccessPayload, Error>([`user-${userId}`, { userId }], () => getUserDetails({ userId }), {
    enabled: !!userId,
  });
}

function useCreateUser({ name, job }: CreateUserRequestPayload) {
  return useMutation<CreateUserSuccessPayload, Error>([`new-user`, { name, job }], () => createUser({ name, job }));
}

function useModifyUser({ userId, name, job }: ModifyUserRequestPayload) {
  return useMutation<ModifyUserSuccessPayload, Error>([`modify-${userId}`, { userId, name, job }], () =>
    modifyUser({ userId, name, job }),
  );
}

function useDeleteUser({ userId }: DeleteUserRequestPayload) {
  return useMutation<Response, Error>([`del-user-${userId}`, { userId }], () => deleteUser({ userId }));
}

export { useUser, useCreateUser, useModifyUser, useDeleteUser };
