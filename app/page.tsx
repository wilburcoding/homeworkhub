import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-slate-900 duration-500	">
      <div className="bg-slate-800 w-4/5 max-w-screen-md border-gray-800 rounded-lg border p-4 mb-3 duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-center">Homework Hub</h1>
        <div className="w-full rounded-lg flex flex-row p-1 justify-center">
          <div className="bg-slate-700 w-1/3 rounded-lg flex flex-col items-center mr-1 p-2">
            <h1 className="text-4xl font-bold">5</h1>
            <h1>Assignments</h1>
          </div>
          <div className="bg-slate-700 w-1/3 rounded-lg flex flex-col items-center p-2">
            <h1 className="text-4xl font-bold">8</h1>
            <h1>Assessments</h1>
          </div>
        </div>
      </div>
      <div className="bg-slate-800 w-4/5 max-w-screen-md border-gray-400 flex flex-col items-center rounded-lg duration-500	border p-4 hover:scale-105 mb-3">
        <p className="text-lg font-bold text-center mb-1 text-gray-300">
          Assignments <span className="text-gray-400">(1/5)</span>
        </p>
        <div className="bg-slate-700 w-3/4 rounded-lg flex flex-col items-center mr-1 p-2">
          <p className="text-4xl font-bold text-center mb-1 ">Math Homework</p>
          <p className="text-2xl font-bold text-center mb-1 font-light mb-2">
            Due October 29th, 2024
          </p>
          <div className="border-gray-400 flex flex-col items-center rounded-lg border p-2 mb-3">
            <p className="text-4xl font-bold text-center mb-1">0:00</p>
            <div className="border-gray-400 flex flex-row items-center rounded-lg ">
              <button className="flex-1 bg-slate-600 rounded-lg px-2 mr-2">
                Start
              </button>
              <button className="flex-1 bg-slate-600 rounded-lg px-2">
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row rounded-lg w-full -mt-5">
          <button className="bg-slate-600 rounded-lg px-4 py-2 mr-2 w-28">
            Previous
          </button>
          <button className="bg-slate-600 rounded-lg px-4 py-2 mr-1 ml-auto w-28">
            Next
          </button>
        </div>
      </div>
      <div className="bg-slate-800 w-4/5 max-w-screen-md flex flex-col items-center border-gray-800 rounded-lg border p-5 mb-3 hover:scale-105 duration-500">
        <p className="text-lg font-bold text-center mb-1 text-gray-300">
          Active Assignments
        </p>
        <div className="w-4/5 flex items-center flex-col">
          <div className="bg-slate-700 w-full rounded-lg pl-2 flex flex-row pr-0 items-center">
            <div className="w-5 h-5 rounded-lg border border-gray-100 mr-1"></div>              
            <input type="text" className="bg-slate-700 outline-none w-3/4 border-b border-b-gray-500 my-2"></input>
            <div className="w-1 border-r border-r-gray-300 h-8 ml-3"></div>
            <div className="flex mr-0 ml-auto flex-row items-center justify-center w-1/5 h-10 ml-0 ">
              <p className="ml-2 text-sm">Due 10/5</p>
              <FontAwesomeIcon icon={faCalendarDays} className="fa-fw text-lg mr-2" />

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
