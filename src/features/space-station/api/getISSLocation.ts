import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios, ErrorType } from "~/lib/axios";

import MOCK_DATA from "../constants/space-station-mock-api-data.json";

const apiRoute = "/iss-now.json";

// API Response Type
type GetISSLocationAPIResponse = {
  message: string;
  timestamp: number;
  iss_position: {
    latitude: string;
    longitude: string;
  };
};

// ? API has to be mocked in production.
// ? API is HTTP, Domain is HTTPS
const MOCKED_API: AxiosResponse<GetISSLocationAPIResponse> | undefined = {
  data: MOCK_DATA,
  status: 200,
} as AxiosResponse<GetISSLocationAPIResponse> | undefined;

// Query Key
export const getISSLocationQueryKey = () => [apiRoute];

// Axios Fn
export const getISSLocation = (signal?: AbortSignal) =>
  import.meta.env.PROD ? MOCKED_API : axios.get<GetISSLocationAPIResponse>(apiRoute, { signal });

// useQuery Hook
export const useGetISSLocation = <TData = Awaited<ReturnType<typeof getISSLocation>>, TError = ErrorType<Error>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getISSLocation>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryKey = options?.query?.queryKey ?? getISSLocationQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getISSLocation>>> = ({ signal }) => getISSLocation(signal);
  const queryOptions = { queryKey, queryFn, ...(options?.query ?? {}) };

  const query = useQuery({ ...queryOptions }) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
