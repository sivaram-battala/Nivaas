import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { NIVAAS_URL} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const ExpancesService = createApi({
  reducerPath: 'ExpancesService',
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
    getAllExpances: builder.query<any, {page:Number,pageSize:Number}>({
        query: ({page,pageSize}) => `${endpoints.GET_EXPANCES}/6/year/2024/month/5`,
    }),
    getExpancesById: builder.query<any, {page:Number,pageSize:Number}>({
        query: ({page,pageSize}) => `${endpoints.GET_EXPANCES_BY_ID}/6`,
    }),
    getExpancesPDF: builder.query<any, {page:Number,pageSize:Number}>({
        query: ({page,pageSize}) => `${endpoints.GET_EXPANCES_PDF}/6/year/2024/month/5`,
    }),
    addDebitHistory: builder.mutation<any, {apartmentId:Number,flatId:Number,payload:any}>({
        query: ({payload,apartmentId,flatId}) => ({
          url:  `${endpoints.ADD_DEBIT_HISTORY}`,
          method: 'POST',
          body: payload,
          header: {
            'Content-Type': 'application/json',
          },
        }),
    }),
    deleteExpances : builder.mutation<any,{id : number}>({
        query: ({id}) =>({
          url:`${endpoints.DELETE_EXPANCES}/6/debit/1`,
          method: 'DELETE',
          credentials: 'include',
        })
    }),
    updateDebitHistory: builder.mutation<any, {}>({
        query: payload => ({
          url: `${endpoints.UPDATE_DEBIT_HISTORY}/{id}`,
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
  useLazyGetAllExpancesQuery,
  useGetExpancesByIdQuery,
  useGetExpancesPDFQuery,
  useAddDebitHistoryMutation,
  useDeleteExpancesMutation,
  useUpdateDebitHistoryMutation,
} = ExpancesService;
