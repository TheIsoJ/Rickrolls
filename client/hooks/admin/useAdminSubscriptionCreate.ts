import { ADMIN_NEW_PRODUCT_BASE_URL, API_KEY, NEW_RICKROLL_BASE_URL } from "../../config"
import { basicFetch } from "../fetchFunctions"

export const useAdminSubscriptionCreate = async <returnType>(
    name: string,
    description: string,
    price: string,
    active: boolean
): Promise<returnType> => {
    return await basicFetch<returnType>({
        endpoint: ADMIN_NEW_PRODUCT_BASE_URL,
        options: {
            method: "POST",
            data: {
                name,
                description: description ?? null,
                price,
                active
            },
            params: {
                api_key: API_KEY
            }
        }
    })
}