import axios, { AxiosRequestConfig } from "axios";

type Props = {
    endpoint: string,
    options?: AxiosRequestConfig<RickrollDataBody>
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL
})

const makeRequest = <T>(endpoint: string, options: AxiosRequestConfig) => {
    return api<T>(endpoint, options)
        .then(res => res.data)
        .catch(({ error }: RickrollResponseData) => Promise.reject(error.message))
}

const basicFetch = async <returnType>({
    endpoint,
    options = {}
}: Props): Promise<returnType> => {
    const data = await makeRequest<returnType>(endpoint, options)
    return data;
  };

  export {
    makeRequest,
    basicFetch
  }