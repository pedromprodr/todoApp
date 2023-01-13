import { Task } from './task.js';


class Project {
  constructor(name, tasks = []) {
    this.name = name;
    this.tasks = tasks;
  }
  
  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    const taskIndex = this.tasks.indexOf(task);
    if (taskIndex > -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  displayTasks() {
    console.log(`Tasks for project ${this.name}:`);
    this.tasks.forEach(task => console.log(task));
  }

}


export { Project };