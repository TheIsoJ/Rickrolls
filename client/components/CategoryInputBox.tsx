import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { useAdminCategoryCreate } from "../hooks/admin/useAdminCategoryCreate"
import { useAdminCategoryEdit } from "../hooks/admin/useAdminCategoryEdit"

type Props = {
  initialValue?: CategoryResponseData
  isEditing?: boolean
}

const CategoryInputBox = ({ initialValue, isEditing }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const router = useRouter()

  const checkIfEditing = (initialValue: CategoryResponseData | undefined) => {
    if (isEditing) {
      useEffect(() => {
        nameRef.current!.value = initialValue?.category?.name as string
        descriptionRef.current!.value = initialValue?.category
          ?.description as string
      }, [initialValue])
    } else {
      useEffect(() => {
        nameRef.current!.value = ""
        descriptionRef.current!.value = ""
      }, [])
    }
  }

  const onCategoryCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      useAdminCategoryCreate<void>(
        nameRef.current!.value,
        descriptionRef.current!.value
      ).then(() => {
        return router.replace("/admin")
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onCategoryUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id: string = initialValue?.category?.id as string

    try {
      useAdminCategoryEdit<void>(
        id,
        nameRef.current!.value,
        descriptionRef.current!.value
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
          <div className="flex flex-col max-w-7xl mx-auto my-16 overflow-y-scroll scrollbar-none bg-white text-black rounded-3xl px-10 py-2 sm:shadow-sm">
            <form onSubmit={onCategoryUpdate} className="px-5 py-4">
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Kategorian nimi
              </h1>

              <input
                ref={nameRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Kategorian kuvaus
              </h1>
              <textarea
                ref={descriptionRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
              />
              <div className="flex items-center justify-center">
                <button
                  className="flex items-center flex-1 uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[1rem] transition-all duration-500 ease-in-out hover:bg-teal-600 disabled:bg-gray-500 disabled:text-black mt-6"
                  type="submit"
                >
                  Päivitä kategoria
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col max-w-7xl mx-auto my-16 overflow-y-scroll scrollbar-none bg-white text-black rounded-3xl px-10 py-2 sm:shadow-sm">
            <form onSubmit={onCategoryCreate} className="px-5 py-4">
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Kategorian nimi
              </h1>

              <input
                ref={nameRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Kategorian kuvaus
              </h1>
              <textarea
                ref={descriptionRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
              />
              <div className="flex items-center justify-center">
                <button
                  className="flex items-center flex-1 uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[1rem] transition-all duration-500 ease-in-out hover:bg-teal-600 mt-6"
                  type="submit"
                >
                  Luo kategoria
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  )
}
export default CategoryInputBox
