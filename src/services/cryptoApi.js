import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
  "X-RapidAPI-Key": "",
};
const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetail: builder.query({
      query: (coindId) => createRequest(`/coin/${coindId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
