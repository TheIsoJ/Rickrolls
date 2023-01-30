import { DotPulse } from "@uiball/loaders"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import Header from "../components/Header"
import {useAdminRickrollsFetch} from "../hooks/admin/useAdminRickrollsFetch"

const Admin = () => {
  const router = useRouter()
  const { res, loading } = useAdminRickrollsFetch()

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
          Lisää uusi
        </button>
        <button
          onClick={() => router.replace("/")}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-700"
          type="button"
        >
          Takaisin
        </button>
      </div>
      <h1 className="max-w-xl font-[Poppins] font-extrabold text-3xl ml-6 pt-6">
        Rickrollit
      </h1>
      {res?.rickrolls.map(({ id, slug, name, description, rickroll_cta_link }) => (
        <>
          <div key={id} className="flex items-center justify-center p-6">
            <div className="overflow-hidden rounded-xl border shadow-md bg-gray-400 fade">
              <img
                className="w-full h-full object-contain fade-semifast"
                src={rickroll_cta_link}
                alt=""
              />
              <div>
                <div className="flex items-center fade-semifast justify-start space-x-2 bg-white text-black p-5">
                  <div>
                    <h1 className="text-xl font-[Poppins] font-bold">{name}</h1>
                    <p className="mt-2 text-sm whitespace-pre-wrap font-[Poppins] fade-semifast">
                      {description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center fade-semifast justify-center space-x-2 bg-white text-black p-5">
                  <button
                    onClick={() => router.push(`/admin/rickroll/${id}/edit`)}
                    className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-600"
                    type="button"
                  >
                    Päivitä
                  </button>
                  <button
                    onClick={() => router.push(`/admin/rickroll/${id}/delete`)}
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
      ))}
    </div>
  )
}
export default Admin
