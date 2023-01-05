import "../styles/globals.css"
import type { AppProps } from "next/app"
import "../public/css/nprogress.css"
import NProgress from "nprogress"
import { UserProvider } from "@auth0/nextjs-auth0/client"
import Footer from "../components/Footer"
import { useRouter } from "next/router"
import { useEffect } from "react"
import "../public/css/rickroll.styles.css"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router])

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
