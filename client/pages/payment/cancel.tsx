import { useRouter } from "next/router"
import Header from "../../components/Header"
import Head from "next/head"

const Canceled = () => {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Maksu peruutettu - Rickrolls</title>
      </Head>

      <Header sticky isDeveloping />
      
      <div className="flex items-center justify-center min-h-[75.1vh] w-full py-16 lg:py-16">
        <div className="space-y-5 px-10 flex flex-col items-center lg:items-center lg:justify-between text-center lg:text-start">
          <h1 className="max-w-xl font-[Poppins] font-bold text-4xl">
            Maksu peruutettu.
          </h1>
          <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal">
            Meidän tietojen mukaan peruutit maksuprosessin.
          </h2>
          <button
            onClick={() => router.push("/plus")}
            className="bg-teal-600 text-white hover:shadow-lg hover:shadow-gray-400 rounded-full font-[Poppins] font-bold w-auto px-16 py-4 transition-all duration-500 ease-in-out hover:bg-teal-600"
            type="button"
          >
            Aloitetaanko alusta?
          </button>
        </div>
      </div>
    </>
  )
}
export default Canceled
