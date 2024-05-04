import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE, BASEURL, DONATION_URL, MEMBER_SHIP_URL, POPULARURL,} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


const createBaseQuery = (baseUrl) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth.token;
      if (token && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  });
};

export const userProfileService = createApi({
  reducerPath: 'userProfileService',
  baseQuery: createBaseQuery(DONATION_URL),
  endpoints: (builder) => ({
    getDonation: builder.query<any, any>({
      query: (profileId) =>  `${endpoints.MY_DONATIONS}?profileId=${profileId}`,
    })
  }),
});

export const userProfileService2 = createApi({
  reducerPath: 'userProfileService2',
  baseQuery: createBaseQuery(BASE),
  endpoints: (builder) => ({
    getCustomerData: builder.query<any, any>({
      query: () => endpoints.NEW_GET_CURRENT_USER,
    }),
    getUserReels: builder.query<any, { pageNo: number; pageSize: number }>({
      query: ({ pageNo, pageSize}) =>  `${endpoints.CUSTOMER_REELS}?pageNo=${pageNo}&pageSize=${pageSize}`,
    }),
    postProfilePic: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.UPDATE_PROFILE_PICTURE,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    updateProfile: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.UPDATE_PROFILE,
        method: 'PUT',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const userProfileService3 = createApi({
  reducerPath: 'userProfileService3',
  baseQuery: createBaseQuery(POPULARURL),
  endpoints: (builder) => ({
    getAdminTemple: builder.query<any, any>({
      query: () => endpoints.ADMIN_TEMPLES,
    })
  }),
});


export const userProfileService4 = createApi({
  reducerPath: 'userProfileService4',
  baseQuery: createBaseQuery(MEMBER_SHIP_URL),
  endpoints: (builder) => ({
    getMyMeberShip: builder.query<any, { pageNo: number; pageSize: number , profileId:number }>({
      query: ({ pageNo, pageSize , profileId}) =>  `${endpoints.MY_MEMBERSHIPS}?profileId=${profileId}&pageNo=${pageNo}&pageSize=${pageSize}`,
    })
  }),
});

export const userProfileService5 = createApi({
  reducerPath: 'userProfileService5',
  baseQuery: createBaseQuery(BASEURL),
  endpoints: (builder) => ({
    updateProfile: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.UPDATE_PROFILE,
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
useLazyGetDonationQuery,
} = userProfileService;

export const {
  useLazyGetCustomerDataQuery,
  useLazyGetUserReelsQuery,
  usePostProfilePicMutation,
} = userProfileService2;

export const {
  useLazyGetAdminTempleQuery
  } = userProfileService3;

  
export const {
  useLazyGetMyMeberShipQuery
  } = userProfileService4;
    
export const {
  useUpdateProfileMutation
  } = userProfileService5;