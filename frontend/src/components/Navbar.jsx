import { Link } from "react-router-dom"
// import '../css/fonts.css'
function Navbar(){
    return (
        <>
        <div className="container flex bg-[#C3C9EF] h-24 rounded-b-[8px] border-b-[2px]">
        <div id="logo" className="flex items-center">
            <div className="h-24 w-32 bg-[url('./assets/logo.png')] bg-size-[120%] bg-center ml-8 " ></div>
            <span className="text-[#0504AA] bona-nova-sc-font font-bold tracking-[4px]" style={{
            }}>Qweegly</span>
        </div>
        <nav className="mx-12 w-[578px] flex items-center">
            <ul>
                <Link to={'/'}><li className="w-24 h-8 rounded-[8px] bg-[#031273] text-white flex justify-center items-center roboto-font hover:bg-[#020936] ease-in-out duration-100 cursor-pointer font-bold">Home</li></Link>
            </ul>
        </nav>
        <div className="buttons flex gap-x-8 items-center">
            <Link to={"/login"}><div className="w-40 h-16 rounded-[8px] bg-[#031273] hover:bg-[#020936] ease-in-out duration-100 text-white text-xl cursor-pointer flex justify-center items-center roboto-font font-bold">Log-in</div></Link>
            <Link to={"/signup"}><div className="w-40 h-16 rounded-[8px] bg-[#031273] hover:bg-[#020936] ease-in-out duration-100 text-white text-xl cursor-pointer flex justify-center items-center roboto-font font-bold">Sign-up</div></Link>
        </div>
        </div>
        </>
    )
}

export default Navbar