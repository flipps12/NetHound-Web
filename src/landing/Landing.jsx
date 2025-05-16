import React from "react";
import ObjLoaderComponent from "../ObjLoaderComponent";
import { useLenis } from "../hooks/useLenis";

function Landing() {
  useLenis();
  return (
    <div className="Landing h-screen bg-black pt-20">
      <nav className="fixed top-0 left-0 w-full z-10 bg-black/50 backdrop-blur-sm">
        <div className="flex flex-row justify-between items-center p-4 border-b-1 border-gray-500">
          <div className="text-white text-lg font-bold">NetHound</div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/flipps12/NetHound"
              className="text-white hover:text-gray-700"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
      <main className="ml-40 flex flex-col gap-30">
        <div className="flex flex-row text-white main-landing py-12">
          <div className="flex-1 flex flex-col justify-center h-full">
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
        <div className="w-full main-landing">
          <div className="w-1/2 flex flex-col justify-center">
            <h2 className="text-white text-4xl font-bold">Componentes</h2>
            <img
              className="w-8/12"
              src="./NetHoundDiagrama.svg"
              alt="nethound"
            />
          </div>
        </div>
      </main>
      <footer className="">
        <div className="flex flex-row justify-between items-center p-4 text-white border-t-1 border-gray-500">
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
