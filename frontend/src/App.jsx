import { useState } from 'react'
// import { IconName } from "react-icons/fa";
import './App.css'
import SideBar from './SideBar/sidebar.jsx';


export default function Dashboard() {
  return(
    <div className="h-screen w-screen bg-gray-200 dark:bg-gray-800">
        <SideBar />
    </div>
  )
}