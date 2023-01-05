import axios from "axios"
import { useEffect, useState } from "react"
import { API_KEY, HOME_BASE_URL } from "../../../config"

export const useAdminRickrollDelete = (name: string, description: string, link: string) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const deleteRickroll = async () => {
        try {
            setError(false)
            setLoading(true)

            await axios.post(HOME_BASE_URL, {
                name,
                description,
                link
            },
                {
                    params: {
                        api_key: API_KEY
                    }
                })
        } catch (e) {
            setLoading(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        onRickrollCreate()
    }, [])

    return { loading, error }
}