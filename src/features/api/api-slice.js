//@ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDIPOINTS } from '../../utils/constants';
import { buildUrl } from '../../utils/common';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: ENDIPOINTS.BASE }),
	tagTypes: ['Product'],
	endpoints: (builder) => ({
		getProduct: builder.query({
			query: ({ productId }) => `/products/${productId}`,
			providesTags: ['Product'],
		}),
    getProducts: builder.query({
			query: (params) => buildUrl(`/products`, params),
			providesTags: ['Products'],
		}),
	}),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
