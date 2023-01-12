import { property } from "lodash";

class Task {
    constructor(name, date, description, dueDate, priority) {
      this.name = name;
      this.date = date;
      this.description=description;
      this.dueDate = dueDate;
      this.priority=priority;
      this.isComplete = false;
    }
    
    markAsComplete() {
      this.isComplete = !this.isComplete;
    }
    
  }

  function compare(taskA, taskB) {
    if (taskA.isComplete && !taskB.isComplete) {
        return 1;
    } else if (!taskA.isComplete && taskB.isComplete) {
        return -1;
    } else {
        if (taskA.priority==='urgent' && taskB.priority==='normal') {
            return -1;
        } else if (taskA.priority==='normal' && taskB.priority==='urgent') {
            return 1;
        } else {
            return 0;
        }
    }
}
  export { Task , compare };
  