import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASEURL, NIVAAS_URL} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const myAccountService = createApi({
  reducerPath: 'myAccountService',
  baseQuery: fetchBaseQuery({
    baseUrl: NIVAAS_URL,
    prepareHeaders: (headers, {getState, endpoint}) => {
      const token = (getState() as RootState).auth.token;
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }), 
  endpoints: builder => ({
    getCurrentCustomer : builder.query<any,{}>({
      query: () => `${endpoints.NIVAAS_CURRENT_CUSTOMER}`
    }),
    postProfilePic: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.NIVAAS_PROFILE_PIC,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    userDetails: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.USER_DETAILS,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useLazyGetCurrentCustomerQuery,
  usePostProfilePicMutation,
  useUserDetailsMutation
} = myAccountService;