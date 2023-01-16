import { API_VERSION } from "./apiVersion.js"

/**
 * This method prints about message when the Express app is up and running.
 * 
 * @param port
 * @returns void
 */

export function printAbout(port: string) {
    return console.log(`\n------- Tietoa -------\n\nTämä on Jesun Maailman virallinen API Rickrolls-palvelua varten.\n\nTietoa tästä APIsta:\n\nPortti: ${port || 5000}\nVersio: ${API_VERSION}\n\nKansion rakenne kehittäjille:\n=>  routes\n    => frontend   = Rickrolls-verkkopalvelun reitit\n    => mobile-app = Android-sovelluksen reitit\n\nKiitos, kun luit tämän tietoviestin.\n\nAPI on nyt toiminnassa.`)
} 