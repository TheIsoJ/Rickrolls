import axios from "axios"
import { useRouter } from "next/router"
import { LegacyRef, useEffect, useRef, useState } from "react"
import { HOME_BASE_URL } from "../config"

type Props = {
  initialValue?: RickrollResponseData
  isEditing: boolean
}

const InputBox = ({ initialValue, isEditing }: Props) => {
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [link, setLink] = useState<string>("")
  const [videoId, setVideoId] = useState<string>("")

  const [rickrollCreating, setRickrollCreating] = useState<boolean>(false)

  const nameRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLTextAreaElement>()
  const linkRef = useRef<HTMLInputElement>()
  const videoIdRef = useRef<HTMLInputElement>()

  const [error, setError] = useState<string | null>("")

  const router = useRouter()

  function checkIfEditing(initialValue: RickrollResponseData | undefined) {
    if (isEditing) {
      useEffect(() => {
        setName(initialValue?.rickroll.name as string)
        setDescription(initialValue?.rickroll.description as string)
        setVideoId(initialValue?.rickroll.videoId as string)
        setLink(initialValue?.rickroll.link as string)
      }, [initialValue])
    } else {
      useEffect(() => {
        setName("")
        setDescription("")
        setVideoId("")
        setLink("")
      }, [])
    }
  }

  async function onRickrollCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const result = await axios.post<RickrollResponseData>(HOME_BASE_URL, {
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      videoId: videoIdRef.current?.value,
      link: linkRef.current?.value,
    })

    if (result.status === 400) {
      setError(result.data.error.message)
    } else {
      setError(null)
      router.replace("/admin")
    }
  }

  return (
    <>
      {isEditing ? (
        <>
          {checkIfEditing(initialValue)}
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto my-16 bg-white text-black rounded-md px-10 py-2 sm:shadow-sm">
            <form onSubmit={onRickrollCreate} className="px-5 py-4">
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
                placeholder="Rickrollin videon tunniste"
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
                  disabled={rickrollCreating}
                  className="flex items-center flex-1 uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[1rem] transition-all duration-500 ease-in-out hover:bg-teal-600 disabled:bg-gray-500 disabled:text-black mt-6"
                  type="submit"
                >
                  Lähetä
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto my-16 bg-white text-black rounded-md px-10 py-4 sm:shadow-sm">
            {error ? (
              <h1 className="font-[Poppins] font-extrabold text-3xl text-red-600">
                {error}
              </h1>
            ) : (
              <h1 className="font-[Poppins] font-extrabold text-3xl">
                Lisää uusi rickroll
              </h1>
            )}
          </div>
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto mt-16 mb-32 bg-white text-black rounded-md px-10 py-2 sm:shadow-sm">
            <form onSubmit={onRickrollCreate} className="px-5 py-4">
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin nimi
              </h1>

              <input
                ref={nameRef as LegacyRef<HTMLInputElement>}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
                placeholder="Rickrollin nimi"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin kuvaus
              </h1>
              <textarea
                ref={descriptionRef as LegacyRef<HTMLTextAreaElement>}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2 resize-none"
                placeholder="Rickrollin kuvaus"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin videon tunniste
              </h1>
              <input
                ref={videoIdRef as LegacyRef<HTMLInputElement>}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
                placeholder="Rickrollin linkki"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin linkki
              </h1>
              <input
                ref={linkRef as LegacyRef<HTMLInputElement>}
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
    </>
  )
}
export default InputBox
