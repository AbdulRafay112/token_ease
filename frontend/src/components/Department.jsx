import { useContext, useEffect,useState } from "react"
import AppContext from "../State/Context"
import { Link, useSearchParams } from "react-router-dom"


function Department(){
    const Context = useContext(AppContext)
    const [departments, setDepartments] = useState([])
    const [department,setDepartment] = useState()
    const [username,setUsername] = useState()
    const [totalTokens,setTotalTokens] = useState(0)
    const [currentToken,setCurrentToken] = useState(0)
    const [currentName,setCurrentName] = useState('Name')
    const [currentPhone,setCurrentPhone] = useState('Phone No')
    const [showAddPopUp,setShowAddPopUp] = useState(false)
    const [addAlert,setAlert] = useState(false)
    const [addAlertText,setAddAlertText] = useState('Invalid Phone Number')
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')
    useEffect(() => {
        setCurrentName('Name')
        setCurrentPhone('Phone No')
        fetchOrgDetails()
        fetchDepartment()
    }, [id])
    useEffect(()=>{
           if(currentToken>0){
               fetchToken()
           }
    },[currentToken])
    const fetchOrgDetails = async () => {
        const fetchUrl = await fetch('http://127.0.0.1:8000/org', {
            method: "GET",
            credentials: "include"
        })
        const fetchData = await fetchUrl.json()
        if(fetchData.detail != "Invalid Token"){
            setUsername(fetchData.user_name)
        }
        if(fetchData.detail!="No Departments Yet" && fetchData.detail != "Invalid Token"){
            setDepartments(fetchData.departments)
        }
    }

    const fetchDepartment = async ()=>{
        const fetchUrl = await fetch(`http://127.0.0.1:8000/department?id=${id}`,{
            method : "GET",
            credentials : "include"
        })
        const fetchData = await fetchUrl.json()
        if(fetchData.detail != "Invalid Token"){
            setDepartment(fetchData.name)
            setTotalTokens(fetchData.total_tokens)
            setCurrentToken(fetchData.current_token)
        }
    }
    const fetchToken = async ()=>{
        const fetchUrl = await fetch(`http://127.0.0.1:8000/token?token_no=${currentToken}&dept=${id}`,{
            method : "GET",
            credentials : "include"
        })
        const fetchData = await fetchUrl.json()
        setCurrentName(fetchData.name)
        setCurrentPhone(fetchData.phone_no)
    }

    const addToken = async ()=>{
        const reg = /(^(\+92))(3)[0-9]{9}$/
        const name = document.getElementById('name')
        const phone_no = document.getElementById('phone_no').value
        const result = reg.test(phone_no)
        if(result){
            setAddAlertText('Added Token')
            const data = {
                'name' : name.value || 'Unknown',
                'phone_no' : phone_no,
                'dept_id'  : id
            }
            const fetchUrl = await fetch('http://127.0.0.1:8000/token/generate',{
                method : "POST",
                credentials : "include",
                body : JSON.stringify(data)
            })
            const fetchData = await fetchUrl.json()
            setTotalTokens(totalTokens=>totalTokens+1)
        }
        else{
            setAddAlertText('Invalid Phone Number')
        }
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 2000);
    }

    const changeDepartment = (e)=>{
        const oldDeptName = e.target.innerText
        e.target.innerHTML = `<input type="text" name="" id="change" class="py-2 text-xl border-2 alatsi-font rounded-lg px-1 my-1 w-full bg-[#020936] text-white " value=${oldDeptName} />`
        const change = document.getElementById('change')
        change.setSelectionRange(-1,-1)
        change.focus()
        change.addEventListener("keypress", async (changeInput)=>{
            if(changeInput.key=='Enter'){
              if(!change.value){
                console.log(e.target.parentElement)
                e.target.innerHTML = oldDeptName 
                    return null
              }
              const fetchUrl = await fetch(`http://127.0.0.1:8000/department?id=${id}`,{
                method : "PUT",
                credentials : "include",
                body : JSON.stringify({
                    "name" : change.value
                })
              })
              const fetchData =  await fetchUrl.json()
              e.target.innerHTML = fetchData.name
              if(department==oldDeptName){
                  setDepartment(fetchData.name)
              } 
            }
        })
        // if(!change.value){
        //     e.target.parentElement.innerHTML = `<div  className="py-2 text-xl border-2 alatsi-font rounded-lg px-1 bg-[#C3C9EF] my-1 hover:bg-[#020936]  hover:text-white cursor-pointer" onDoubleClick={changeDepartment}>{e.name}</div>`
        // }

    }

    if(!username){
        return <>
        <h1 className="righteous-font text-4xl mx-auto w-fit my-4 uppercase">My DashBoard</h1>
        <h1 className="righteous-font text-2xl mx-auto w-fit my-16 uppercase">Login Please...</h1>

        </>

    }

    return (
        <>
        <h1 className="righteous-font text-4xl mx-auto w-fit my-4 uppercase">My DashBoard</h1>
        <div className="flex items-start space-x-8">
            <div className="w-96  flex justify-center items-center max-h-256">
                <div className="w-88 bg-[#C3C9EF]  max-h-240 rounded-2xl">
                    <div className="flex justify-center items-center space-x-8 my-8"><span className="w-12 h-12 rounded-[50%] bg-[#031273] roboto-font font-bold flex justify-center items-center text-white capitalize text-2xl">{username[0]}</span><p className="w-52 text-2xl alatsi-font">{username}</p></div>
                    <p className="righteous-font text-3xl text-center">Departments</p>
                    <div className="max-h-195 py-1 bg-[#031273] my-4">
                        {departments.map(e=>{
                            return (
                                <Link to={`?id=${e._id.$oid}`} key={e._id.$oid}><div  className="py-2 text-xl border-2 alatsi-font rounded-lg px-1 bg-[#C3C9EF] my-1 hover:bg-[#020936]  hover:text-white cursor-pointer" onDoubleClick={changeDepartment}>{e.name}</div></Link>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="w-232 bg-[#C3C9EF] relative  h-256">
                {typeof(department) != 'undefined' && <div className="py-2 w-fit  alatsi-font text-2xl rounded-md font-bold my-4 px-1 mx-auto uppercase text-[#031273]">{department}</div>}
                {typeof(department) != 'undefined' && <div><div className="w-216 h-16 flex items-center justify-center space-x-4 bg-[#031273] mx-auto rounded-2xl"><span className="w-12 h-12 bg-white rounded-[50%] flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#000000"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg></span><div className="w-96 h-8 bg-white text-lg roboto-font px-1 rounded-md capitalize flex items-center font-bold">{currentName}</div><div className="w-96 h-8 bg-white text-lg roboto-font px-1 rounded-md capitalize flex items-center">{currentPhone}</div></div><div className="my-8 flex items-center justify-center space-x-16"><div className="w-60 h-60 bg-yellow-400 rounded-2xl righteous-font space-y-4 text-4xl flex flex-col justify-center items-center"><p>Total Tokens</p><p>{totalTokens}</p></div><div className="w-60 h-60 bg-blue-400 righteous-font rounded-2xl space-y-4 text-4xl flex flex-col justify-center items-center"><p>Current Token</p><p>{currentToken}</p></div><div className="w-60 h-60 bg-green-400 cursor-pointer righteous-font rounded-2xl space-y-4 text-4xl flex flex-col justify-center items-center" onClick={()=>{
                    setShowAddPopUp(true)
                }}><p>Add Token</p><span className="w-12 h-12 flex justify-center items-center bg-black rounded-[50%]"><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></span></div></div></div>}
                {showAddPopUp && <div className="w-full h-full bg-white/25 flex flex-col space-y-8 justify-center items-center backdrop-blur-md absolute top-0" id="addPopup"><div className="w-200 h-80 rounded-2xl shadow-gray-600 shadow-2xl outline-white outline-4 bg-[#031273] flex flex-col items-center justify-center space-y-4"><div className="inter-font text-4xl text-white">Add Token</div><div className="flex flex-col inter-font text-lg font-semibold w-160"><label htmlFor="name" className="text-white">Name:</label><input type="text" id="name" name="name" className=" bg-white py-2 px-2 rounded-lg text-2xl" /></div><div className="flex flex-col inter-font text-lg font-semibold w-160"><label htmlFor="phone_no" className="text-white">Phone-No:</label><input type="text" id="phone_no" name="phone_no" className=" bg-white py-2 px-2 rounded-lg text-2xl" placeholder="+92XXXXXXXXXX" /></div><div className="flex space-x-2"><div className="w-30 h-10 py-2 font-semibold bg-black flex justify-center items-center text-white text-lg rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-200 border-2 border-white hover:border-black" onClick={addToken}>Add</div><div className="w-30 h-10 py-2 font-semibold bg-black flex justify-center items-center text-white text-lg rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-200 hover:border-black border-white border-2" onClick={()=>{
                    setShowAddPopUp(false)
                }}>Cancel</div></div></div>{addAlert && <div className={`w-fit text-2xl roboto-font font-semibold px-4 py-2 bg-${addAlertText=="Invalid Phone Number"?'red':'green'}-600 text-white rounded-2xl`}>{addAlertText}</div>}
                </div>}
            </div>
        </div>
        </>
    )
}

export default Department