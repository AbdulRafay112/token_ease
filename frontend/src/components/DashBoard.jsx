import {useEffect, useState } from "react"
import { Link } from "react-router-dom"


function DashBoard() {
    const [department, setDepartments] = useState([])
    const [username,setUsername] = useState()
    const [showAddPopUp,setShowAddPopUp] = useState(false)
    const [addAlert,setAlert] = useState(false)
    const [addAlertText,setAddAlertText] = useState('Department Exists')
    useEffect(() => {
        fetchOrgDetails()
    }, [])
    const fetchOrgDetails = async () => {
        const fetchUrl = await fetch('https://token-easebackend.vercel.app/org', {
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

    const addDepartment = async()=>{
     const name = document.getElementById('name')
     if(!name.value){
          setAddAlertText('Enter Name')
     }
     else {
        const fetchUrl = await fetch('https://token-easebackend.vercel.app/department',{
            method : "POST",
            credentials : "include",
            body : JSON.stringify({'name' : name.value})
        })
        const fetchData = await fetchUrl.json()
        if(fetchData.detail=='department already exists'){
           setAddAlertText('Department Exists')
        }
        else{
            setAddAlertText('Department Added')
            setDepartments(department=>department.concat(fetchData))
        }
    }
    setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 2000);
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
            <div className=" bg-[#C3C9EF] rounded-2xl mx-auto flex flex-col py-8 space-y-8 w-262 relative">
                <div className="flex justify-center items-center rounded-2xl py-2 px-2 max-w-240 mx-auto bg-white space-x-8"><span className="w-12 h-12 rounded-[50%] bg-[#031273] roboto-font font-bold flex justify-center items-center text-white capitalize text-2xl">{username[0]}</span><p className="w-52 text-2xl alatsi-font">{username}</p></div>
                <div className="w-240 mx-auto">
                    <div className="py-2 w-fit  alatsi-font text-3xl rounded-md font-bold my-4 px-1 mx-auto uppercase text-[#031273]">Departments</div>
                    <div className="w-full flex  flex-wrap space-y-12 justify-center space-x-8">
                        {!department.length && <div className="py-2 w-fit  roboto-font text-2xl rounded-md font-bold my-4 px-1 mx-auto">"No Departments Yet"</div>}
                        {department.map((e,i) => {
                            
                            return (
                                <Link to={`/dashboard/department?id=${e._id.$oid}`} key={e._id.$oid}><div className={`w-72 h-56 ${!(i%2)?"bg-white":"bg-[#031273]"} ${!(i%2)?"text-black":"text-white"} rounded-2xl shadow-lg hover:scale-110 shadow-gray-600 cursor-pointer ease-in-out duration-300`}>
                                    <div className="roboto-font text-2xl font-bold flex justify-center items-center h-28">{e.name}</div>
                                    <div className="flex roboto-font text-lg items-center my-1 space-x-2 px-2"><p className="font-semibold">Total Tokens:</p><p>{e.total_tokens}</p></div>
                                    <div className="flex roboto-font items-center my-1 text-lg space-x-2 px-2"><p className="font-semibold">Current Tokens:</p><p>{e.current_token}</p></div>
                                    <div className="flex roboto-font items-center my-1 space-x-2 px-2"><p className="font-semibold">Status:</p><p>{e.status ? "Open" : "CLosed"}</p></div>
                                </div></Link>)
                        })}
                    </div>
                    <div className="py-2 text-xl w-fit mx-auto bg-white border-2 alatsi-font rounded-lg px-1 hover:bg-[#020936] ease-in-out duration-100  my-8 cursor-pointer hover:text-white" onClick={()=>{
                        setShowAddPopUp(true)
                    }}>&#43; Add Department</div>
                </div>
                {showAddPopUp && <div className="w-full h-full bg-white/25 flex flex-col space-y-8 justify-center items-center backdrop-blur-md absolute top-0" id="addPopup"><div className="w-200 h-80 rounded-2xl shadow-gray-600 shadow-2xl outline-white outline-4 bg-[#031273] flex flex-col items-center justify-center space-y-4"><div className="inter-font text-4xl text-white">Add Department</div><div className="flex flex-col inter-font text-lg font-semibold w-160"><label htmlFor="name" className="text-white">Name:</label><input type="text" id="name" name="name" className=" bg-white py-2 px-2 rounded-lg text-2xl" /></div><div className="flex space-x-2"><div className="w-30 h-10 py-2 font-semibold bg-black flex justify-center items-center text-white text-lg rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-200 border-2 border-white hover:border-black" onClick={addDepartment}>Add</div><div className="w-30 h-10 py-2 font-semibold bg-black flex justify-center items-center text-white text-lg rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-200 hover:border-black border-white border-2" onClick={()=>{
                    setShowAddPopUp(false)
                }}>Cancel</div></div></div>{addAlert && <div className={`w-fit text-2xl roboto-font font-semibold px-4 py-2 bg-${(addAlertText=="Department Exists" || addAlertText=='Enter Name')?'red':'green'}-600 text-white rounded-2xl`}>{addAlertText}</div>}
                </div>}
            </div>
        </>
    )
}

export default DashBoard