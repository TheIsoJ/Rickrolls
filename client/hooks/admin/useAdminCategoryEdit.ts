import { ADMIN_CATEGORY_BASE_URL, API_KEY } from "../../config";
import { basicFetch } from "../fetchFunctions";

export const useAdminCategoryEdit = async <returnType>(
  id: string,
  name: string,
  description: string
): Promise<returnType> => {
  return await basicFetch<returnType>({
    endpoint: `${ADMIN_CATEGORY_BASE_URL}${id}`,
    options: {
      method: "PUT",
      data: {
        name,
        description
      },
      params: {
        api_key: API_KEY
      }
    }
  })
}