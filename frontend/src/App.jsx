import { useState } from 'react'
// import { IconName } from "react-icons/fa";
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSquareCheck, faBurger, faGear, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import { faUser } from "@fortawesome/free-regular-svg-icons";
// import { faUser } from "@fortawesome/free-brands-svg-icons";



export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleSideBar(){

    setSidebarOpen(!sidebarOpen);
  }

  return(
    <div className="h-screen w-screen bg-gray-200 dark:bg-gray-800">
      <div className="flex h-full">
        <div className={`${sidebarOpen ? 'w-80' : 'w-20'} h-full flex flex-col bg-blue-900 transition-all duration-300`}>
          <button onClick={toggleSideBar} className="p-4 text-2xl text-white hover:bg-blue-800"><FontAwesomeIcon icon={sidebarOpen ? faAngleLeft : faAngleRight} /></button>
          <button className={`${sidebarOpen ? 'py-3 text-3xl' : 'p-4 text-2xl'} text-white hover:bg-blue-800`}><FontAwesomeIcon icon={faHome} /> {sidebarOpen && 'Főoldal'}</button>
          <button className={`${sidebarOpen ? 'py-3 text-3xl' : 'p-4 text-2xl'} text-white hover:bg-blue-800`}><FontAwesomeIcon icon={faSquareCheck} /> {sidebarOpen && 'TO-DO List'}</button>
          <button className={`${sidebarOpen ? 'py-3 text-3xl' : 'p-4 text-2xl'} text-white hover:bg-blue-800`}><FontAwesomeIcon icon={faBurger} /> {sidebarOpen && 'Kaja'}</button>
          <button className={`${sidebarOpen ? 'py-3 text-3xl' : 'p-4 text-2xl'} text-white hover:bg-blue-800`}><FontAwesomeIcon icon={faGear} /> {sidebarOpen && 'Beállitások'}</button>
        </div>
        <div className="flex-1 flex flex-col">
          <h1 className="light:text-black dark:text-white font-bold text-4xl p-5">Dashboard</h1>
        </div>
      </div>
    </div>
  )
}