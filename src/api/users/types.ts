export type UsersRequestPayload = {
  pageParam?: number;
  per_page?: number;
};

export type UsersSuccessPayload = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data?: User[] | null;
  support: Support;
};

export type UserDetailsRequestPayload = {
  userId: number;
};

export type UserDetailsSuccessPayload = {
  data: User;
  support: Support;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export interface Support {
  url: string;
  text: string;
}
