import { API_KEY, NEW_CATEGORY_BASE_URL } from "../../config"
import { basicFetch } from "../fetchFunctions"

export const useAdminCategoryCreate = async <returnType>(
    name: string,
    description: string
): Promise<returnType> => {
    return await basicFetch<returnType>({
        endpoint: NEW_CATEGORY_BASE_URL,
        options: {
            method: "POST",
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