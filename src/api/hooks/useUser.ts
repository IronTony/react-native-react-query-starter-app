import {
  CreateUserRequestPayload,
  DeleteUserRequestPayload,
  ModifyUserRequestPayload,
  UserDetailsRequestPayload,
} from '@api/users/types';
import { createUser, deleteUser, getUserDetails, modifyUser } from '@api/users/users';
import { useMutation, useQuery } from 'react-query';

function useUser({ userId }: UserDetailsRequestPayload) {
  return useQuery([`user-${userId}`, { userId }], () => getUserDetails({ userId }), {
    enabled: !!userId,
  });
}

function useCreateUser() {
  return useMutation('new-user', ({ name, job }: CreateUserRequestPayload) => createUser({ name, job }), {
    onSuccess: data => console.log('useCreateUser onSuccess>>> ', data),
  });
}

function useModifyUser() {
  return useMutation(
    'modify-user',
    ({ userId, name, job }: ModifyUserRequestPayload) => modifyUser({ userId, name, job }),
    {
      onSuccess: data => console.log('useModifyUser onSuccess>>> ', data),
    },
  );
}

function useDeleteUser() {
  return useMutation('delete-user', ({ userId }: DeleteUserRequestPayload) => deleteUser({ userId }));
}

export { useUser, useCreateUser, useModifyUser, useDeleteUser };
