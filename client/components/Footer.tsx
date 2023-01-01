const Footer = () => {
  return (
    <div className="bg-teal-700 flex items-center space-x-8 justify-center p-5 shadow-lg">
      <img className="w-48 object-cover" src="https://jesunmaailma.ml/images/Rickrolls-logo.svg" alt="" />
      <p className="font-[Poppins] text-white font-normal text-xl">
        © {new Date().getFullYear()} Rickrolls
      </p>
    </div>
  )
}
export default Footer
