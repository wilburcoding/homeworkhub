import { useState } from "react";


class Handler {

  constructor(local) {
    //Process localStorage here
    this.tasks = JSON.parse(String(local)).data;
    for (let i = 0; i < this.tasks.length; i++) {
      const td = new Date(this.tasks[i].dueDate);
      const ty = new Date()
      if (td.getTime() < Date.now() && td.getDate() != ty.getDate() && td.getMonth() != ty.getMonth() && td.getFullYear() != ty.getFullYear()) {

        this.tasks[i].dueDate = Date.now();
        console.log("yes")
      }
    }
  }
  idGen() {
    let characters = [];
    for (var i = 0; i < 16; i++) {
      characters.push(Math.floor(Math.random() * 16).toString(16))
    }
    return characters.join('');
  }
  add(name, type) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tasks.push({ "name": name, "dueDate": tomorrow.getTime(), id:this.idGen(),"type":type })
  }
  editTime(id, newTime) {
    //To be changed
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.dueDate = newTime;
      }
    });

  }
  editType(id, newType) {
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.type = newType;
      }
    });
  }
  editName(id, newName) {
    this.tasks.forEach(task => {
      if (task.id === id) {
        task.name = newName;
      }
    });
  }
  gen() {
    let data = {data:[]}
    for (var item of this.tasks) {
      let dat = new Date(item.dueDate);
      data.data.push({
        name:item.name,
        dueDate: dat.getMonth() + "/" + dat.getDate() + "/" + dat.getFullYear()
      })
    }
    console.log(data)
    return fetch("./api", {
      body: JSON.stringify(data),
      method:"POST"
    });
  }
  delete(id) {
    this.tasks = this.tasks.filter(task => task.id!== id);
  }
}
export default Handler;
