import { DotPulse } from "@uiball/loaders"
import axios from "axios"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { PRODUCTS_BASE_URL } from "../config"

const Plus = () => {
  const router = useRouter()
  const [productResults, setProductResults] = useState<ProductsResponseData>()

  useEffect(() => {
    axios.get(PRODUCTS_BASE_URL!).then((res) => {
      setProductResults(res.data)
    })
  }, [])

  if (!productResults) {
    return (
      <>
        <Head>
          <title>Ladataan...</title>
        </Head>
        <h1 className="text-2xl font-bold text-center mx-4 my-5 font-[Poppins] whitespace-pre-wrap">
          Eiköhän pistetä vielä paremmaksi?
        </h1>
        <div className="flex items-center justify-center h-64">
          <DotPulse speed={1.2} size={96} color="black" />
        </div>
      </>
    )
  }

  return (
    <div>
      <Head>
        <title>Tilaa - Rickrolls</title>
      </Head>

      <h1 className="text-2xl font-bold text-center mx-4 my-5 font-[Poppins] whitespace-pre-wrap">
        Eiköhän pistetä vielä paremmaksi?
      </h1>

      {/* flex items-center w-96 max-w-5xl mx-auto */}

      {productResults?.products?.data?.map(
        ({ id, name, description, default_price, images }) => (
          <>
            <div key={id} className="flex items-center w-96 max-w-5xl mx-auto my-[3.75rem]">
              <div className="rounded-lg border shadow-md">
                {images![0] ? (
                  <img
                    className="w-full object-contain"
                    src={images![0]}
                    alt=""
                  />
                ) : null}
                <div className="flex items-center justify-center text-center bg-white p-5">
                  <div>
                    <h1 className="text-2xl font-[Poppins] font-bold">
                      {name}
                    </h1>
                    <p className="font-[Poppins] text-sm">
                      {(
                        (default_price?.unit_amount as number) / 100
                      ).toLocaleString(undefined, {
                        style: "currency",
                        currency: default_price?.currency,
                      })}
                      /kk
                    </p>
                    <p className="mt-2 text-md text-slate-400 whitespace-pre-wrap font-[Poppins]">
                      {description}
                    </p>

                    <Link
                      className="flex items-center justify-center my-3"
                      href={`/tilaus/${id}`}
                    >
                      <button
                        className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-400 rounded-full font-[Poppins] font-bold w-40 px-2 py-3 transition-all duration-500 ease-in-out hover:bg-teal-600"
                        type="button"
                      >
                        Tutustu
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  )
}
export default Plus
