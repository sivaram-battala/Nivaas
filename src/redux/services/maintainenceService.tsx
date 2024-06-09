import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { NIVAAS_URL} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const maintainenceService = createApi({
  reducerPath: 'maintainenceService',
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
    getSocietyDues : builder.query<any,{pageNo:Number,pageSize:Number}>({
      query: ({pageNo,pageSize}) => `${endpoints.SOCIETY_DUES}?pageNo=${pageNo}&pageSize=${pageSize}`
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
  useLazyGetSocietyDuesQuery,
  useNotifyOnMutation,
  useCreateFlatByaptOwnMutation,
  useUpdateFlatDetailsMutation,
} = maintainenceService;