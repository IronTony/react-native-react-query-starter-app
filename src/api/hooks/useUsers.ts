import { UsersSuccessPayload } from '@api/users/types';
import { getUsers } from '@api/users/users';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useUsers({ per_page = 5 }) {
  return useInfiniteQuery<UsersSuccessPayload, Error>(
    ['users'],
    ({ pageParam = 1 }) => getUsers({ pageParam, per_page }),
    {
      keepPreviousData: true,
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }

        return undefined;
      },
    },
  );
}
