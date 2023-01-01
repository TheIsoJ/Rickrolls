import Head from "next/head"
import { useRouter } from "next/router"
import { API_KEY, CREATE_CUSTOMER_PORTAL_SESSION_BASE_URL } from "../../config"

const Success = () => {
  const router = useRouter()
  const { session_id } = router.query

  return (
    <>
      <Head>
        <title>Maksu onnistui - Rickrolls</title>
      </Head>

      <div
        className={`flex items-center justify-center h-screen w-full py-32 lg:py-0 bg-[#002f6c]`}
      >
        <div className="space-y-5 px-10 text-center">
          <h1 className="max-w-xl font-[Poppins] font-extrabold text-5xl text-white">
            Maksu onnistui!
          </h1>
          <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal text-white">
            Olet onnistuneesti tilannut Rickrolls+-palvelun!
          </h2>

          {session_id && (
            <form
              action={`${CREATE_CUSTOMER_PORTAL_SESSION_BASE_URL}${session_id}&api_key=${API_KEY}`}
              method="post"
            >
              <button
                className="bg-white rounded-full font-[Poppins] font-bold w-full px-4 py-4 transition-all duration-200 ease-in-out hover:opacity-60"
                type="submit"
              >
                Mene itsepalveluportaaliin
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
export default Success
