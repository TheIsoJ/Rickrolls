import { ADMIN_RICKROLL_BASE_URL, API_KEY } from "../../config";
import { basicFetch } from "../fetchFunctions";

export const useAdminRickrollDelete = async <returnType>(
  id: string
): Promise<returnType> => {
  return await basicFetch<returnType>({
    endpoint: `${ADMIN_RICKROLL_BASE_URL}${id}`,
    options: {
      method: "DELETE",
      params: {
        api_key: API_KEY
      }
    }
  })
}