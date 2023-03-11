import { randomUUID } from "crypto"

const generateAPIKey = () => {
    const apiKey = randomUUID()
    return apiKey
}

export default generateAPIKey