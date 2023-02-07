import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { useAdminSubscriptionCreate } from "../hooks/admin/useAdminSubscriptionCreate"
import { useAdminSubscriptionEdit } from "../hooks/admin/useAdminSubscriptionEdit"

type Props = {
  id?: string
  initialValue?: ProductResponseData
  isEditing?: boolean
}

const SubscriptionInputBox = ({ id, initialValue, isEditing }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const activeRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const productId = id

  const checkIfEditing = (initialValue: ProductResponseData | undefined) => {
    if (isEditing) {
      useEffect(() => {
        nameRef.current!.value = initialValue?.product?.name as string
        descriptionRef.current!.value = initialValue?.product
          ?.description as string
        activeRef.current!.checked = initialValue?.product.active as boolean
        priceRef.current!.value =
          initialValue?.product?.price.toString() as string
      }, [initialValue])
    } else {
      useEffect(() => {
        nameRef.current!.value = ""
        descriptionRef.current!.value = ""
        activeRef.current!.value = ""
        priceRef.current!.value = ""
      }, [])
    }
  }

  const onProductCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      useAdminSubscriptionCreate<void>(
        nameRef.current!.value,
        descriptionRef.current!.value,
        priceRef.current!.value,
        activeRef.current!.checked
      ).then(() => {
        return router.replace("/admin")
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onProductEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      useAdminSubscriptionEdit<void>(
        productId! as string,
        nameRef.current!.value,
        descriptionRef.current!.value,
        priceRef.current!.value,
        activeRef.current!.checked
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
            <form onSubmit={onProductEdit} className="my-4 p-2">
              <h1 className="font-[Poppins] text-md font-bold">
                Tilauksen nimi
              </h1>
              <input
                ref={nameRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Tilauksen kuvaus
              </h1>
              <textarea
                ref={descriptionRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2 h-32 overflow-hidden"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Tilauksen hinta
              </h1>
              <input
                ref={priceRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="number"
                min={100}
                max={100000}
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Onko tilaus aktiivinen?
              </h1>
              <input
                ref={activeRef}
                type="checkbox"
                checked={initialValue?.product.active}
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
          <div className="flex flex-col max-w-7xl mx-auto my-16 overflow-y-scroll scrollbar-none bg-white text-black rounded-3xl px-10 py-2 sm:shadow-sm">
            <form onSubmit={onProductCreate} className="my-4 p-2">
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Tilauksen nimi
              </h1>
              <input
                ref={nameRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="text"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Tilauksen kuvaus
              </h1>
              <textarea
                ref={descriptionRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2 resize-none"
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Tilauksen hinta
              </h1>
              <input
                ref={priceRef}
                className="flex flex-col flex-1 items-center justify-center border-2 border-black bg-transparent outline-none text-black rounded-md font-[Poppins] px-6 py-[0.75rem] w-full mr-6 mt-2"
                type="number"
                min={100}
                max={100000}
              />
              <h1 className="font-[Poppins] mt-6 text-md font-bold">
                Onko tilaus aktiivinen?
              </h1>
              <input
                ref={activeRef}
                className="px-6 py-[0.75rem]"
                type="checkbox"
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
export default SubscriptionInputBox
