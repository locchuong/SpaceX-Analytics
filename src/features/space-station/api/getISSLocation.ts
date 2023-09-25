import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { axios, ErrorType } from "~/lib/axios";

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

// Query Key
export const getISSLocationQueryKey = () => [apiRoute];

// Axios Fn
export const getISSLocation = (signal?: AbortSignal) => axios.get<GetISSLocationAPIResponse>(apiRoute, { signal });

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
