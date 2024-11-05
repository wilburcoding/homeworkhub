'use client'
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import Handler from "./lib/handler.js";
import { useState, useEffect, KeyboardEvent } from "react";
export default function Home() {
  const [tasks, setTasks]: any = useState([]);
  const [alist, setAList] = useState([]);
  const [acount, setACount] = useState(1);
  const [error, setError] = useState("");
  const [handler, setHandler] = useState(new Handler(JSON.stringify({ data: [] })));
  async function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify({ data: handler.tasks }));

  }
  async function handleNewTask(e: any) {
    if (e.keyCode == 13) {
      handler.add(e.target.value, document.getElementById("type").value == "assessment" ? 2 : 1)
      e.target.value = ""
      await setTasks(handler.tasks.filter((task) => task.name != ""));
      await updateLocalStorage();
    }

  }

  async function handleDelete(id: String) {

    await handler.delete(id)
    let count = 0;
    let fade = setInterval(function () {
      if (count == 10 || document.getElementById(`s${id}`) == null) {
        setTasks(handler.tasks.filter((task) => task.name != ""));
        updateLocalStorage();
        return
      }
      document.getElementById(`s${id}`).style.opacity = `${1 - count * 0.1}`
      count++;


    }, 20)
    setTimeout(function () {
      clearInterval(fade);
    }, 300)


  }
  async function handleTypeEdit(e: any) {
    await handler.editType(e.target.id.split("type")[1], (e.target.value == "assessment" ? 2 : 1));
    setTasks(handler.tasks.filter((task) => task.name != ""));
    updateLocalStorage();

  }
  async function handleDueDateEdit(e: any) {
    const date = new Date(String(e.target.value).replaceAll("-", "/"));
    await handler.editTime(e.target.id.split("due")[1], date.getTime());
    setTasks(handler.tasks.filter((task) => task.name != ""));
    updateLocalStorage();

  }
  async function genResults(e: any) {
    try {
      const res = await handler.gen();
      const json = await res.json()
      console.log(json);
      const assignments = [];
      for (const item of json.response) {
        if (tasks.map((it: any) => { return it.id }).includes(item)) {
          var found: any = tasks.filter((ite: any) => ite.id == item)[0];
          console.log(found)
          assignments.push({
            id: item,
            name: found.name,
            dueDate: new Date(found.dueDate)
          });
        }
      }
      if (assignments.length == tasks.length) {
        setAList(assignments);
        setError("");
      } else {
        setError("An error occured during AI prioritization")
      }
    } catch (e) {
      console.error(e)
      setError("An error occured during AI prioritization")
    }
  }
  function formatDay(day: number) {
    if (day % 10 == 1) {
      return day + "st";
    } 
    if (day % 10 == 2) {
      return day + "nd";
    }
    if (day % 10 == 3) {
      return day + "rd";
    }
    return day + "th";
  }
  async function handleNameEdit(e: any) {
    const id = String(e.target.id).split("input")[1]
    const val = String(e.target.value);
    await handler.editName(id, val);
    setTasks(handler.tasks.filter((task) => task.name != ""));
    updateLocalStorage();
  }
  useEffect(function () {
    setHandler(new Handler(localStorage.getItem("tasks") || JSON.stringify({ data: [] })));
    setTasks(handler.tasks.filter((task) => task.name != ""));

  }, [])
  useEffect(function () {
    console.log(alist)
    setTasks(handler.tasks.filter((task) => task.name != ""));

  }, [handler])
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-slate-900 duration-500	text-white  ">
      <div className="bg-slate-800 w-4/5 max-w-screen-md border-gray-800 rounded-lg border p-4 mb-3 duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-center">Homework Hub</h1>
        <div className="w-full rounded-lg flex flex-row p-1 justify-center">
          <div className="bg-slate-700 w-1/3 rounded-lg flex flex-col items-center mr-1 p-2">
            <h1 className="text-4xl font-bold">{tasks.filter((item) => item.type == 1).length}</h1>
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
          Assignments <span className={`text-gray-400 ${alist.length < 1 ? "hidden" : ""}`}>{`(${acount}/${alist.length})`}</span>
        </p>
        <div className={`bg-slate-700 w-3/4 rounded-lg flex flex-col items-center mr-1 p-2 ${alist.length < 1 ? "hidden" : ""}`} >
          {alist.length > 0 ? (
            <>
              <p className="text-4xl font-bold text-center mb-1 ">{alist[acount - 1].name}</p>
              <p className="text-2xl font-bold text-center mb-1 font-light mb-2">
                Due {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][alist[acount - 1].dueDate.getMonth()] + " " + formatDay(alist[acount - 1].dueDate.getDate()) + ", " + alist[acount - 1].dueDate.getFullYear()} 
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
            </>

          ) : (<></>)}

        </div>
        <div className="flex flex-row rounded-lg w-full mt-1 items-center justify-center">
          <button className="bg-slate-600 rounded-lg px-4 py-2 self-start w-28" disabled={true}>
            Previous
          </button>
          <button className="bg-slate-600 rounded-lg px-4 py-2 self-center w-28 mx-2 justify-self-center" onClick={genResults}>
            Generate
          </button>
          <button className="bg-slate-600 rounded-lg px-4 py-2 self-end w-28" disabled={true}>
            Next
          </button>
        </div>
        <p className="text-sm m-0 text-red-400" >{error}</p>
      </div>
      <div className="bg-slate-800 w-4/5 max-w-screen-md flex flex-col items-center border-gray-800 rounded-lg border p-5 mb-3 hover:scale-105 duration-500">
        <p className="text-lg font-bold text-center mb-1 text-gray-300">
          Active Assignments
        </p>
        <div className="w-4/5 flex items-center flex-col">
          <div className="bg-slate-700 w-full rounded-lg pl-2 flex flex-row pr-0 items-center mb-2 pr-2">
            <input type="text" className="bg-slate-700 outline-none w-full border-b border-b-gray-500 my-2" onKeyDown={handleNewTask} placeholder="New Task"></input>
            <select className="bg-slate-600 p-1 outline-none hover:border-gray-500 rounded-lg text-sm ml-2 hover:bg-slate-600" id="type">
              <option value="assignment" className="hover:bg-slate-600">Assignment</option>
              <option value="assessment">Assessment</option>
            </select>
          </div>
          {
            tasks.map((task: any) => {
              let options: any = { day: "2-digit", month: "2-digit", year: "numeric" };
              const date = new Date(task.dueDate);
              const startDate = new Date(Date.now());
              const sdstring = `${startDate.getFullYear()}-${(startDate.getMonth() < 9 ? "0" : "") + (startDate.getMonth() + 1)}-${(startDate.getDate() < 10 ? "0" : "") + (startDate.getDate())}`;
              const start = `${date.getFullYear()}-${(date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1)}-${(date.getDate() < 10 ? "0" : "") + (date.getDate())}`;
              return <div className="bg-slate-700 w-full rounded-lg pl-2 flex flex-row pr-0 items-center mb-2" key={task.id} id={`s${task.id}`}>
                <div className="flex w-5 h-5 rounded-lg border border-gray-100 mr-2 items-center justify-center p-0">
                  <div className="w-5 h-5 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 duration-300 bg-green-400" id={task.id} onClick={() => handleDelete(task.id)}>
                    <FontAwesomeIcon icon={faCheck} className="text-xs w-5 h-5 rounded-lg leading-5 my-0" />

                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full items-center pt-1">
                    <input type="text" className="bg-slate-700 outline-none w-full mt-1 h-4" defaultValue={task.name} id={`input${task.id}`} onChange={handleNameEdit}></input>
                    <select className="bg-slate-600 p-1 outline-none hover:border-gray-500 rounded-lg text-sm hover:bg-slate-600 ml-2 mr-2 -mb-4" defaultValue={["assignment", "assessment"][task.type - 1]} id={`type${task.id}`} onChange={handleTypeEdit}>
                      <option value="assignment" className="hover:bg-slate-600" defaultChecked={false}>Assignment</option>
                      <option value="assessment">Assessment</option>
                    </select>
                  </div>
                  <div className="flex flex-row items-center mb-1">
                    <p className="text-xs text-gray-300 mt-0 mr-0">Due</p>
                    <input type="date" className="bg-transparent outline-non text-xs text-white" id={`due${task.id}`} defaultValue={start} min={sdstring} onChange={handleDueDateEdit} />
                  </div>
                </div>
              </div>
            })
          }

        </div>

      </div>
    </main >
  );
}
