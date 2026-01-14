import herosectionellipse from "../assets/herosectionellipse.png"
import solutioncard1 from "../assets/solutioncard1.png"
import solutioncard2 from "../assets/solutioncard2.png"
import solutioncard3 from "../assets/solutioncard3.png"
import solutioncard4 from "../assets/solutioncard4.png"
import industry1 from "../assets/industry1.png"
import industry2 from "../assets/industry2.png"
import industry3 from "../assets/industry3.png"
import industry4 from "../assets/industry4.png"
import industry5 from "../assets/industry5.png"
import review1 from "../assets/review1.png"
import review2 from "../assets/review2.png"
import review3 from "../assets/review3.png"
import cta1 from "../assets/cta1.png"
import cta2 from "../assets/cta2.png"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
function Home() {
    let [updateSlide,setUpdateSlide] = useState(0)
    const animate = () => {
        let slide = updateSlide 
        const reviews = document.getElementsByClassName('review')
        const circle = document.getElementsByClassName('circle')
        if (updateSlide > reviews.length - 1) {
            for (let i = 0; i < reviews.length; i++) {
                reviews[i].style.translate = "0px 0px"
            }
            slide = 0
        }
        reviews[slide].style.translate = `-${1248 * slide}px 0px`
        for (let i = 0; i < circle.length; i++) {
            circle[i].classList.remove("bg-black")
        }
        circle[slide].classList.add('bg-black')
        setTimeout(() => {
            setUpdateSlide(slide+1)
        }, 5000);
    }
    useEffect(()=>{
        animate()
    },[updateSlide])

    return (
        <>
            <div className="container items-center justify-between flex h-128 bg-[url(./assets/herosection.png)]">
                <div className="ml-24">
                    <div className="w-160 h-100 bg-white/25">
                        <div className="heroTitle">
                            <div className="heading mochi-pop-p-one-font text-[40px] text-center"><span className="text-[#0504AA]">Reduce</span><span> Waiting Time </span><span className="text-[#0504AA]">Manage</span><span> Queues Smarter</span></div>
                            <div className="sub-heading mochi-pop-p-one-font my-4 text-center">“A digital queue management system that helps businesses serve customers faster, reduce overcrowding, and improve satisfaction.”</div>
                        </div>
                        <div className="supporting-text space-y-6 mx-4">
                            <div className="flex items-center gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#E26D13"><path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z" /></svg><p className="mochi-pop-one-font text-xl text-[#E26D13]">Real-time queue tracking</p></div>
                            <div className="flex items-center gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#E26D13"><path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z" /></svg><p className="mochi-pop-one-font text-xl text-[#E26D13]">SMS / display-based token system</p></div>
                            <div className="flex items-center gap-x-3"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#E26D13"><path d="M389-267 195-460l51-52 143 143 325-324 51 51-376 375Z" /></svg><p className="mochi-pop-one-font text-xl text-[#E26D13]">Analytics & performance insights</p></div>
                        </div>
                    </div>
                    <div className="w-40 h-8 my-4 rounded-[8px] bg-[#031273] hover:bg-[#020936] ease-in-out duration-100 text-white cursor-pointer flex justify-center items-center roboto-font font-bold">Learn More</div>
                </div>
                <img src={herosectionellipse} className="w-96 h-96 mr-24" alt="" />
            </div>
            <div className="container h-128 bg-[#C3C9EF] my-16">
                <div className="heading w-fit bg-[#031273] -translate-y-[50%] h-16 uppercase mx-auto flex items-center justify-center text-white text-[32px] righteous-font rounded-[8px] px-2">“Why Traditional Queues Don’t Work”</div>
                <div className="cards w-272 h-96 flex gap-x-16 mx-auto mt-4">
                    <div className="card w-80 h-96 bg-white flex flex-col space-y-4 rounded-4xl"><div className="flex items-center justify-center mt-8 space-x-2"><svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="#031273"><path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Z" /></svg><p className="inter-font text-xl font-extrabold text-[#031273] uppercase w-54">Long Waiting Times</p></div><div className="w-72 h-60 rounded-2xl bg-[#031273] mx-auto inter-font text-2xl flex items-center text-center text-white uppercase px-1">Customers wait without knowing how long it will take.</div></div>
                    <div className="card w-80 h-96 bg-white flex flex-col space-y-4 rounded-4xl"><div className="flex items-center justify-center mt-8 space-x-2"><svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="#031273"><path d="M800-520q-17 0-28.5-11.5T760-560q0-17 11.5-28.5T800-600q17 0 28.5 11.5T840-560q0 17-11.5 28.5T800-520Zm-40-120v-200h80v200h-80ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z" /></svg><p className="inter-font text-xl font-extrabold text-[#031273] uppercase w-54">Customer Frustration</p></div><div className="w-72 h-60 rounded-2xl bg-[#031273] mx-auto inter-font text-2xl flex items-center text-center text-white uppercase px-1">No updates, no transparency, poor experience.</div></div>
                    <div className="card w-80 h-96 bg-white flex flex-col space-y-4 rounded-4xl"><div className="flex items-center justify-center mt-8 space-x-2"><svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="#031273"><path d="M400-720h160v-80H400v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Zm-560-80q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v171q-35-25-76-38t-84-13q-116 0-198 82t-82 198q0 31 6.5 61.5T467-120H160Zm560 0q8 0 14-6t6-14q0-8-6-14t-14-6q-8 0-14 6t-6 14q0 8 6 14t14 6Zm-20-80h40v-160h-40v160Z" /></svg><p className="inter-font text-xl font-extrabold text-[#031273] uppercase w-54">Staff Overload</p></div><div className="w-72 h-60 rounded-2xl px-1 bg-[#031273] mx-auto inter-font text-2xl flex items-center text-center text-white uppercase">Employees struggle to manage customers manually.</div></div>
                </div>
            </div>
            <div className="container h-128 bg-[#C3C9EF] my-16">
                <div className="heading w-fit bg-[#031273] -translate-y-[50%] h-16 uppercase mx-auto flex items-center justify-center text-white text-[32px] righteous-font rounded-[8px] px-2">“A Smarter Way to Manage Queues”</div>
                <div className="cards w-344 h-100 flex gap-x-8 mx-auto mt-4">
                    <div className="card w-80 h-100 bg-white flex flex-col space-y-4 rounded-[8px]"><img src={solutioncard1} alt="" className="w-80 h-45" /><div className="flex items-center justify-center bg-black text-white w-72 h-16 mx-auto uppercase roboto-font font-bold rounded-[8px]">Digital token generation</div><div className="flex items-center justify-center bg-black text-white w-72 h-28 mx-auto uppercase roboto-font font-bold rounded-[8px] text-center">replaces physical lines with a digital system</div></div>
                    <div className="card w-80 h-100 bg-white flex flex-col space-y-4 rounded-[8px]"><img src={solutioncard2} alt="" className="w-80 h-45" /><div className="flex items-center justify-center bg-black text-white w-72 h-16 mx-auto uppercase roboto-font font-bold rounded-[8px]">Counter assignment</div><div className="flex items-center justify-center bg-black text-white w-72 h-28 mx-auto uppercase roboto-font font-bold rounded-[8px] text-center">digitally Assign and manage counter </div></div>
                    <div className="card w-80 h-100 bg-white flex flex-col space-y-4 rounded-[8px]"><img src={solutioncard3} alt="" className="w-80 h-45" /><div className="flex items-center justify-center bg-black text-white w-72 h-16 mx-auto uppercase roboto-font font-bold rounded-[8px]">Mobile notifications</div><div className="flex items-center justify-center bg-black text-white w-72 h-28 mx-auto uppercase roboto-font font-bold rounded-[8px] text-center">customers will notified about their turn</div></div>
                    <div className="card w-80 h-100 bg-white flex flex-col space-y-4 rounded-[8px]"><img src={solutioncard4} alt="" className="w-80 h-45" /><div className="flex items-center justify-center bg-black text-white w-72 h-16 mx-auto uppercase roboto-font font-bold rounded-[8px]">Live monitoring</div><div className="flex items-center justify-center bg-black text-white w-72 h-28 mx-auto uppercase roboto-font font-bold rounded-[8px] text-center">monitoring real-time progress</div></div></div>
            </div>
            <div className="container relative h-200 my-16">
                <div className="heading w-fit bg-[#031273] -translate-y-[50%] h-16 uppercase mx-auto flex items-center justify-center text-white text-[32px] righteous-font rounded-[8px] px-2">“Built for Every Service Industry”</div>
                <img src={industry1} alt="" className="absolute left-0 top-[96px] hover:scale-110 ease-in-out duration-300" />
                <img src={industry2} alt="" className="absolute left-[1136px] top-[64px] hover:scale-110 ease-in-out duration-300" />
                <img src={industry3} alt="" className="absolute left-[816px] top-[256px] hover:scale-110 ease-in-out duration-300" />
                <img src={industry4} alt="" className="absolute left-[16px] top-[544px] hover:scale-110 ease-in-out duration-300" />
                <img src={industry5} alt="" className="absolute left-[880px] top-[485px] hover:scale-110 ease-in-out duration-300" />
            </div>
            <div className="container flex space-x-8 h-100 w-344 mx-auto my-16">
                <div className="card w-80 h-100 rounded-2xl bg-[#C3C9EF] shadow-xl shadow-gray-800"><div className="w-80 h-50 flex justify-center items-center bg-[#031273] rounded-[8px]"><svg xmlns="http://www.w3.org/2000/svg" height="120px" viewBox="0 -960 960 960" width="120px" fill="#FFFFFF"><path d="M340-160q-125 0-212.5-87.5T40-460q0-125 87.5-212.5T340-760q52 0 98 16.5t84 45.5l42-42 56 56-42 42q29 38 45.5 84.5T640-460q0 125-87.5 212.5T340-160Zm440 0L640-300l56-56 44 44v-488h80v487l43-43 57 56-140 140ZM240-800v-80h200v80H240Zm60 380h80v-200h-80v200Z" /></svg></div><div className="h-50 flex justify-center items-center alatsi-font text-[32px] uppercase text-center">Reduce customer waiting time</div></div>
                <div className="card w-80 h-100 rounded-2xl bg-[#C3C9EF] shadow-xl shadow-gray-800"><div className="w-80 h-50 flex justify-center items-center bg-[#031273] rounded-[8px]"><svg xmlns="http://www.w3.org/2000/svg" height="120px" viewBox="0 -960 960 960" width="120px" fill="#FFFFFF"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440h14q-11 19-16.5 39.5T472-358q0 30 10.5 59.5T519-243l84 83H160Zm556 0L576-300q-13-13-18.5-28t-5.5-30q0-32 23-57t59-25q28 0 44 13t38 35q20-20 36.5-34t45.5-14q37 0 59.5 25.5T880-357q0 15-6 30t-18 27L716-160Z" /></svg></div><div className="h-50 flex justify-center items-center alatsi-font text-[32px] uppercase text-center">Improve customer satisfaction</div></div>
                <div className="card w-80 h-100 rounded-2xl bg-[#C3C9EF] shadow-xl shadow-gray-800"><div className="w-80 h-50 flex justify-center items-center bg-[#031273] rounded-[8px]"><svg xmlns="http://www.w3.org/2000/svg" height="120px" viewBox="0 -960 960 960" width="120px" fill="#FFFFFF"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" /></svg></div><div className="h-50 flex justify-center items-center alatsi-font text-[32px] uppercase text-center">Increase staff efficiency</div></div>
                <div className="card w-80 h-100 rounded-2xl bg-[#C3C9EF] shadow-xl shadow-gray-800"><div className="w-80 h-50 flex justify-center items-center bg-[#031273] rounded-[8px]"><svg xmlns="http://www.w3.org/2000/svg" height="120px" viewBox="0 -960 960 960" width="120px" fill="#FFFFFF"><path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" /></svg></div><div className="h-50 flex justify-center items-center alatsi-font text-[32px] uppercase text-center">Real-time analytics & reports</div></div>
            </div>
            <div className="container h-128  my-16">
                <div className="heading w-fit bg-[#031273] -translate-y-[50%] h-16 uppercase mx-auto flex items-center justify-center text-white text-[32px] righteous-font rounded-[8px] px-2">“Trusted by Businesses”</div>
                <div className="w-312 flex overflow-x-hidden shadow-2xl shadow-gray-800  rounded-xl h-68 mx-auto">
                    <div className="review min-w-312 h-68 ease-in-out duration-600  flex  bg-red-600 items-center justify-center space-x-30"><div className="w-160 h-60 bg-white rounded-2xl flex flex-col justify-center space-y-4"><p className="righteous-font text-center text-[32px]">“Qweegly helped us reduce waiting time and improved customer satisfaction significantly.”</p><p className="inter-font italic text-xl text-center font-medium">Operation Manager, ABC Company</p></div><img src={review1} alt="" /></div>
                    <div className="review min-w-312 h-68 ease-in-out duration-600  flex  bg-green-600 items-center justify-center space-x-30"><div className="w-160 h-60 bg-white rounded-2xl flex flex-col justify-center space-y-4"><p className="righteous-font text-center text-[32px]">“Qweegly helped us reduce waiting time and improved customer satisfaction significantly.”</p><p className="inter-font italic text-xl text-center font-medium">Operation Manager, 123 Company</p></div><img src={review2} alt="" /></div>
                    <div className="review min-w-312 h-68 ease-in-out duration-600  flex  bg-orange-600 items-center justify-center space-x-30"><div className="w-160 h-60 bg-white rounded-2xl flex flex-col justify-center space-y-4"><p className="righteous-font text-center text-[32px]">“Qweegly helped us reduce waiting time and improved customer satisfaction significantly.”</p><p className="inter-font italic text-xl text-center font-medium">Operation Manager, XYZ Company</p></div><img src={review3} alt="" /></div>
                </div>
                <div className="my-6 space-x-2 w-22 h-4 mx-auto flex">
                    <span className="circle w-6 h-6 border-2 ease-in-out duration-600 rounded-[50%] bg-black"></span>
                    <span className="circle w-6 h-6 border-2 ease-in-out duration-600 rounded-[50%] "></span>
                    <span className="circle w-6 h-6 border-2 ease-in-out duration-600 rounded-[50%]"></span>
                </div>
            </div>
            <div className="container h-120  bg-linear-[0deg,#C3C9EF_10%,#6872B4_32%,#233087_53%,#031273_77%] my-16">
                <div className="heading w-fit bg-[#031273] -translate-y-[50%] h-16 uppercase mx-auto flex items-center justify-center text-white text-[32px] righteous-font rounded-[8px] px-2">“Ready to Eliminate Long Queues?”</div>
                <div className="flex justify-between items-center my-2">
                    <img src={cta1} alt="" />
                    <div className="w-140 flex flex-col items-center space-y-10"><p className="inter-font font-medium text-white italic text-center text-4xl capitalize">Start managing your customers smarter with a digital queue system designed for modern businesses.</p><div className="buttons flex gap-x-8 items-center">
                        <Link to={"/login"}><div className="w-40 h-16 rounded-[8px] bg-[#031273] hover:bg-[#020936] ease-in-out duration-100 text-white text-xl cursor-pointer flex justify-center items-center roboto-font font-bold">Log-in</div></Link>
                        <Link to={"/signup"}><div className="w-40 h-16 rounded-[8px] bg-[#031273] hover:bg-[#020936] ease-in-out duration-100 text-white text-xl cursor-pointer flex justify-center items-center roboto-font font-bold">Sign-up</div></Link>
                    </div></div>
                    <img src={cta2} alt="" />
                </div>
            </div>
        </>
    )
}

export default Home