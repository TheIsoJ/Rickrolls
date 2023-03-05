import { randomUUID } from "crypto";

console.log("\n[API Key Generator] Luodaan API-avainta...")

const generateAPIKey = () => {
    let s: string = '';
    s = randomUUID()
    return s;
}

console.log(`[API Key Generator] Your API key: ${generateAPIKey()}\n`)