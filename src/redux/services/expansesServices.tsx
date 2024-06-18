import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { NIVAAS_URL} from '../../api/api';
import {RootState} from '../store';
import { endpoints } from '../../api';


// Define a service using a base URL and expected endpoints

export const expancesService = createApi({
  reducerPath: 'expancesService',
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
    getAllExpances: builder.query<any, {apartmentID:Number,year:Number,month:Number}>({
        query: ({apartmentID,year,month}) => `${endpoints.GET_EXPANCES}/${apartmentID}/year/${year}/month/${month}`,
    }),
    getExpancesById: builder.query<any, {id:Number}>({
        query: ({id}) => `${endpoints.GET_EXPANCES_BY_ID}/${id}`,
    }),
    getExpancesPDF: builder.query<Blob, { apartmentID: number, year: number, month: number }>({
      query: ({ apartmentID, year, month }) => ({
        url: `${endpoints.GET_EXPANCES_PDF}/${apartmentID}/year/${year}/month/${month}`,
        method: 'GET',
        responseHandler: (response) => response.blob(),
      }),
    }),
    addDebitHistory: builder.mutation<any, {}>({
        query: payload => ({
          url:  `${endpoints.ADD_DEBIT_HISTORY}`,
          method: 'POST',
          body: payload,
          header: {
            'Content-Type': 'application/json',
          },
        }),
    }),
    deleteExpances : builder.mutation<any,{apartmentID:number,id : number}>({
        query: ({apartmentID,id}) =>({
          url:`${endpoints.DELETE_EXPANCES}/${apartmentID}/debit/${id}`,
          method: 'DELETE',
          credentials: 'include',
        })
    }),
    updateDebitHistory: builder.mutation<any, {id:Number,payload:any}>({
        query: ({payload,id}) => ({
          url: `${endpoints.UPDATE_DEBIT_HISTORY}/${id}`,
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
  useLazyGetExpancesByIdQuery,
  useLazyGetExpancesPDFQuery,
  useAddDebitHistoryMutation,
  useDeleteExpancesMutation,
  useUpdateDebitHistoryMutation,
} = expancesService;
