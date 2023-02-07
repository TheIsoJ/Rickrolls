import { ADMIN_PRODUCT_BASE_URL, ADMIN_RICKROLL_BASE_URL, API_KEY, RICKROLL_BASE_URL } from "../../config";
import { basicFetch } from "../fetchFunctions";

export const useAdminSubscriptionEdit = async <returnType>(
  id: string,
  name: string,
  description: string,
  price: string,
  active: boolean
): Promise<returnType> => {
  return await basicFetch<returnType>({
    endpoint: `${ADMIN_PRODUCT_BASE_URL}${id}`,
    options: {
      method: "PUT",
      data: {
        name,
        description,
        price,
        active
      },
      params: {
        api_key: API_KEY
      }
    }
  })
}