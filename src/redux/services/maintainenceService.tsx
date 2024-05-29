import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASEURL, NIVAAS_URL} from '../../api/api';
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
    addPrepaidMeter: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.ADD_PREPAIDMETER,
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
    useAddPrepaidMeterMutation,
} = maintainenceService;