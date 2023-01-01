import { handleAuth, handleLogout, handleLogin } from "@auth0/nextjs-auth0"

export default handleAuth({
  login: handleLogin({ returnTo: "/tili" }),
  logout: handleLogout({ returnTo: "/" }),
})
