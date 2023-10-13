import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./error/AuthTokenError";
import { signOut } from "@/context/AuthContext";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

export function setupAPIClient(ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData> | undefined = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['@nextAuth.token']}`
    }
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api; // Agora, a função retorna uma instância de axios
}
