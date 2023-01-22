import { DotPulse } from "@uiball/loaders"
import { useRouter } from "next/router"
import { LegacyRef, useEffect, useRef, useState } from "react"
import { useAdminRickrollCreate } from "../pages/hooks/admin/useAdminRickrollCreate"
import { useAdminRickrollEdit } from "../pages/hooks/admin/useAdminRickrollEdit"

type Props = {
  initialValue?: RickrollResponseData
  isEditing?: boolean
}

const InputBox = ({ initialValue, isEditing }: Props) => {
  const nameRef = useRef<HTMLInputElement>()
  const descriptionRef = useRef<HTMLTextAreaElement>()
  const linkRef = useRef<HTMLInputElement>()
  const videoIdRef = useRef<HTMLInputElement>()

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

  const onRickrollCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    useEffect(() => {
      try {
        useAdminRickrollCreate<Rickroll>(
          nameRef.current!.value,
          descriptionRef.current!.value,
          videoIdRef.current!.value,
          linkRef.current!.value,
        ).then(res => {
          if (res) return router.replace("/admin")
        })

      } catch (error) {
        console.log(error)
      }
    }, [])
  }

  const onRickrollEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id: string = initialValue?.rickroll.id as string

    useEffect(() => {
      try {
        useAdminRickrollEdit<Rickroll>(
          id,
          nameRef.current!.value,
          descriptionRef.current!.value,
          videoIdRef.current!.value,
          linkRef.current!.value,
        ).then(res => {
          if (res) return router.replace("/admin")
        })
      } catch (error) {
        console.log(error)
      }
    }, [])
  }

  return (
    <>
      {isEditing || initialValue ? (
        <>
          {checkIfEditing(initialValue)}
          <div className="flex flex-col items-center justify-center max-w-lg mx-auto my-16 bg-white text-black rounded-md px-10 py-2 sm:shadow-sm">
            <form onSubmit={onRickrollEdit} className="px-5 py-4">
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
                placeholder="Rickrollin videon tunniste"
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
