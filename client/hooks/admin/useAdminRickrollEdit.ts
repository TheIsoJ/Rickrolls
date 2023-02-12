import { ADMIN_RICKROLL_BASE_URL, API_KEY, RICKROLL_BASE_URL } from "../../config";
import { basicFetch } from "../fetchFunctions";

export const useAdminRickrollEdit = async <returnType>(
  id: string,
  name: string,
  description: string,
  videoId: string,
  link: string,
  imageUrl: string,
  category: string,
  categoryId: string
): Promise<returnType> => {
  return await basicFetch<returnType>({
    endpoint: `${ADMIN_RICKROLL_BASE_URL}${id}`,
    options: {
      method: "PUT",
      data: {
        name,
        description,
        link,
        videoId,
        imageUrl,
        category,
        categoryId
      },
      params: {
        api_key: API_KEY
      }
    }
  })
}