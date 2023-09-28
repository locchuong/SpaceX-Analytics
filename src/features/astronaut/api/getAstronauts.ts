import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios, ErrorType } from "~/lib/axios";

import MOCK_DATA from "../constants/astronaut-mock-api-data.json";

const apiRoute = "/astros.json";

// API Response Type
type GetAstronautsAPIResponse = {
  message: string;
  number: number;
  people: { name: string; craft: string }[];
};

// ? API has to be mocked in production.
// ? API is HTTP, Domain is HTTPS
const MOCKED_API: AxiosResponse<GetAstronautsAPIResponse> | undefined = {
  data: MOCK_DATA,
  status: 200,
} as AxiosResponse<GetAstronautsAPIResponse> | undefined;

// Query Key
export const getAstronautsQueryKey = () => [apiRoute];

// Axios Fn
export const getAstronauts = (signal?: AbortSignal) =>
  import.meta.env.PROD ? MOCKED_API : axios.get<GetAstronautsAPIResponse>(apiRoute, { signal });

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
