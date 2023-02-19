import Head from "next/head"
import { useRouter } from "next/router"
import ReactPlayer from "react-player"
import { DotPulse } from "@uiball/loaders"
import { useRickrollFetch } from "../../hooks/regular-user/useRickrollFetch"
import Header from "../../components/Header"
import { useUser } from "@auth0/nextjs-auth0/client"
import { ShieldExclamationIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

const Rickroll = () => {
  const router = useRouter()
  const { category, slug } = router.query
  const { user } = useUser()

  if (!slug) return
  const { res, loading } = useRickrollFetch(slug as string)

  if (loading) {
    return (
      <>
        <Head>
          <title>Ladataan...</title>
        </Head>
        <div className="bg-teal-900 flex items-center justify-center min-h-[75.1vh]">
          <DotPulse speed={1} size={96} color="white" />
        </div>
      </>
    )
  }

  return (
    <div className="bg-teal-900 text-white">
      <Head>
        <title>{`${res?.rickroll?.name} - Rickrolls`}</title>
      </Head>

      <Header sticky />

      {!user ? (
        <div className="flex items-center justify-center h-auto w-full py-16 lg:py-16">
          <div className="space-y-3 px-10 flex flex-col items-center lg:items-center lg:justify-between text-center">
            <div className="w-48 h-48 m-4 md:inline rounded-[20%]">
              <ShieldExclamationIcon />
            </div>
            <div className="flex flex-col space-y-4">
              <h1 className="max-w-xl font-[Poppins] font-extrabold text-4xl">
                Tämä sivu vaatii kirjautumisen.
              </h1>
              <p className="font-[Poppins] text-sm font-normal">
                Jos sinulla ei ole Jesun Maailma -tiliä, luo tili{" "}
                <Link href="/api/auth/signup">
                  <p className="font-[Poppins] font-bold hover:underline">
                    tästä.
                  </p>
                </Link>
              </p>
              <h2>TAI</h2>
              <Link
                className="bg-white text-black rounded-full font-[Poppins] font-bold w-full px-4 py-4 transition-all duration-200 ease-in-out hover:opacity-60"
                href={`/api/auth/login?returnTo=/${category}/${slug}`}
              >
                Kirjaudu sisään
              </Link>
            </div>
          </div>
        </div>
      ) : res ? (
        <>
          <div
            key={res?.rickroll?.id}
            className="flex items-center justify-center h-auto w-full py-16 lg:py-16"
          >
            <div className="space-y-3 px-10 flex flex-col items-center lg:items-center lg:justify-between text-center">
              {res?.rickroll?.imageUrl ? (
                <>
                  <div className="w-48 h-48 bg-gray-400 m-4 md:inline rounded-[20%] shadow-xl shadow-gray-800">
                    <img
                      className={`${
                        res && "fade"
                      } w-48 h-48 bg-gray-400 transition-all duration-200 ease-in-out object-cover rounded-[20%]`}
                      src={`${res?.rickroll?.imageUrl}`}
                      alt=""
                    />
                  </div>
                </>
              ) : null}
              <>
                <div className="flex flex-col space-y-4">
                  <h1 className="max-w-xl font-[Poppins] font-extrabold text-4xl">
                    {res?.rickroll?.name}
                  </h1>
                  <p className="max-w-xl whitespace-pre-wrap font-[Poppins] text-sm font-normal">
                    {res?.rickroll?.description}
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    {res.rickroll.tags?.map((tag) => (
                      <p className="bg-teal-400 my-2 px-4 py-2 rounded-full font-[Poppins] text-black text-xs uppercase">
                        {tag}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            </div>
          </div>
          <div
            className={`bg-gray-500 mt-8 scale-90 rounded-2xl overflow-hidden fade`}
          >
            <ReactPlayer
              playsinline
              playing={false}
              width="100%"
              height={"75.1vh"}
              controls={true}
              url={res?.rickroll?.link}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
export default Rickroll
