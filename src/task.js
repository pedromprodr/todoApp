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
      this.isComplete = true;
    }
  }