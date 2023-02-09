import Link from "next/link"

const Footer = () => {
  return (
    <div className="bg-teal-700 flex flex-col items-center space-y-5 justify-center p-5 shadow-lg">
      <p className="font-[Poppins] text-white font-normal text-xl">
        © {new Date().getFullYear()} Rickrolls
      </p>
      <Link href="/">
        <img
          className="w-48 object-cover"
          src="https://jesunmaailma.ml/images/Rickrolls-logo.svg"
          alt=""
        />
      </Link>
      <a href="https://github.com/TheIsoJ/Rickrolls/tree/main/client">
        <div className="flex items-center text-white px-4 py-3 rounded-2xl transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-400/50 space-x-3">
          <img
            className="w-10 h-10 bg-white p-1 rounded-full object-cover"
            src="https://jesunmaailma.ml/images/github_logo.png"
            alt="Github-repositorio"
          />
          <p className="font-bold">GitHub</p>
        </div>
      </a>
    </div>
  )
}
export default Footer
