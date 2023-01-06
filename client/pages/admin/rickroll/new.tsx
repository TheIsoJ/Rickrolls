import { useRouter } from "next/router"
import Head from "next/head"
import Header from "../../../components/Header"
import InputBox from "../../../components/InputBox"

const NewRickroll = () => {
  const router = useRouter()

  /* if (loading) {
    return (
      <>
        <Head>
          <title>Ladataan...</title>
        </Head>
        <div className="bg-teal-900 flex items-center justify-center min-h-[75.1vh]">
          <DotPulse speed={1} size={96} color="white" />
        </div>
      </>
    )
  } */

  return (
    <div className="bg-teal-800 text-white min-h-screen">
      <Head>
        <title>Lisää uusi rickroll - Rickrolls</title>
      </Head>

      <Header sticky />

      <div className="h-auto flex flex-col items-center justify-center mt-8">
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center uppercase justify-center bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-teal-600"
          type="button"
        >
          Takaisin
        </button>
      </div>

      <InputBox isEditing={false} />
    </div>
  )
}
export default NewRickroll
