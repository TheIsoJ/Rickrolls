import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { useAdminRickrollCreate } from "../hooks/admin/useAdminRickrollCreate"
import { useAdminRickrollEdit } from "../hooks/admin/useAdminRickrollEdit"

type Props = {
  initialValue?: RickrollResponseData
  isEditing?: boolean
}

const RickrollInputBox = ({ initialValue, isEditing }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const videoIdRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const checkIfEditing = (initialValue: RickrollResponseData | undefined) => {
    if (isEditing) {
      useEffect(() => {
        nameRef.current!.value = initialValue?.rickroll?.name as string
        descriptionRef.current!.value = initialValue?.rickroll
          ?.description as string
        videoIdRef.current!.value = initialValue?.rickroll?.videoId as string
        linkRef.current!.value = initialValue?.rickroll?.link as string
      }, [initialValue])
    } else {
      useEffect(() => {
        nameRef.current!.value = ""
        descriptionRef.current!.value = ""
        videoIdRef.current!.value = ""
        linkRef.current!.value = ""
      }, [])
    }
  }

  const onRickrollCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      useAdminRickrollCreate<void>(
        nameRef.current!.value,
        descriptionRef.current!.value,
        videoIdRef.current!.value,
        linkRef.current!.value
      ).then(() => {
        return router.replace("/admin")
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onRickrollUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id: string = initialValue?.rickroll.id as string

    try {
      useAdminRickrollEdit<void>(
        id,
        nameRef.current!.value,
        descriptionRef.current!.value,
        videoIdRef.current!.value,
        linkRef.current!.value
      ).then(() => {
        return router.replace("/admin")
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isEditing || initialValue ? (
        <>
          {checkIfEditing(initialValue)}
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto mt-16 mb-32 bg-white text-black rounded-md px-10 py-2 sm:shadow-sm">
            <form onSubmit={onRickrollUpdate} className="px-5 py-4">
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin nimi
              </h1>

              <input
                ref={nameRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin kuvaus
              </h1>
              <textarea
                ref={descriptionRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2 resize-none"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin videotunniste
              </h1>
              <input
                ref={videoIdRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin linkki
              </h1>
              <input
                ref={linkRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
              />
              <div className="flex items-center justify-center">
                <button
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
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto mt-16 mb-32 bg-white text-black rounded-md px-10 py-2 sm:shadow-sm">
            <form onSubmit={onRickrollCreate} className="px-5 py-4">
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin nimi
              </h1>

              <input
                ref={nameRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin kuvaus
              </h1>
              <textarea
                ref={descriptionRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2 resize-none"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin videon tunniste
              </h1>
              <input
                ref={videoIdRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Rickrollin linkki
              </h1>
              <input
                ref={linkRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
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
export default RickrollInputBox
