import { API_KEY, RICKROLL_BASE_URL } from "../../../config";
import { basicFetch } from "../fetchFunctions";

// id: string, name: string, description: string, videoId: string, link: string

export const useAdminRickrollEdit = async <returnType>(
  id: string,
  name: string,
  description: string,
  videoId: string,
  link: string
): Promise<returnType> => {
  return await basicFetch<returnType>({
    endpoint: `${RICKROLL_BASE_URL}${id}`,
    options: {
        method: "PUT",
        data: {
            name,
            description,
            link,
            videoId
        },
        params: {
          api_key: API_KEY
        }
    }
})
}