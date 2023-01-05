import { DotPulse } from "@uiball/loaders"
import Head from "next/head"
import Link from "next/link"
import Header from "../components/Header"
import { useProductsFetch } from "./hooks/regular-user/useProductsFetch"

const Plus = () => {
  // const router = useRouter()
  const { res, loading } = useProductsFetch()

  if (loading) {
    return (
      <>
        <Head>
          <title>Ladataan...</title>
        </Head>
        <Header sticky />
        <h1 className="text-3xl font-bold text-center mx-4 my-5 font-[Poppins] whitespace-pre-wrap">
          Eiköhän pistetä vielä paremmaksi?
        </h1>
        <div className="flex items-center justify-center min-h-[25vh]">
          <DotPulse speed={1} size={96} color="black" />
        </div>
      </>
    )
  }

  return (
    <div>
      <Head>
        <title>Tilaa - Rickrolls</title>
      </Head>

      <Header sticky />

      <h1 className="text-3xl font-bold text-center mx-4 my-5 font-[Poppins] whitespace-pre-wrap">
        Eiköhän pistetä vielä paremmaksi?
      </h1>

      {/* flex items-center w-96 max-w-5xl mx-auto */}

      {res?.products?.data?.map(
        ({ id, name, description, default_price, images }) => (
          <>
            <div
              key={id}
              className="flex items-center w-56 sm:w-64 max-w-5xl sm:max-w-2xl mx-auto my-[3.75rem]"
            >
              <div className="rounded-lg overflow-hidden shadow-lg shadow-gray-400">
                {images![0] ? (
                  <img
                    className="w-full h-full bg-gray-400 fade-semifast object-contain"
                    src={images![0]}
                    alt=""
                  />
                ) : null}
                <div className="flex items-center justify-center text-center bg-white p-5">
                  <div>
                    <h1 className="text-3xl font-[Poppins] font-extrabold">
                      {name}
                    </h1>
                    <p className="font-[Poppins] text-lg text-slate-400">
                      {(
                        (default_price?.unit_amount as number) / 100
                      ).toLocaleString(undefined, {
                        style: "currency",
                        currency: "eur",
                      })}
                      /
                      {default_price?.recurring?.interval === "day"
                        ? "pv"
                        : default_price?.recurring?.interval === "week"
                        ? "kk"
                        : default_price?.recurring?.interval === "month"
                        ? "kk"
                        : default_price?.recurring?.interval === "year"
                        ? "vuodessa"
                        : "kk"}
                    </p>
                    <p className="mt-2 text-md text-slate-400 whitespace-pre-wrap font-[Poppins]">
                      {description}
                    </p>

                    <Link
                      className="flex items-center justify-center my-3"
                      href={`/tilaus/${id}`}
                    >
                      <button
                        className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-400 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-600"
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
