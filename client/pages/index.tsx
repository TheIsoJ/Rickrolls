import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useHomeFetch } from "../hooks/regular-user/useHomeFetch"
import { DotPulse } from "@uiball/loaders"
import Header from "../components/Header"

const Home: NextPage = () => {
  const { res, loading } = useHomeFetch()

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
    <div className="bg-teal-800 text-white d-flex items-center justify-center min-h-screen flex-1">
      <Head>
        <title>Etusivu - Rickrolls</title>
      </Head>

      <Header sticky />

      {res?.categories[0].rickrolls[0] ? (
        <>
          <a
            key={res.categories[0].rickrolls[0].slug}
            href={`/${res.categories[0].name.toLowerCase()}/${res.categories[0].rickrolls[0].slug}`}
            target="_blank"
          >
            <div
              key={res.categories[0].rickrolls[0].id}
              className={`flex items-center justify-between h-auto w-full py-32 lg:py-0 bg-gray-700 transition-all duration-500 ease-in-out rounded-2xl scale-90 hover:scale-95 hover:rounded-none hover:shadow-xl hover:shadow-gray-500 hover:bg-gray-600 cursor-pointer fade-semifast`}
            >
              <div className="space-y-5 px-10">
                <h1 className="max-w-xl font-[Poppins] font-extrabold text-5xl text-white fade-semifast-text">
                  {res.categories[0].rickrolls[0].name}
                </h1>
                <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal text-white fade-semifast-text">
                  {res.categories[0].rickrolls[0].description}
                </h2>
              </div>

              <div className="hidden m-16 md:inline md:w-80 md:h-80 md:object-cover bg-gray-400 lg:w-96 lg:h-96 lg:object-cover rounded-2xl shadow-2xl overflow-hidden">
                <img
                  className="hidden md:inline md:w-80 md:h-80 object-cover lg:w-96 lg:h-96 fade-semifast-text"
                  src={`${res.categories[0].rickrolls[0].imageUrl}`}
                  alt=""
                />
              </div>
            </div>
          </a>
        </>
      ) : null}

      {res?.categories?.map((category) => (
        <>
          <div className="flex flex-col px-8 mt-4">
            <h1 className="max-w-xl font-[Poppins] font-extrabold text-lg lg:text-3xl">
              {category.name}
            </h1>
            <p className="max-w-xl font-[Poppins] text-sm md:text-lg mt-2">
              {category.description}
            </p>
            {category.rickrolls.map(
              ({ slug, name, description, imageUrl, tags }) => (
                <>
                  <Link
                    key={slug}
                    href={{
                      pathname: `/[category]/[slug]`,
                      query: {
                        category: `${category.name.toLowerCase()}`,
                        slug,
                      },
                    }}
                  >
                    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
                      <div className="hover:scale-95 hover:shadow-xl hover:shadow-gray-400 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden rounded-xl border shadow-md bg-gray-400 fade">
                        <img
                          className="w-full object-contain fade-semifast"
                          src={imageUrl}
                          alt=""
                        />
                        <div className="flex items-center justify-between bg-white text-black p-5">
                          <div>
                            <h1 className="text-xl font-[Poppins] font-bold fade-semifast">
                              {name}
                            </h1>
                            <p className="mt-2 text-sm whitespace-pre-wrap font-[Poppins] fade-semifast">
                              {description}
                            </p>
                            <div className="flex space-x-2 fade-semifast">
                              {tags?.map((tag) => (
                                <p className="flex bg-teal-400 my-2 px-2 py-1 font-[Poppins] text-xs uppercase rounded-full">
                                  {tag}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              )
            )}
          </div>
        </>
      ))}
    </div>
  )
}

export default Home
