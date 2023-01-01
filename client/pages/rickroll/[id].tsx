import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  API_KEY,
  CREATE_CHECKOUT_SESSION_BASE_URL,
  PRODUCT_BASE_URL,
  RICKROLL_BASE_URL,
} from "../../config"
import ReactPlayer from "react-player"

const Rickroll = () => {
  const router = useRouter()
  const { id } = router.query

  const [rickrollResult, setRickrollResult] = useState<RickrollResponseData>()

  useEffect(() => {
    if (!id) return
    
    axios.get(`${RICKROLL_BASE_URL}${id}?api_key=${API_KEY}`).then((res) => {
      setRickrollResult(res.data)
      console.log(id)
    })
  }, [id])

  return (
    <>
      <Head>
        <title>{`${rickrollResult?.rickroll?.name}`} - Rickrolls</title>
      </Head>

      <ReactPlayer
        playsinline
        playing={true}
        width="100%"
        height="48.89vh"
        controls={true}
        url={rickrollResult?.rickroll?.link}
      />

      <div
        className={`flex items-center justify-between h-96 w-full py-32 lg:py-0 bg-[#002f6c]`}
      >
        <div className="space-y-5 px-10">
          <h1 className="max-w-xl font-[Poppins] font-extrabold text-5xl text-white">
            {rickrollResult?.rickroll?.name}
          </h1>
          <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal text-white">
            {rickrollResult?.rickroll?.description}
          </h2>
        </div>

        {rickrollResult?.rickroll?.rickroll_cta_link && (
          <img
            className="hidden m-32 md:inline md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg shadow-2xl object-cover"
            src={`${rickrollResult?.rickroll?.rickroll_cta_link}`}
            alt=""
          />
        )}
      </div>
    </>
  )
}
export default Rickroll
