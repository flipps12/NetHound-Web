import React from "react";
import ObjLoaderComponent from "../ObjLoaderComponent";
import { useLenis } from '../hooks/useLenis'

function Landing() {
  useLenis()
  return (
    <div className="Landing h-screen bg-black">
      <nav>
        <div className="flex flex-row justify-between items-center p-4 trasparent border-b-2 border-gray-500">
          <div className="text-white text-lg font-bold">NetHound</div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-700">
              GitHub
            </a>
          </div>
        </div>
      </nav>
      <div className="flex flex-row text-white main-landing">
        <div className="flex-1 flex flex-col px-40 justify-center h-full">
          <h1 className="font-bold text-7xl">NetHound</h1>
          <ul className="list-disc px-8 text-xl">
            <li>Raspberry pi 5 Project</li>
            <li className="">Proteccion de redes WiFi</li>
            <li className="">Deteccion de intrusos</li>
          </ul>
        </div>
        <div className="flex-2 flex justify-center items-center h-full">
          <ObjLoaderComponent />
        </div>
      </div>
      <div className="w-full h-screen"></div>
      <footer>
        <div className="flex flex-row justify-between items-center p-4 text-white border-t-2 border-gray-500">
          <div className="text-sm">NetHound - 2025</div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-700">
              E.E.S.T. N° 1
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
