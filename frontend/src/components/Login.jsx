import {useState } from "react"
import sideimg from "../assets/sideimg.png"
import { Link,useNavigate } from "react-router-dom"


function Login() {
    const navigate = useNavigate(null)
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAlert,setShowAlert] = useState(false)
    const [alertHeader,setAlertHeader] = useState(null)
    const [alertText,setAlertText] = useState(null)
    const onShowPassClick = function () {
        setShowPass(e => !e)
    }
    const login = async () => {
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        if(username.length<1 || password.length<1){
            setAlertHeader('Invalid Input!')
            setAlertText('Please Enter Username and Password ')
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 10000);
            return null
        }
        setLoading(true)
        const data = {
            user_name: username,
            password: password
        }
        const fetchUrl = await fetch('https://token-easebackend.vercel.app/login', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        setLoading(false)
        if(fetchUrl.status == 401){
            setAlertHeader('Invalid Credentials!')
            setAlertText('Please Enter Correct Username and Password')
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 10000);
            return null
        }
        await fetchUrl.json()
        setAlertHeader('Congratulations!')
        setAlertText('User Log-in Successfully! Redirecting to Dashboard...')
        setShowAlert(true)
            setTimeout(() => {
            navigate('/dashboard')
            }, 5000);
    }
    return (
        <>
            <div className="container flex h-[704px] bg-[#C3C9EF]">
                <div className="w-160 h-[528px] flex my-22 ml-24 justify-center items-center">
                    <img className="w-[597.85px] h-[385.7px]" src={sideimg} alt="" /></div>
                <div className="w-140 h-160 bg-white my-8 flex flex-col items-center rounded-[8px] mx-12">
                    <p className="text-[#0504AA] bona-nova-sc-font tracking-[4px] font-bold text-center">Qweekly</p>
                    <div className="username flex flex-col mb-8 inter-font font-semibold">
                        <label htmlFor="username">Username:</label>
                        <input type='text' name="username" id="username" className="bg-[#C3C9EF] px-1 outline-[#C3C9EF] text-lg focus:bg-[#031273] ease-in-out duration-100 focus:text-white rounded-[8px] w-124 h-12" />
                    </div>
                    <div className="password flex flex-col mb-8 inter-font font-semibold">
                        <label htmlFor="password">Password:</label>
                        <div className="flex"><input type={showPass ? "text" : "password"} name="password" id="password" className="bg-[#C3C9EF] px-1 outline-[#C3C9EF] text-lg focus:bg-[#031273] ease-in-out duration-100 focus:text-white rounded-l-[8px] w-108 h-12" />
                            <span className="bg-white border-[#C3C9EF] border-2 rounded-r-[8px] flex justify-center items-center  w-16 h-12">{showPass && <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={onShowPassClick} height="24px" viewBox="0 -960 960 960" width="24px" fill="#031273"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z" /></svg>}{!showPass && <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={onShowPassClick} height="24px" viewBox="0 -960 960 960" width="24px" fill="#031273"><path d="M792-56 624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM480-320q11 0 20.5-1t20.5-4L305-541q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480-680q-20 0-37.5 4T408-664L306-766q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302ZM587-486 467-606q28-5 51.5 4.5T559-574q17 18 24.5 41.5T587-486Z" /></svg>}</span></div>
                    </div>
                    <div className="container flex mb-8 gap-x-2 items-center w-124">
                        <p className="inter-font font-semibold text-lg">New to Qweegly?</p><Link to={'/signup'}><p className="roboto-font italic text-lg text-[#0504AA] underline cursor-pointer">Sign-up Now!</p></Link>
                    </div>
                    <div className="w-40 h-16 rounded-[8px] bg-[#031273] hover:bg-[#020936] ease-in-out duration-100 text-white text-xl cursor-pointer flex justify-center items-center roboto-font font-bold" onClick={login}>Log-in</div>
                </div>
                {loading && <div className="container absolute flex bg-gray-white/75 backdrop-blur-sm h-[704px] justify-center items-center">
                    <div role="status">
                        <svg aria-hidden="true" className="w-12 h-12 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#C3C9EF" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#0504AA" />
                        </svg>
                    </div>
                </div>}
                {showAlert && <div className={`px-8 py-4 my-4 items-center gap-x-16  absolute left-[30%] rounded-md roboto-font flex text-xl rounded-base ${(alertHeader=='Invalid Input!'|| alertHeader=='Invalid Credentials!')? "bg-red-600" : "bg-green-600"} text-white`} role="alert">
                    <div className="flex gap-x-2"><span className="font-extrabold">{alertHeader}</span><span className="font-semibold">{alertText}</span> </div><svg onClick={()=>{clearTimeout(); setShowAlert(false)}} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </div>}
            </div>
        </>
    )
}

export default Login