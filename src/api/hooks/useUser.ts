import { UserDetailsRequestPayload, UserDetailsSuccessPayload } from '@api/users/types';
import { getUserDetails } from '@api/users/users';
import { useQuery } from 'react-query';

export default function useUser({ userId }: UserDetailsRequestPayload) {
  return useQuery<UserDetailsSuccessPayload, Error>([`user-${userId}`, { userId }], () => getUserDetails({ userId }), {
    enabled: !!userId,
  });
}
