import type { NextPage } from "next"
import Head from "next/head"
import axios from "axios"
import Link from "next/link"
import { HOME_BASE_URL, PRODUCTS_BASE_URL } from "../config"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const Home: NextPage = () => {
  const router = useRouter()
  const [rickrollsResults, setRickrollsResults] =
    useState<RickrollsResponseData>()

  useEffect(() => {
    axios.get(HOME_BASE_URL).then((res) => {
      setRickrollsResults(res.data)
    })
  }, [])

  return (
    <div className="d-flex items-center justify-center min-h-screen">
      <Head>
        <title>Etusivu - Rickrolls</title>
      </Head>

      {rickrollsResults?.rickrolls[0] ? (
        <>
          <a href={rickrollsResults.rickrolls[0].link} target="_blank">
            <div
              key={rickrollsResults.rickrolls[0].id}
              className={`flex items-center justify-between h-screen w-full py-32 lg:py-0 bg-[#002f6c] hover:opacity-60 transition-all duration-300 ease-in-out`}
            >
              <div className="space-y-5 px-10">
                <h1 className="max-w-xl font-[Poppins] font-extrabold text-5xl text-white">
                  {rickrollsResults.rickrolls[0].name}
                </h1>
                <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal text-white">
                  {rickrollsResults.rickrolls[0].description}
                </h2>
              </div>

              <img
                className="hidden m-16 md:inline md:w-80 md:h-80 md:object-cover lg:w-96 lg:h-96 lg:object-cover rounded-lg shadow-2xl"
                src={`${rickrollsResults.rickrolls[0].rickroll_cta_link}`}
                alt=""
              />
            </div>
          </a>
        </>
      ) : null}

      <h1 className="max-w-xl font-[Poppins] font-extrabold text-2xl my-5 mx-4">
        Rickrollit
      </h1>
      {rickrollsResults?.rickrolls.map(
        ({ id, name, description, rickroll_cta_link }) => (
          <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
            <div className="group cursor-pointer overflow-hidden rounded-lg border shadow-md">
              <Link key={id} href={`/rickroll/${id}`}>
                <img
                  className="w-full object-contain transition-transform duration-200 ease-in-out group-hover:scale-105"
                  src={rickroll_cta_link}
                  alt=""
                />
                <div className="flex items-center justify-between bg-white p-5">
                  <div>
                    <h1 className="text-lg font-[Poppins] font-bold">{name}</h1>
                    <p className="mt-2 text-xs whitespace-pre-wrap font-[Poppins]">
                      {description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Home
