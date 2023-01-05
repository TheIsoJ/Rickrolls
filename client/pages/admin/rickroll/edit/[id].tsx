import { DotPulse } from "@uiball/loaders"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { FormEvent, FormEventHandler, useState } from "react"
import Header from "../../../../components/Header"
import axios from "axios"
import { API_KEY, HOME_BASE_URL } from "../../../../config"
import { useAdminRickrollEdit } from "../../../hooks/admin/useAdminRickrollEdit"
import { useAdminRickrollFetch } from "../../../hooks/admin/useAdminRickrollFetch"
import { useAdminRickrollCreate } from "../../../hooks/admin/useAdminRickrollCreate"

const NewRickroll = () => {
  const router = useRouter()
  const { id } = router.query

  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [videoId, setVideoId] = useState<string>("")

  const [rickrollCreating, setRickrollCreating] = useState<boolean>(false)

  const { res, loading } = useAdminRickrollFetch(id as string)

  function handleSubmit() {
    const { loading: rickrollCreating, error } = useAdminRickrollCreate(
      name,
      description,
      link
    )
    if (rickrollCreating) setRickrollCreating(rickrollCreating)
  }

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
    <div className="bg-teal-800 text-white min-h-screen">
      <Head>
        <title>Päivitä rickrollia - Rickrolls</title>
      </Head>

      <Header sticky />

      <div className="h-auto flex flex-col items-center justify-center mt-16">
        <h1 className="font-[Poppins] font-extrabold text-3xl">
          Päivitä rickrollia
        </h1>
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-600 mt-6"
          type="button"
        >
          Takaisin
        </button>
      </div>
      {res && (
        <>
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto my-16 bg-white text-black rounded-md px-10 py-2 sm:shadow-sm">
            <form onSubmit={handleSubmit} className="px-5 py-4">
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin nimi
              </h1>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
                placeholder="Rickrollin nimi"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin kuvaus
              </h1>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2 resize-none"
                placeholder="Rickrollin kuvaus"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin videon tunniste
              </h1>
              <input
                value={videoId}
                onChange={(e) => setVideoId(e.target.value)}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
                placeholder="Rickrollin vidoen tunniste"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin linkki
              </h1>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
                placeholder="Rickrollin linkki"
              />
              <div className="flex items-center justify-center">
                <button
                  className="flex items-center flex-1 uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[1rem] transition-all duration-500 ease-in-out hover:bg-teal-600 mt-6"
                  type="submit"
                >
                  Lähetä
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
export default NewRickroll
