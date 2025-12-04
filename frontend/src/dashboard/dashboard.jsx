import { useState } from 'react'  
import SideBar from '../SideBar/sidebar.jsx';

function TODOList() {
  return (
    <div className="bg-white dark:bg-gray-600 rounded-lg shadow-lg m-5 p-5 w-80 h-fit">
      <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-4">TO-DO List</h2>
      <div className="space-y-2">
        {/* TODO items will go here */}
      </div>
    </div>
  );
}


export default function Dashboard() {
  return(
    <div className="h-screen w-screen bg-gray-200 dark:bg-gray-800 flex">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <h1 className="light:text-black dark:text-white font-bold text-4xl p-5">Dashboard</h1>
          <TODOList />
        </div>
    </div>
  )
}