import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

import { axios, ErrorType } from "~/lib/axios";

const apiRoute = "/astros.json";

// API Response Type
type GetAstronautsAPIResponse = {
  message: string;
  number: number;
  people: { name: string; craft: string }[];
};

// Query Key
export const getAstronautsQueryKey = () => [apiRoute];

// Axios Fn
export const getAstronauts = (signal?: AbortSignal) => axios.get<GetAstronautsAPIResponse>(apiRoute, { signal });

// useQuery Hook
export const useGetAstronauts = <TData = Awaited<ReturnType<typeof getAstronauts>>, TError = ErrorType<Error>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAstronauts>>, TError, TData>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryKey = options?.query?.queryKey ?? getAstronautsQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAstronauts>>> = ({ signal }) => getAstronauts(signal);
  const queryOptions = { queryKey, queryFn, ...(options?.query ?? {}) };

  const query = useQuery({ ...queryOptions }) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
