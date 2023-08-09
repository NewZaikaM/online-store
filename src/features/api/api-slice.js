//@ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ENDIPOINTS } from '../../utils/constants';


export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ENDIPOINTS.BASE }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ productId }) => `/products/${productId}`,
      providesTags: ['Product'],
    })
  }),
});

export const { useGetProductQuery } = apiSlice;