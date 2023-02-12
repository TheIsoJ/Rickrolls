import { API_KEY, NEW_RICKROLL_BASE_URL } from "../../config"
import { basicFetch } from "../fetchFunctions"

export const useAdminRickrollCreate = async <returnType>(
    name: string,
    description: string,
    videoId: string,
    link: string,
    imageUrl: string,
    category: string
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
                imageUrl,
                category
            },
            params: {
                api_key: API_KEY
            }
        }
    })
}