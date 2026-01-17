import {useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function Department() {
    // --- WhatsApp States ---
    const [showWhatsappPopup, setShowWhatsappPopup] = useState(false)
    const [whatsappData, setWhatsappData] = useState(null)

    // --- Existing States ---
    const [departments, setDepartments] = useState([])
    const [department, setDepartment] = useState()
    const [username, setUsername] = useState()
    const [totalTokens, setTotalTokens] = useState(0)
    const [currentToken, setCurrentToken] = useState(0)
    const [currentName, setCurrentName] = useState('Name')
    const [currentPhone, setCurrentPhone] = useState('Phone No')
    const [showAddPopUp, setShowAddPopUp] = useState(false)
    const [addAlert, setAlert] = useState(false)
    const [addAlertText, setAddAlertText] = useState('Invalid Phone Number')
    const [searchParams] = useSearchParams()
    const id = searchParams.get('id')

    useEffect(() => {
        setCurrentName('Name')
        setCurrentPhone('Phone No')
        fetchOrgDetails()
        fetchDepartment()
    }, [id])

    useEffect(() => {
        if (currentToken > 0) {
            fetchToken()
        }
    }, [currentToken])

    const fetchOrgDetails = async () => {
        const fetchUrl = await fetch('http://localhost:8000/org', {
            method: "GET",
            credentials: "include"
        })
        const fetchData = await fetchUrl.json()
        if (fetchData.detail != "Invalid Token") {
            setUsername(fetchData.user_name)
        }
        if (fetchData.detail != "No Departments Yet" && fetchData.detail != "Invalid Token") {
            setDepartments(fetchData.departments)
        }
    }

    const fetchDepartment = async () => {
        const fetchUrl = await fetch(`http://localhost:8000/department?id=${id}`, {
            method: "GET",
            credentials: "include"
        })
        const fetchData = await fetchUrl.json()
        if (fetchData.detail != "Invalid Token") {
            setDepartment(fetchData.name)
            setTotalTokens(fetchData.total_tokens)
            setCurrentToken(fetchData.current_token)
        }
    }

    const fetchToken = async () => {
        const fetchUrl = await fetch(`http://localhost:8000/token?token_no=${currentToken}&dept=${id}`, {
            method: "GET",
            credentials: "include"
        })
        const fetchData = await fetchUrl.json()
        setCurrentName(fetchData.name)
        setCurrentPhone(fetchData.phone_no)
    }

    const addToken = async () => {
        const reg = /(^(\+92))(3)[0-9]{9}$/
        const name = document.getElementById('name')
        const phone_no = document.getElementById('phone_no').value
        const result = reg.test(phone_no)
        if (result) {
            setAddAlertText('Added Token')
            const data = {
                'name': name.value || 'Unknown',
                'phone_no': phone_no,
                'dept_id': id
            }
            const fetchUrl = await fetch('http://localhost:8000/token/generate', {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(data)
            })
            const fetchData = await fetchUrl.json()
            setTotalTokens(totalTokens => totalTokens + 1)
        }
        else {
            setAddAlertText('Invalid Phone Number')
        }
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 2000);
    }

    // === 1. Next Token API Call (Updated Logic) ===
    const callNextToken = async () => {
        try {
            const fetchUrl = await fetch(`http://localhost:8000/token/next`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ dept_id: id })
            })

            const data = await fetchUrl.json()

            if (data.message === "No more customers waiting") {
                setAddAlertText("Queue Finished!")
                setAlert(true)
                setTimeout(() => setAlert(false), 2000)
                return
            }

            if (data.current_token) {
                setCurrentToken(data.current_token)
            }

            // Check if alert is needed
            if (data.alert_data && data.alert_data.alert_needed) {
                setWhatsappData(data.alert_data)
                setShowWhatsappPopup(true)
            }

        } catch (error) {
        }
    }

    // === 2. WhatsApp Open Function ===
    const openWhatsApp = () => {
        if (!whatsappData) return

        let phone = whatsappData.phone.replace(/\D/g, '')
        if (phone.startsWith('0')) phone = '92' + phone.substring(1)

        const text = `Hi ${whatsappData.name}!: Your Token Number is *${whatsappData.token_number}* | which is 3 turns away kindly ensure your presence at ${username} ${department}.`

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
        window.open(url, '_blank')

        setShowWhatsappPopup(false)
    }


    const changeDepartment = (e) => {
        const oldDeptName = e.target.innerText
        e.target.innerHTML = `<input type="text" name="" id="change" class="py-2 text-xl border-2 alatsi-font rounded-lg px-1 my-1 w-full bg-[#020936] text-white " value=${oldDeptName} />`
        const change = document.getElementById('change')
        change.setSelectionRange(-1, -1)
        change.focus()
        change.addEventListener("keypress", async (changeInput) => {
            if (changeInput.key == 'Enter') {
                if (!change.value) {
                    e.target.innerHTML = oldDeptName
                    return null
                }
                const fetchUrl = await fetch(`http://localhost:8000/department?id=${id}`, {
                    method: "PUT",
                    credentials: "include",
                    body: JSON.stringify({
                        "name": change.value
                    })
                })
                const fetchData = await fetchUrl.json()
                e.target.innerHTML = fetchData.name
                if (department == oldDeptName) {
                    setDepartment(fetchData.name)
                }
            }
        })
    }

    if (!username) {
        return <>
            <h1 className="righteous-font text-4xl mx-auto w-fit my-4 uppercase">My DashBoard</h1>
            <h1 className="righteous-font text-2xl mx-auto w-fit my-16 uppercase">Login Please...</h1>
        </>
    }

    return (
        <>
            <h1 className="righteous-font text-4xl mx-auto w-fit my-4 uppercase">My DashBoard</h1>
            <div className="flex items-start space-x-8">
                {/* Sidebar */}
                <div className="w-96 flex justify-center items-center max-h-256">
                    <div className="w-88 bg-[#C3C9EF] max-h-240 rounded-2xl">
                        <div className="flex justify-center items-center space-x-8 my-8">
                            <span className="w-12 h-12 rounded-[50%] bg-[#031273] roboto-font font-bold flex justify-center items-center text-white capitalize text-2xl">{username[0]}</span>
                            <p className="w-52 text-2xl alatsi-font">{username}</p>
                        </div>
                        <p className="righteous-font text-3xl text-center">Departments</p>
                        <div className="max-h-195 py-1 bg-[#031273] my-4">
                            {departments.map(e => {
                                return (
                                    <Link to={`?id=${e._id.$oid}`} key={e._id.$oid}>
                                        <div className="py-2 text-xl border-2 alatsi-font rounded-lg px-1 bg-[#C3C9EF] my-1 hover:bg-[#020936] hover:text-white cursor-pointer" onDoubleClick={changeDepartment}>{e.name}</div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-232 bg-[#C3C9EF] relative h-256">
                    {typeof (department) != 'undefined' && <div className="py-2 w-fit alatsi-font text-2xl rounded-md font-bold my-4 px-1 mx-auto uppercase text-[#031273]">{department}</div>}
                    
                    {typeof (department) != 'undefined' && 
                    <div>
                        {/* Current Customer Info Bar */}
                        <div className="w-216 h-16 flex items-center justify-center space-x-4 bg-[#031273] mx-auto rounded-2xl">
                            <span className="w-12 h-12 bg-white rounded-[50%] flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#000000"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg>
                            </span>
                            <div className="w-96 h-8 bg-white text-lg roboto-font px-1 rounded-md capitalize flex items-center font-bold">{currentName}</div>
                            <div className="w-96 h-8 bg-white text-lg roboto-font px-1 rounded-md capitalize flex items-center">{currentPhone}</div>
                        </div>

                        {/* --- MAIN BUTTONS SECTION --- */}
                        <div className="my-8 flex items-center justify-center space-x-8 flex-wrap space-y-4">
                            {/* Total Tokens (Yellow) */}
                            <div className="w-60 h-60 bg-yellow-400 rounded-2xl righteous-font space-y-4 text-4xl flex flex-col justify-center items-center">
                                <p>Total Tokens</p>
                                <p>{totalTokens}</p>
                            </div>

                            {/* Current Token (Blue) */}
                            <div className="w-60 h-60 bg-blue-400 righteous-font rounded-2xl space-y-4 text-4xl flex flex-col justify-center items-center">
                                <p>Current Token</p>
                                <p>{currentToken}</p>
                            </div>

                            {/* Next Token (Purple) - NEW ADDITION */}
                            <div className="w-60 h-60 bg-purple-600 cursor-pointer righteous-font rounded-2xl space-y-4 text-4xl flex flex-col justify-center items-center hover:scale-105 duration-200 shadow-xl"
                                onClick={callNextToken}>
                                <p>Next Token</p>
                                <span className="w-12 h-12 flex justify-center items-center bg-black rounded-[50%]">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32" fill="white">
                                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                                    </svg>
                                </span>
                            </div>

                            {/* Add Token (Green) */}
                            <div className="w-60 h-60 bg-green-400 cursor-pointer righteous-font rounded-2xl space-y-4 text-4xl flex flex-col justify-center items-center"
                                onClick={() => { setShowAddPopUp(true) }}>
                                <p>Add Token</p>
                                <span className="w-12 h-12 flex justify-center items-center bg-black rounded-[50%]">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32px" fill="#ffffff"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                                </span>
                            </div>
                        </div>
                    </div>}

                    {/* --- ADD TOKEN POPUP --- */}
                    {showAddPopUp && <div className="w-full h-full bg-white/25 flex flex-col space-y-8 justify-center items-center backdrop-blur-md absolute top-0" id="addPopup">
                        <div className="w-200 h-80 rounded-2xl shadow-gray-600 shadow-2xl outline-white outline-4 bg-[#031273] flex flex-col items-center justify-center space-y-4">
                            <div className="inter-font text-4xl text-white">Add Token</div>
                            <div className="flex flex-col inter-font text-lg font-semibold w-160">
                                <label htmlFor="name" className="text-white">Name:</label>
                                <input type="text" id="name" name="name" className=" bg-white py-2 px-2 rounded-lg text-2xl" />
                            </div>
                            <div className="flex flex-col inter-font text-lg font-semibold w-160">
                                <label htmlFor="phone_no" className="text-white">Phone-No:</label>
                                <input type="text" id="phone_no" name="phone_no" className=" bg-white py-2 px-2 rounded-lg text-2xl" placeholder="+92XXXXXXXXXX" />
                            </div>
                            <div className="flex space-x-2">
                                <div className="w-30 h-10 py-2 font-semibold bg-black flex justify-center items-center text-white text-lg rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-200 border-2 border-white hover:border-black" onClick={addToken}>Add</div>
                                <div className="w-30 h-10 py-2 font-semibold bg-black flex justify-center items-center text-white text-lg rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-200 hover:border-black border-white border-2" onClick={() => {
                                    setShowAddPopUp(false)
                                }}>Cancel</div>
                            </div>
                        </div>
                        {addAlert && <div className={`w-fit text-2xl roboto-font font-semibold px-4 py-2 bg-${addAlertText == "Invalid Phone Number" ? 'red' : 'green'}-600 text-white rounded-2xl`}>{addAlertText}</div>}
                    </div>}

                    {/* --- WHATSAPP ALERT POPUP (NEW) --- */}
                    {showWhatsappPopup && whatsappData && (
                        <div className="w-full h-full bg-black/60 flex justify-center items-center backdrop-blur-sm absolute top-0 z-50">
                            <div className="w-120 h-auto py-8 bg-white rounded-2xl shadow-2xl flex flex-col items-center space-y-6 px-6 border-4 border-[#031273]">
                                <div className="text-3xl font-bold text-[#031273] righteous-font uppercase">Notify Customer?</div>
                                <div className="text-xl text-center font-medium roboto-font">
                                    Token <span className="text-3xl font-bold text-green-600">#{whatsappData.token_number}</span>
                                    <br />
                                    <span className="capitalize font-bold">{whatsappData.name}</span>
                                    <br />
                                    is 3 turns away.
                                </div>
                                <div className="flex space-x-4 mt-4">
                                    <div
                                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg cursor-pointer hover:bg-green-700 flex items-center space-x-2 text-xl ease-in-out duration-200"
                                        onClick={openWhatsApp}
                                    >
                                        <svg fill="white" height="24" viewBox="0 0 24 24" width="24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.44 5.438 10.985 6.471 13.978 4.604.605-.377 1.096-.921 1.408-1.57.51-1.066.012-1.914-.545-2.193-.559-.28-3.3-1.629-3.809-1.815-.509-.187-.88-.28-1.252.279-.371.558-1.439 1.814-1.763 2.187-.324.373-.649.419-1.208.139-.56-.28-2.362-.871-4.502-2.779-1.67-1.488-2.798-3.326-3.125-3.886-.326-.559-.035-.861.245-1.14.252-.251.56-.653.841-.979.279-.326.371-.559.558-.931.186-.372.093-.7-.046-.978-.14-.279-1.253-3.02-1.716-4.136-.452-1.089-.912-.941-1.252-.958-.323-.016-.693-.019-1.064-.019-.371 0-.974.139-1.484.696-.511.558-1.953 1.908-1.953 4.653z" /></svg>
                                        <span>Send WhatsApp</span>
                                    </div>
                                    <div
                                        className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg cursor-pointer hover:bg-red-700 text-xl ease-in-out duration-200"
                                        onClick={() => setShowWhatsappPopup(false)}
                                    >
                                        Cancel
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default Department