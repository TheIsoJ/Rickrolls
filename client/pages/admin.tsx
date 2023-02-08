import { DotPulse } from "@uiball/loaders"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Header from "../components/Header"
import { useAdminProductsFetch } from "../hooks/admin/useAdminProductsFetch"
import { useAdminRickrollsFetch } from "../hooks/admin/useAdminRickrollsFetch"

const Admin = () => {
  const router = useRouter()
  const { res: resRickrolls, loading: loadingRickrolls } =
    useAdminRickrollsFetch()
  const { res: resProducts, loading: loadingProducts } = useAdminProductsFetch()

  if (loadingRickrolls) {
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
    <div className="bg-teal-800 text-white d-flex items-center justify-center min-h-screen">
      <Head>
        <title>Ylläpito - Rickrolls</title>
      </Head>

      <Header sticky />

      <div className="flex flex-col space-y-3 items-center justify-between">
        <h1 className="max-w-xl font-[Poppins] font-extrabold text-3xl pt-6">
          Ylläpito
        </h1>
        <button
          onClick={() => router.push("/admin/rickroll/new")}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-700"
          type="button"
        >
          Lisää uusi rickroll
        </button>
        <button
          onClick={() => router.push("/admin/subscription/new")}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-700"
          type="button"
        >
          Lisää uusi tilaus
        </button>
        <button
          onClick={() => router.replace("/")}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-700"
          type="button"
        >
          Takaisin
        </button>
        <button
          onClick={() => router.push("/plus")}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-700"
          type="button"
        >
          Plus
        </button>
      </div>
      <h1 className="max-w-xl font-[Poppins] font-extrabold text-3xl ml-6 pt-6">
        Rickrollit
      </h1>
      {resRickrolls?.rickrolls.map(
        ({ id, slug, name, description, rickroll_cta_link }) => (
          <>
            <div key={slug} className="flex items-center justify-center p-6">
              <div className="overflow-hidden rounded-xl border shadow-md bg-gray-400 fade">
                <img
                  className="w-full h-full object-contain fade-semifast"
                  src={rickroll_cta_link}
                  alt=""
                />
                <div>
                  <div className="flex items-center fade-semifast justify-start space-x-2 bg-white text-black p-5">
                    <div>
                      <h1 className="text-xl font-[Poppins] font-bold">
                        {name}
                      </h1>
                      <p className="mt-2 text-sm whitespace-pre-wrap font-[Poppins] fade-semifast">
                        {description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center fade-semifast justify-center space-y-4 bg-white text-black p-5">
                    <button
                      onClick={() =>
                        router.push(`/admin/rickroll/${slug}/edit`)
                      }
                      className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-600"
                      type="button"
                    >
                      Päivitä
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/admin/rickroll/${id}/delete`)
                      }
                      className="flex items-center uppercase justify-center shadow-sm shadow-gray-500 bg-white text-black hover:shadow-none rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white"
                      type="button"
                    >
                      Poista
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
      <h1 className="max-w-xl font-[Poppins] font-extrabold text-3xl ml-6 pt-6">
        Tilaukset
      </h1>
      {resProducts?.products?.data?.map(
        ({ id, name, description, default_price, images }) => (
          <>
            <div key={id} className="flex items-center justify-center p-6">
              <div className="overflow-hidden rounded-xl border shadow-md bg-gray-400 fade">
                {images![0] ? (
                  <img
                    className="w-full h-full bg-gray-400 fade-semifast object-contain"
                    src={images![0]}
                    alt=""
                  />
                ) : null}
                <div>
                  <div className="flex items-center justify-center text-center bg-white text-black p-5">
                    <div>
                      <h1 className="text-xl font-[Poppins] font-bold">
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
                      <p className="mt-2 text-sm whitespace-pre-wrap font-[Poppins] fade-semifast">
                        {description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center fade-semifast justify-center space-y-4 bg-white text-black p-5">
                    <button
                      onClick={() =>
                        router.push(`/admin/subscription/${id}/edit`)
                      }
                      className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-600"
                      type="button"
                    >
                      Päivitä
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/admin/subscription/${id}/delete`)
                      }
                      className="flex items-center uppercase justify-center shadow-sm shadow-gray-500 bg-white text-black hover:shadow-none rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white"
                      type="button"
                    >
                      Poista
                    </button>
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
export default Admin
