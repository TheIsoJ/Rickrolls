import { useRouter } from "next/router"
import Head from "next/head"
import Header from "../../../components/Header"
import RickrollInputBox from "../../../components/RickrollInputBox"

const NewRickroll = () => {
  const router = useRouter()

  return (
    <div className="bg-teal-800 text-white min-h-screen flex flex-col flex-1">
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

      <RickrollInputBox />
    </div>
  )
}
export default NewRickroll
