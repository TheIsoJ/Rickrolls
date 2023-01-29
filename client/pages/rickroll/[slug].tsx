import Head from "next/head"
import { useRouter } from "next/router"
import ReactPlayer from "react-player"
import { DotPulse } from "@uiball/loaders"
import {useRickrollFetch} from "../../hooks/regular-user/useRickrollFetch"
import Header from "../../components/Header"

const Rickroll = () => {
  const router = useRouter()
  const { slug } = router.query

  if (!slug) return
  const { res, loading } = useRickrollFetch(slug as string)

  if (loading) {
    return (
      <>
        <Head>
          <title>Ladataan...</title>
        </Head>
        <Header sticky />
        <div className="bg-teal-900 flex items-center justify-center min-h-[75.1vh]">
          <DotPulse speed={1} size={96} color="white" />
        </div>
      </>
    )
  }

  return (
    <div className="bg-teal-900 text-white">
      <Head>
        <title>{`${res?.rickroll?.name}`} - Rickrolls</title>
      </Head>

      <Header sticky />

      {res && (
        <>
          <div className="flex items-center justify-center h-auto w-full py-16 lg:py-16">
            <div className="space-y-3 px-10 flex flex-col items-center lg:items-center lg:justify-between text-center">
              {res?.rickroll?.rickroll_cta_link ? (
                <>
                  <div className="w-48 h-48 bg-gray-400 m-4 md:inline rounded-[20%] shadow-xl shadow-gray-800">
                    <img
                      className={`${
                        res && "fade"
                      } w-48 h-48 bg-gray-400 transition-all duration-200 ease-in-out object-cover rounded-[20%]`}
                      src={`${res?.rickroll?.rickroll_cta_link}`}
                      alt=""
                    />
                  </div>
                </>
              ) : null}
              <>
                <h1 className="max-w-xl font-[Poppins] font-extrabold text-4xl">
                  {res?.rickroll?.name}
                </h1>
                <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] text-xl font-normal">
                  {res?.rickroll?.description}
                </h2>
              </>
            </div>
          </div>
          <div
            className={`bg-gray-500 mt-64 scale-90 rounded-xl overflow-hidden fade`}
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
      )}
    </div>
  )
}
export default Rickroll
