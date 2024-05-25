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
    getApartmentList : builder.query<any,{cityId:Number}>({
      query: ({cityId}) => `${endpoints.NIVAAS_APARTMENT}?cityId=${cityId}`
    }),
    getFlatsList : builder.query<any,{flatId:Number,pageNo:Number,pageSize:Number}>({
      query: ({flatId,pageNo,pageSize}) => `${endpoints.NIVAAS_FLAT}?apartmentId=${flatId}&pageNo=${pageNo}&pageSize=${pageSize}`
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
        url: endpoints.NIVAAS_NEW_APARTMENT_ONBOARD,
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
  useUserOnBoardingMutation,
  useNewApartmentOnboardingMutation,
} = cityService;

// const flatPayload = {
    //   flatId: apartmentValue?.id,
    //   pageNo: 0,
    //   pageSize: 100,
    // };
    // getflatdata(flatPayload)
    //   .unwrap()
    //   .then(responce => {
    //     // console.log(responce?.data,'<==============flatdata');
    //     setflatdata(responce?.data);
    //   })
    //   .catch(error => {
    //     console.log('error in flat data==========>', error);
    //   });