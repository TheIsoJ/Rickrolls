import axios, { AxiosError } from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  API_KEY,
  CREATE_CHECKOUT_SESSION_BASE_URL,
  PRODUCT_BASE_URL,
} from "../../config"
import { DotPulse } from "@uiball/loaders"

const Product = () => {
  const router = useRouter()
  const { id } = router.query

  const [productResult, setProductResult] = useState<ProductResponseData>()

  useEffect(() => {
    if (!id) return

    axios
      .get(`${PRODUCT_BASE_URL}${id}?api_key=${API_KEY}`)
      .then((res) => {
        setProductResult(res.data)
      })
      .catch(({ message }: AxiosError) => {
        console.error(message)
      })
  }, [id])

  if (!productResult) {
    return (
      <>
        <Head>
          <title>Ladataan...</title>
        </Head>
        <h1 className="text-center mt-16 font-[Poppins] font-bold text-5xl">
          Tuote
        </h1>
        <div className="flex items-center justify-center h-64">
          <DotPulse speed={1.2} size={96} color="black" />
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>
          {productResult?.product?.name
            ? `Tilaa ${productResult?.product?.name}`
            : "Tilaus"}{" "}
          - Rickrolls
        </title>
      </Head>

      <h1 className="text-center mt-16 font-[Poppins] font-bold text-5xl">
        Tuote
      </h1>
      <div className="flex items-center justify-center min-h-full w-full py-16 lg:py-0">
        <div className="space-y-5 px-10 flex flex-col items-center lg:items-center lg:justify-between text-center lg:text-start">
          {productResult?.product?.images ? (
            <img
              className="w-48 h-48 object-cover m-8 md:inline rounded-[20%] shadow-md shadow-gray-400"
              src={`${productResult.product?.images[0]}`}
              alt=""
            />
          ) : null}
          {productResult && (
            <>
              <h1 className="max-w-xl font-[Poppins] font-extrabold text-5xl">
                {productResult?.product?.name}
              </h1>
              <p className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal">
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "eur",
                }).format(
                  (productResult?.product?.default_price
                    ?.unit_amount as number) / 100
                )}
                /kk
              </p>
              <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal">
                {productResult?.product?.description}
              </h2>
              <form action={CREATE_CHECKOUT_SESSION_BASE_URL} method="POST">
                <input
                  type="hidden"
                  name="priceId"
                  value={productResult?.product?.default_price?.id}
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
