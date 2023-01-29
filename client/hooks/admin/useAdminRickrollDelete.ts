import { API_KEY, RICKROLL_BASE_URL } from "../../config";
import { basicFetch } from "../fetchFunctions";

export const useAdminRickrollDelete = async <returnType>(
  id: string
): Promise<returnType> => {
  return await basicFetch<returnType>({
    endpoint: `${RICKROLL_BASE_URL}${id}`,
    options: {
      method: "DELETE",
      params: {
        api_key: API_KEY
      }
    }
  })
}