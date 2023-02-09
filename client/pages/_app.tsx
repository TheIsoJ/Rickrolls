import "../styles/globals.css"
import type { AppProps } from "next/app"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import Footer from "../components/Footer"
import { useEffect } from "react"
import "../public/css/rickroll.styles.css"

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <UserProvider>
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
    </>
  )
}

export default MyApp
