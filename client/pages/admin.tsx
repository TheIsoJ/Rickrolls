import { useUser } from "@auth0/nextjs-auth0/client"
import { ShieldExclamationIcon } from "@heroicons/react/24/solid"
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
  const { user, isLoading } = useUser()

  if (loadingRickrolls && loadingProducts) {
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

      {isLoading ? (
        <>
          <div className="bg-teal-900 flex items-center justify-center min-h-[75.1vh]">
            <DotPulse speed={1} size={96} color="white" />
          </div>
        </>
      ) : !user ? (
        <div className="flex items-center justify-center h-auto w-full py-16 lg:py-16">
          <div className="space-y-3 px-10 flex flex-col items-center lg:items-center lg:justify-between text-center">
            <div className="w-48 h-48 m-4 md:inline rounded-[20%]">
              <ShieldExclamationIcon />
            </div>
            <div className="flex flex-col items-center space-y-4">
              <h1 className="max-w-xl font-[Poppins] font-extrabold text-4xl">
                Tämä sivu vaatii kirjautumisen.
              </h1>
              <span className="font-[Poppins] whitespace-pre-wrap text-sm md:text-lg font-normal">
                Hupsista keikkaa!{"\n"}
                <span className="font-[Poppins] text-sm md:text-lg font-normal">
                  Vaikuttaa siltä, että et ole kirjautunut palveluun
                  käyttääksesi palvelun suojattuja toimintoja.
                </span>
              </span>
              <Link
                className="bg-white text-black rounded-full font-[Poppins] font-bold w-auto px-4 py-4 transition-all duration-200 ease-in-out hover:opacity-60"
                href={`/api/auth/login?returnTo=/admin`}
              >
                Kirjaudu sisään
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
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
              onClick={() => router.push("/admin/category/new")}
              className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-700"
              type="button"
            >
              Lisää uusi kategoria
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
          {resRickrolls?.categories?.map((category) => (
            <>
              <div className="flex flex-col px-8 my-4">
                <h1 className="max-w-xl text-center sm:text-left font-[Poppins] font-extrabold text-lg lg:text-3xl">
                  {category.name}
                </h1>
                <p className="max-w-xl text-center sm:text-left font-[Poppins] text-sm md:text-lg mt-2">
                  {category.description}
                </p>
                <div className="flex flex-col lg:flex-row items-center lg:justify-center fade-semifast justify-center space-y-2 lg:space-y-0 lg:space-x-2 p-5">
                  <button
                    onClick={() =>
                      router.push(`/admin/category/${category.id}/edit`)
                    }
                    className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] text-sm font-semibold px-5 py-2 transition-all duration-500 ease-in-out hover:bg-teal-600"
                    type="button"
                  >
                    Päivitä
                  </button>
                  <button
                    onClick={() =>
                      router.push(`/admin/category/${category.id}/delete`)
                    }
                    className="flex items-center uppercase justify-center shadow-sm shadow-gray-500 bg-white text-black hover:shadow-none rounded-full font-[Poppins] text-sm font-semibold px-5 py-2 transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white"
                    type="button"
                  >
                    Poista
                  </button>
                </div>
                {category.rickrolls.map(
                  ({ id, slug, name, description, tags, imageUrl }) => (
                    <>
                      <div
                        key={slug}
                        className="flex items-center justify-center p-6"
                      >
                        <div className="overflow-hidden rounded-xl border shadow-md bg-gray-400 fade">
                          <img
                            className="w-full h-full object-contain fade-semifast"
                            src={imageUrl}
                            alt=""
                          />
                          <div>
                            <div className="flex items-center fade-semifast justify-start space-x-2 bg-white text-black p-5">
                              <div>
                                <h1 className="text-xl font-[Poppins] font-bold">
                                  {name}
                                </h1>
                                <div className="flex items-center space-x-2 fade-semifast">
                                  <p className="font-[Poppins] text-sm font-bold text-gray-600/75">
                                    Tagit:
                                  </p>
                                  {tags?.map((tag) => (
                                    <p className="flex bg-teal-400 my-2 px-2 py-1 font-[Poppins] text-xs uppercase rounded-full">
                                      {tag}
                                    </p>
                                  ))}
                                </div>
                                <p className="mt-2 text-sm whitespace-pre-wrap font-[Poppins] fade-semifast">
                                  {description}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center lg:justify-center fade-semifast justify-center space-y-4 lg:space-y-0 lg:space-x-2 bg-white text-black p-5">
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
              </div>
            </>
          ))}
          <h1 className="max-w-xl font-[Poppins] font-extrabold text-xl ml-6 pt-6">
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
        </>
      )}
    </div>
  )
}
export default Admin
