import { randomUUID } from "crypto";

const generateAPIKey = () => {
    console.log("\n[API Key Generator] Luodaan API-avainta...")
    const apiKey = randomUUID()
    console.log(`[API Key Generator] API-avaimesi .env-tiedostoon: ${apiKey}\n`)
}

generateAPIKey()