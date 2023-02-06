const Footer = () => {
  return (
    <div className="bg-teal-700 flex flex-col items-center space-y-5 justify-center p-5 shadow-lg">
      <p className="font-[Poppins] text-white font-normal text-xl">
        © {new Date().getFullYear()} Rickrolls
      </p>
      <img className="w-48 object-cover" src="https://jesunmaailma.ml/images/Rickrolls-logo.svg" alt="" />
    </div>
  )
}
export default Footer
