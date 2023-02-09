import { DotPulse } from "@uiball/loaders"
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../../../../components/Header"
import { useAdminRickrollFetch } from "../../../../hooks/admin/useAdminRickrollFetch"
import RickrollInputBox from "../../../../components/RickrollInputBox"

const EditRickroll = () => {
  const router = useRouter()
  
  const { slugOrId } = router.query
  const { res, loading } = useAdminRickrollFetch(slugOrId as string)

  if (loading) {
    return (
      <>
        <Head>
          <title>Ladataan...</title>
        </Head>
        <div className="bg-teal-900 flex items-center justify-center min-h-screen overflow-hidden">
          <DotPulse speed={1} size={96} color="white" />
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col flex-1 bg-teal-800 text-white min-h-screen">
      <Head>
        <title>Päivitä rickrollia - Rickrolls</title>
      </Head>

      <Header sticky />

      <div className="flex flex-col items-center justify-center mt-8">
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-600"
          type="button"
        >
          Takaisin
        </button>
      </div>
      {res && <RickrollInputBox initialValue={res} isEditing />}
    </div>
  )
}

export default EditRickroll
