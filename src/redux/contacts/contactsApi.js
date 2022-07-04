import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62c08dc7c134cf51ced1105d.mockapi.io',
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contact'],
    }),
    createContact: builder.mutation({
      query: newContact => ({
        url: '/contacts',
        method: 'POST',
        body: (newContact = {
          name: newContact.name,
          phone: newContact.phone,
        }),
        providesTags: ['Contact'],
      }),
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    // filterContact: builder.query({
    //   query: name => `/contacts/`,
    //   providesTags: ['Contact'],
    // }),
  }),
});

export const {
  useFetchContactsQuery,
  useDeleteContactMutation,
  useCreateContactMutation,
  // useFilterContactQuery,
} = contactsApi;
