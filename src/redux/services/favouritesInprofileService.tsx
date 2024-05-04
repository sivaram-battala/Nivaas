import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE, POPULARURL} from '../../api/api';
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

export const favouriteService = createApi({
  reducerPath: 'favouriteService',
  baseQuery: createBaseQuery(BASE),
  endpoints: (builder) => ({
    getFavourites: builder.query<any, {custId:number , pgno :number ,pgSize :number }>({
      query: ({ custId ,pgno ,pgSize}) => `${endpoints.NEW_GET_MY_TEMPELS_LIST}=${custId}&page=${pgno}&pageSize=${pgSize}`
    }),
    postFollowAndUnfollow : builder.mutation<any, {}>({
      query: payload => ({
        url: `${endpoints.NEW_FOLLOW_UMFOLLOW}`,
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
  useLazyGetFavouritesQuery,
  usePostFollowAndUnfollowMutation,
} = favouriteService;


export const getTempleDetailsWithIdService = createApi({
    reducerPath: 'getTempleDetailsWithIdService',
    baseQuery: createBaseQuery(POPULARURL),
    endpoints: (builder) => ({
        getTempleDetailsWithId : builder.query<any, {id:number }>({
        query: ({id}) => `${endpoints.NEW_GET_TEMPLESDETAILS_WITH_TEMPID}/${id}`
      }),
      
    })
  });
  
  export const {
    useLazyGetTempleDetailsWithIdQuery
  } = getTempleDetailsWithIdService;
