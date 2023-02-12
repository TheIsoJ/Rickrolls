import Head from "next/head"
import Header from "../../../../components/Header"
import { useRouter } from "next/router"
import { useAdminSubscriptionDelete } from "../../../../hooks/admin/useAdminSubscriptionDelete"

const DeleteRickroll = () => {
    const router = useRouter()
    const { id } = router.query

    async function onDeleteSubscription(id: string) {
      try {
        await useAdminSubscriptionDelete<void>(id)
        router.replace("/admin")
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <>
      <Head>
        <title>Poista rickroll - Rickrolls</title>
      </Head>
      <Header sticky />
      <div className="flex items-center fade-semifast justify-center space-y-8 space-x-2 bg-white text-black p-5">
        <div>
          <h1 className="text-2xl text-center font-[Poppins] font-bold">
            Haluatko varmasti poistaa tämän tilauksen?
          </h1>
        </div>
      </div>
      <div className="flex items-center fade-semifast justify-center space-x-2 bg-white text-black p-5">
        <button
          onClick={() => router.replace(`/admin`)}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-600"
          type="button"
        >
          Ei
        </button>
        <button
          onClick={() => onDeleteSubscription(id as string)}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-md hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-red-600"
          type="button"
        >
          Kyllä
        </button>
      </div>
    </>
  )
}
export default DeleteRickroll
