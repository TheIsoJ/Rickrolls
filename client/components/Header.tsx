import Link from "next/link"
import { useUser } from "@auth0/nextjs-auth0/client"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { DotPulse } from "@uiball/loaders"

type Props = {
  sticky?: boolean
}

const Header = ({ sticky }: Props) => {
  const { user, error, isLoading } = useUser()

  return (
    <header className={`${sticky && "sticky top-0 z-10"} bg-teal-700 flex justify-between p-5`}>
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
            <div className="border rounded-lg transition-all duration-200 ease-in-out hover:bg-white px-6 py-2 flex items-center space-x-3 text-white hover:text-black cursor-pointer font-[Poppins]">
              <p className="text-lg sm:truncate text-center">
                {user?.name?.split(" ")[0]}
              </p>
            </div>
          </Link>
      ) : (
        <Link className="flex items-center space-x-3" href="/tili">
          <div className="border rounded-lg transition-all duration-200 ease-in-out hover:bg-white px-6 py-4 flex items-center space-x-3 text-white hover:text-black cursor-pointer font-[Poppins]">
            {isLoading ? (
              <DotPulse speed={0.8} size={60} color="white" />
            ) : (
              <p className="hidden sm:inline text-sm font-normal">Kirjaudu sisään</p>
            )}
          </div>
        </Link>
      )}
    </header>
  )
}
export default Header
