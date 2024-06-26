import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL_CUSTOMER} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const cityService = createApi({
  reducerPath: 'cityService',
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
    getCityList: builder.query<any, {page:Number,pageSize:Number}>({
      query: ({page,pageSize}) => `${endpoints.GET_CITY}?page=${page}&pageSize=${pageSize}`,
    }),
    getApartmentList : builder.query<any,{cityId:Number}>({
      query: ({cityId}) => `${endpoints.GET_APARTMENT}?cityId=${cityId}`
    }),
    getFlatsList : builder.query<any,{flatId:Number,pageNo:Number,pageSize:Number}>({
      query: ({flatId,pageNo,pageSize}) => `${endpoints.GET_FLATS}?apartmentId=${flatId}&pageNo=${pageNo}&pageSize=${pageSize}`
    }),
    getPostalCodeList : builder.query<any,{pageNo:Number,pageSize:Number}>({
      query: ({pageNo,pageSize}) => `${endpoints.GET_POSTALCODES}?pageNo=${pageNo}&pageSize=${pageSize}`
    }),
    getCustomerOnboardRequests : builder.query<any,{}>({
      query: () => `${endpoints.GET_CUSTOMER_ONBOARD_REQUESTS}`
    }),
    userOnBoarding: builder.mutation<any, {}>({
      query: (payload) => ({
        url: endpoints.NIVAAS_ONBOARD,
        method: 'POST',
        body: payload,
      }),
    }),
    newApartmentOnboarding: builder.mutation<any, {}>({
      query: (payload) => ({
        url: endpoints.NEW_APARTMENT_ONBOARD,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLazyGetCityListQuery,
  useLazyGetApartmentListQuery,
  useLazyGetFlatsListQuery,
  useLazyGetCustomerOnboardRequestsQuery,
  useLazyGetPostalCodeListQuery,
  useUserOnBoardingMutation,
  useNewApartmentOnboardingMutation,
} = cityService;
