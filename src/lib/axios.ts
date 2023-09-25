import Axios, { AxiosError } from "axios";

import { API_URL } from "~/config/api";

export const axios = Axios.create({
  baseURL: API_URL,
});

export interface ErrorType<Error> extends AxiosError<Error> {}
