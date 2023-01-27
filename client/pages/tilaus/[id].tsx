import Head from "next/head"
import { useRouter } from "next/router"
import {useProductFetch} from "../../hooks/regular-user/useProductFetch"
import { DotPulse } from "@uiball/loaders"
import { CREATE_CHECKOUT_SESSION_BASE_URL } from "../../config"
import Header from "../../components/Header"

const Product = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return
  const { res, loading } = useProductFetch(id as string)

  if (loading) {
    return (
      <>
        <Head>
          <title>Ladataan...</title>
        </Head>
        <Header sticky />
        <h1 className="text-center mt-16 font-[Poppins] font-bold text-5xl">
          Tuote
        </h1>
        <div className="flex items-center justify-center min-h-[25vh]">
          <DotPulse speed={1} size={96} color="black" />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>
          {res?.product?.name ? `Tilaa ${res?.product?.name}` : "Tilaus"} -
          Rickrolls
        </title>
      </Head>

      <Header sticky />

      <h1 className="text-center mt-16 font-[Poppins] font-bold text-5xl">
        Tuote
      </h1>
      <div className="flex items-center justify-center h-auto w-full py-16 lg:py-16">
        <div className="space-y-3 px-10 flex flex-col items-center lg:items-center lg:justify-between text-center lg:text-start">
          {res?.product?.images ? (
            <div className="w-48 h-48 m-8 bg-gray-300 md:inline rounded-[20%] shadow-md shadow-gray-400 overflow-hidden">
              <img
                className="w-48 h-48 fade-semifast object-cover"
                src={`${res.product?.images[0]}`}
                alt=""
              />
            </div>
          ) : null}
          {res && (
            <>
              <h1 className="max-w-xl font-[Poppins] font-extrabold text-5xl">
                {res?.product?.name}
              </h1>
              <p className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal">
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "eur",
                }).format((res?.product?.price as number) / 100)}
                /{res?.product?.interval === "month" && "kk"}
              </p>
              <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal">
                {res?.product?.description}
              </h2>
              <form action={CREATE_CHECKOUT_SESSION_BASE_URL} method="POST">
                <input
                  type="hidden"
                  name="priceId"
                  value={res?.product?.priceId}
                />
                <button
                  className="bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-400 rounded-full font-[Poppins] font-bold w-40 px-4 py-4 transition-all duration-500 ease-in-out hover:bg-teal-600"
                  type="submit"
                >
                  TILAA NYT
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default Product
