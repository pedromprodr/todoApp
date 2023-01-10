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
  function compare( a, b ) {
    if ( a.priority === 'urgent' && b.priority === 'normal' ){
      return -1;
    }
    if ( a.priority === 'normal' && b.priority === 'urgent' ){
      return 1;
    }
    return 0;
  }
  export { Task , compare };
  