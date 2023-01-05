import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useHomeFetch } from "./hooks/useHomeFetch"
import { DotPulse } from "@uiball/loaders"

const Home: NextPage = () => {
  const { res, loading, error } = useHomeFetch()

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
    <div className="bg-teal-800 text-white d-flex items-center justify-center min-h-screen">
      <Head>
        <title>Etusivu - Rickrolls</title>
      </Head>

      {res?.rickrolls[0] ? (
        <>
          <a href={res.rickrolls[0].link} target="_blank">
            <div
              key={res.rickrolls[0].id}
              className={`flex items-center justify-between h-auto w-full py-32 lg:py-0 bg-gray-700 transition-all duration-500 ease-in-out rounded-2xl scale-90 hover:scale-95 hover:rounded-none hover:shadow-xl hover:shadow-gray-500 hover:bg-gray-600 cursor-pointer`}
            >
              <div className="space-y-5 px-10">
                <h1 className="max-w-xl font-[Poppins] font-extrabold text-5xl text-white">
                  {res.rickrolls[0].name}
                </h1>
                <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal text-white">
                  {res.rickrolls[0].description}
                </h2>
              </div>

              <img
                className="hidden m-16 md:inline md:w-80 md:h-80 md:object-cover lg:w-96 lg:h-96 lg:object-cover rounded-2xl shadow-2xl"
                src={`${res.rickrolls[0].rickroll_cta_link}`}
                alt=""
              />
            </div>
          </a>
        </>
      ) : null}

      <h1 className="max-w-xl font-[Poppins] font-extrabold text-3xl my-6 m-4">
        Rickrollit
      </h1>
      {res?.rickrolls.map(({ id, name, description, rickroll_cta_link }) => (
        <>
          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
            <div className="hover:scale-90 hover:shadow-xl hover:shadow-gray-400 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden rounded-xl border shadow-md">
              <Link key={id} href={`/rickroll/${id}`}>
                <img
                  className="w-full object-contain"
                  src={rickroll_cta_link}
                  alt=""
                />
                <div className="flex items-center justify-between bg-white text-black p-5">
                  <div>
                    <h1 className="text-xl font-[Poppins] font-bold">{name}</h1>
                    <p className="mt-2 text-sm whitespace-pre-wrap font-[Poppins]">
                      {description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </>
      ))}
    </div>
  )
}

export default Home
