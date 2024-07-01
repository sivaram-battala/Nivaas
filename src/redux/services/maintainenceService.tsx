import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL_CUSTOMER} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const maintainenceService = createApi({
  reducerPath: 'maintainenceService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL_CUSTOMER,
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
    getUserSocietyDues : builder.query<any,{apartmentId:Number,flatId:Number,year:Number,month:Number}>({
      query: ({apartmentId,flatId,year,month}) => `${endpoints.USER_SOCIETY_DUES}/${apartmentId}/flat/${flatId}?year=${year}&month=${month}`
    }), 
    getAdminSocietyDues : builder.query<any,{apartmentId:Number,year:Number,month:Number,pageNo:Number,pageSize:Number}>({
      query: ({apartmentId,year,month,pageNo,pageSize}) => `${endpoints.ADMIN_SOCIETY_DUES}/${apartmentId}/${year}/${month}?pageNo=${pageNo}&pageSize=${pageSize}`
    }), 
    notifyOn: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.MAINTAINENCE_SAVE,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    createFlatByaptOwn: builder.mutation<any, {}>({
        query: payload => ({
          url: endpoints.ONBOARD_NEW_FLATS,
          method: 'POST',
          body: payload,
          header: {
            'Content-Type': 'application/json',
          },
        }),
    }),
    updateFlatDetails: builder.mutation<any, {apartmentId:Number,flatId:Number,payload:any}>({
      query: ({payload,apartmentId,flatId}) => ({
        url:  `${endpoints.UPDATE_ONBOARDED_FLATS_DETAILS}/${apartmentId}/flat/${flatId}/update`,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useLazyGetUserSocietyDuesQuery,
  useLazyGetAdminSocietyDuesQuery,
  useNotifyOnMutation,
  useCreateFlatByaptOwnMutation,
  useUpdateFlatDetailsMutation,
} = maintainenceService;