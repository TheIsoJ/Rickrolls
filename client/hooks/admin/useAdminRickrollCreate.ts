import { API_KEY, NEW_RICKROLL_BASE_URL } from "../../config"
import { basicFetch } from "../fetchFunctions"

export const useAdminRickrollCreate = async <returnType>(
    name: string,
    description: string,
    videoId: string,
    link: string
): Promise<returnType> => {
    return await basicFetch<returnType>({
        endpoint: NEW_RICKROLL_BASE_URL,
        options: {
            method: "POST",
            data: {
                name,
                description,
                link,
                videoId,
                rickroll_cta_link: "https://images.jesunmaailma.ml/rickrolls-api-images/risitas.jpg"
            },
            params: {
                api_key: API_KEY
            }
        }
    })
}