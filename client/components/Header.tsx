import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { DotPulse } from "@uiball/loaders"

const Header = () => {
  const { user, error, isLoading } = useUser()

  return (
    <header className="sticky top-0 z-10 bg-teal-700 flex justify-between p-5 shadow-lg">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="w-40 sm:w-44 cursor-pointer object-contain"
            src="https://jesunmaailma.ml/images/Rickrolls-logo.svg"
            alt=""
          />
        </Link>
      </div>

      <div className="flex items-center justify-center">
        {error && (
          <div className="bg-black text-white px-4 py-2 rounded-full">
            Virhe on sattunut. {error.message}
          </div>
        )}
      </div>

      {user ? (
        <Link className="flex items-center space-x-3" href="/tili">
          <div className="border rounded-lg transition-all duration-200 ease-in-out hover:bg-white px-4 py-2 flex items-center space-x-3 text-white hover:text-black cursor-pointer font-[Poppins]">
            <img className="w-7 h-7 rounded-full" src={user?.picture!} />
            <p className="hidden sm:inline text-sm font-bold">
              {user?.name!}
            </p>
          </div>
        </Link>
      ) : (
        <a className="flex items-center" href="/api/auth/login">
          <div className="border rounded-lg transition-all duration-200 ease-in-out hover:bg-white px-4 py-2 flex items-center space-x-3 text-white hover:text-black cursor-pointer font-[Poppins]">
            <UserCircleIcon className={`${isLoading && "hidden"} w-7 h-7 sm:inline-flex rounded-full hover:text-white`} />
            {isLoading ? (
              <DotPulse speed={0.8} size={42} color="white" />
            ) : (
              <p className="hidden sm:inline text-sm font-bold">Kirjaudu</p>
            )}
          </div>
        </a>
      )}
    </header>
  )
}
export default Header
