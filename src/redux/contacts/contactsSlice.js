import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildQueries } from '@testing-library/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62c08dc7c134cf51ced1105d.mockapi.io',
  }),
  endpoints: builder => ({
    fetchContacts: builder.query({ query: () => `/contacts` }),
  }),
});

export const { useFetchContactsQuery } = contactsApi;
