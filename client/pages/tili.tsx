import { useUser } from "@auth0/nextjs-auth0/client"
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
    <div className="space-y-5 px-10 text-center">
    {!user && isLoading ? (
    <>
    <h2 className="font-[Poppins] font-bold text-white">
    Ladataan käyttäjätiliä...
    </h2>
    </>
    ) : !user ? (
    <>
    <div className="flex flex-col items-center">
    <h1 className="font-[Poppins] font-bold text-2xl text-white">
    Odotappas... et ole kirjautunut palveluun.
    </h1>
    <a
    className="mt-4 bg-white rounded-full font-[Poppins] font-bold w-[256px] px-4 py-4 transition-all duration-200 ease-in-out hover:opacity-60"
    href="/api/auth/login"
    >
    Kirjaudu sisään
    </a>
    </div>
    </>
    ) : user ? (
    <>
    <h1 className="max-w-xl mx-auto font-[Poppins] font-extrabold text-5xl text-white">
    Tili
    </h1>
    <h2 className="font-[Poppins] font-normal text-white">
    Olet kirjautunut sisään nimellä:
    </h2>
    <span className="font-[Poppins] font-bold text-white">
    {user.name}
    </span>
    </>
    ) : null}
    
    <div className="flex flex-col justify-center space-y-3">
    {user && user.email?.startsWith("juiceneblueyt") && (
    <>
    <Link
    className="bg-white rounded-full font-[Poppins] font-bold w-full px-4 py-4 transition-all duration-200 ease-in-out hover:opacity-60"
    href="/admin"
    >
    Hallinta
    </Link>
    </>
    )}
    <a
    href="/api/auth/logout"
    className="bg-white rounded-full font-[Poppins] font-bold w-full px-4 py-4 transition-all duration-200 ease-in-out hover:opacity-60"
    >
    Kirjaudu ulos
    </a>
    
    <Link href="/plus">
    <h3 className="bg-white rounded-full font-[Poppins] font-bold w-full px-4 py-4 transition-all duration-200 ease-in-out hover:opacity-60">
    Tilaa Rickrolls+
    </h3>
    </Link>
    </div>
    </div>
    </div>
    </>
    )
}

export default Account
