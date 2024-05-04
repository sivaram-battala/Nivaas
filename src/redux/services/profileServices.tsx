import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE, DONATION_URL, MEMBER_SHIP_URL, POPULARURL} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

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

export const savedPostsService = createApi({
  reducerPath: 'savedPostsService',
  baseQuery: createBaseQuery(BASE),
  endpoints: (builder) => ({
    getSavedPosts: builder.query<any, { pgno: number; pgSize: number }>({
      query: () => endpoints.GET_SAVED_POSTS_LIST
    }),
    getEachFeedById : builder.query<any, {id:number}>({
        query: ({id}) => `${endpoints.FEED}/${id}`
    }),
    uploadTemplePic: builder.mutation<any, {payload: any; profileId: number}>({
      query: ({payload, profileId}) => ({
        url:`${endpoints.UPLOAD_TEMPLE_PROFILE_PIC}?profileId=${profileId}`,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  })
});

export const {
  useLazyGetSavedPostsQuery,
  useLazyGetEachFeedByIdQuery,
  useUploadTemplePicMutation,
} = savedPostsService;



export const ProfileMembershipsDataService = createApi({
  reducerPath: 'ProfileMembershipsData',
  baseQuery: createBaseQuery(MEMBER_SHIP_URL),
  endpoints: (builder) => ({
    getProfileMemebershipsData: builder.query<any, { pgno: number; pgsz: number }>({
      query: ({pgno,pgsz}) => `${endpoints.PROFILE_MEMBERSHIPS}?pageNo=${pgno}&pageSize=${pgsz}`
    }),
  })
});

export const {
  useLazyGetProfileMemebershipsDataQuery
} = ProfileMembershipsDataService;

export const profileDonationsListService = createApi({
  reducerPath: 'profileDonationsList',
  baseQuery: createBaseQuery(DONATION_URL),
  endpoints: (builder) => ({
    getProfileDonationsList: builder.query<any, {}>({
      query: () => endpoints.PROFILE_DONATIONS
    }),
  })
});

export const {
  useLazyGetProfileDonationsListQuery
} = profileDonationsListService;


export const adminTempleProfilesService = createApi({
  reducerPath: 'adminTempleProfiles',
  baseQuery: createBaseQuery(POPULARURL),
  endpoints: (builder) => ({
    getadminTempleProfiles: builder.query<any, {}>({
      query: () => endpoints.ADMIN_TEMPLES
    }),
    deleteCommunityTemple : builder.mutation<any,{id : number}>({
      query: ({id}) =>({
        url: `${endpoints.DELETE_COMMUNITY_TEMPLE}?profileId=${id}`,
        method: 'DELETE',
        credentials: 'include',
      })
    }),
    createCommunityTemple: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.CREATE_COMMUNITY_TEMPLE,
        method: 'POST',
        body: payload,
        header: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  })
});

export const {
  useLazyGetadminTempleProfilesQuery,
  useDeleteCommunityTempleMutation,
  useCreateCommunityTempleMutation,
} = adminTempleProfilesService;