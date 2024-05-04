import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE, DONATION_URL, POPULARURL, } from '../../api/api';
import { RootState } from '../store';
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

export const feedService = createApi({
  reducerPath: 'feedService',
  baseQuery: createBaseQuery(BASE),
  endpoints: (builder) => ({
    createFeedPost: builder.mutation<any, any>({
      query: formdata => ({
        url: endpoints.CEATE_FEED,
        method: 'POST',
        body: formdata,
        headers: {'Content-Type' : 'multipart/form-data'},
        formData: true
      }),
    }),
    createVideoPost: builder.mutation<any, {}>({
      query: payload => ({
        url: endpoints.SAVE_REEL,
        method: 'POST',
        body: payload,
      }),
    }),
    userFeed: builder.query<any, any>({
      query: (id) => `${endpoints.FEED}/${id}`
    }),
    getPosts: builder.query<any, { pageNo: number; pageSize: number; id: number }>({
      query: ({ pageNo, pageSize, id }) => `${endpoints.GET_POSTS}?page=${pageNo}&pageSize=${pageSize}&id=${id}`,
    }),
    deleteFeed : builder.mutation<any,{id : number}>({
      query: ({id}) =>({
        url:`${endpoints.DELETE_FEED}=${id}`,
        method: 'DELETE',
        credentials: 'include',
      })
    }),
    likesList : builder.query<any,{id : number, pgNo: number, pgSz: number}>({
      query: ({pgNo, pgSz, id}) =>({
        url:`${endpoints.FEED_LIKE}?feedId=${id}&pageNo=${pgNo}&pageSize=${pgSz}`,
      })
    }),
  }),
});

export const {
  useCreateFeedPostMutation,
  useCreateVideoPostMutation,
  useLazyUserFeedQuery,
  useLazyGetPostsQuery,
  useDeleteFeedMutation,
  useLazyLikesListQuery,
} = feedService
