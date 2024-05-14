import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASEURL, NIVAAS_URL} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const cityService = createApi({
  reducerPath: 'cityService',
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
    getCityList: builder.query<any, {page:Number,pageSize:Number}>({
      query: ({page,pageSize}) => `${endpoints.NIVAAS_CITY}?page=${page}&pageSize=${pageSize}`,
    }),
    getApartmentList : builder.query<any,{cityId:Number,pageNo:Number,pageSize:Number}>({
      query: ({cityId,pageNo,pageSize}) => `${endpoints.NIVAAS_APARTMENT}?cityId=${cityId}&pageNo=${pageNo}&pageSize=${pageSize}`
    }),
  }),

});

export const {
  useLazyGetCityListQuery,
  useLazyGetApartmentListQuery
} = cityService;