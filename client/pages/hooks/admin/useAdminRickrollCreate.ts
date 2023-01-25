import { API_KEY, HOME_BASE_URL } from "../../../config"
import { basicFetch } from "../fetchFunctions"

const useAdminRickrollCreate = async <returnType>(
    name: string,
    description: string,
    videoId: string,
    link: string
): Promise<returnType> => {
    return await basicFetch<returnType>({
        endpoint: HOME_BASE_URL,
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

export default useAdminRickrollCreate