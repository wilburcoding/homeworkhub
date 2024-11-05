import { useState } from "react";


class Handler {

  constructor(local) {
    //Process localStorage here
    this.tasks = JSON.parse(String(local)).data;
    for (let i = 0; i < this.tasks.length; i++) {
      console.log(new Date())
      console.log(new Date(this.tasks[i].dueDate))
      if (new Date(this.tasks[i].dueDate).getDate() < new Date().getDate()) {
        this.tasks[i].dueDate = Date.now() - 5 * 3600000;
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
    console.log(this.tasks)

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tasks.push({ "name": name, "dueDate": tomorrow.getTime(), id:this.idGen(),"type":type })
    console.log(this.tasks)
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
  delete(id) {
    console.log(id)
    this.tasks = this.tasks.filter(task => task.id!== id);
  }
}
export default Handler;
