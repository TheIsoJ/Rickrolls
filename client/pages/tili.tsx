import { useUser } from "@auth0/nextjs-auth0/client"
import { DotPulse } from "@uiball/loaders"
import Head from "next/head"
import Link from "next/link"
import Header from "../components/Header"

const Account = () => {
  const { user, isLoading } = useUser()
  
  return (
    <>
      <Head>
        <title>Tili - Rickrolls</title>
      </Head>

      <Header sticky />

      <div
        className={`flex items-center justify-center flex-1 min-h-[75.1vh] w-full py-32 lg:py-0 bg-teal-800`}
      >
        <div className="space-y-5 px-3 sm:px-10 text-center">
          {isLoading && (
            <>
              <h2 className="font-[Poppins] font-bold text-white">
                Ladataan käyttäjätiliä...
              </h2>
              <div className="flex flex-col items-center">
                <DotPulse speed={1} size={96} color="white" />
              </div>
            </>
          )}
          {!user ? (
            <>
              <div className="flex flex-col items-center space-y-8">
                <h1 className="font-[Poppins] font-bold text-2xl text-white">
                  Odotappas... et ole kirjautunut palveluun.
                </h1>
                <a
                  className="bg-white rounded-full font-[Poppins] text-sm md:text-base font-bold w-auto px-4 py-2 md:py-4 transition-all duration-200 ease-in-out hover:opacity-60"
                  href="/api/auth/login"
                >
                  Kirjaudu sisään
                </a>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-[Poppins] font-extrabold text-5xl text-white">
                Tili
              </h1>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-2 justify-center items-center space-y-2">
                <img
                  className="w-18 h-18 md:w-12 md:h-12 rounded-full object-cover"
                  src={user?.picture as string}
                />
                <span className="font-[Poppins] font-bold text-sm md:text-lg text-white">
                  {user.name}
                </span>
                <span className="font-[Poppins] text-xs md:text-sm text-white">
                  {user.email}
                </span>
              </div>
            </>
          )}

          <div className="flex flex-col justify-center my-5 space-y-2">
            {user?.email?.startsWith("juiceneblueyt") ? (
              <>
                <Link
                  className="bg-white rounded-full font-[Poppins] text-sm md:text-base font-bold w-full px-4 py-2 md:py-4 transition-all duration-200 ease-in-out hover:opacity-60"
                  href="/admin"
                >
                  Hallinta
                </Link>
              </>
            ) : null}
            {user && (
              <>
                <a
                  href="/api/auth/logout"
                  className="bg-white rounded-full font-[Poppins] text-sm md:text-base font-bold w-full px-4 py-2 md:py-4 transition-all duration-200 ease-in-out hover:opacity-60"
                >
                  Kirjaudu ulos
                </a>
              </>
            )}
            <div className="flex justify-center">
              <Link href="/plus">
                <h3 className="bg-white rounded-full font-[Poppins] text-sm md:text-base font-bold w-auto px-4 py-2 md:py-4 transition-all duration-200 ease-in-out hover:opacity-60">
                  Tilaa Rickrolls+
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account
