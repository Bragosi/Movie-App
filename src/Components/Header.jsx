import logo from '../assets/bragosiLogo2 (2).png'
const Header = () => {
  return (
   <header className="fixed top-0 w-full h-16 bg-opacity-75 bg-neutral-600  ">
    <div className="container h-full">
        <img src={logo} alt="logo" width={40}  />
    </div>
   </header>
  )
}

export default Header