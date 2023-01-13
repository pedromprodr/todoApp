import { Project } from "./project.js";
import { Task, compare } from "./task.js";

let projects = [];
let currProjPos = -1;

function loadHeader() {
  const header = document.createElement("div");
  header.className = "header";

  const logo = document.createElement("div");
  logo.className = "logo";

  const title = document.createElement("div");
  title.innerHTML = "To-Do Lists";
  title.classList.add("title");
  const subtitle = document.createElement("div");
  subtitle.innerHTML = "a project by pedromprod";
  subtitle.classList.add("subtitle");

  logo.appendChild(title);
  logo.appendChild(subtitle);
  header.appendChild(logo);
  header.appendChild(createNav());
  document.getElementById("content").appendChild(header);
}

function loadNewProjectButton() {
  //NAB-BAR ENTRY TO CREATE NEW PROJECT

  const newProject = document.createElement("div");
  if (projects.length <= 4) {
    newProject.classList.add("newProject", "projectTitle");
    newProject.textContent = "[+]";
  }
  //OPEN THE FORM
  newProject.addEventListener("click", function () {
    clearForm();
    document.getElementById("form-containerP").style.display = "grid";
  });

  return newProject;
}

function loadProjectForm() {
  //FORM CREATION
  var formContainer = document.createElement("div");
  formContainer.setAttribute("id", "form-containerP");
  formContainer.style.display = "none";

  var form = document.createElement("form");
  form.classList.add("formP");

  //Name of the project label
  var nameLabel = document.createElement("label");

  //nameLabel.setAttribute("for", "name");
  nameLabel.innerHTML = "Name of the new Project";
  nameLabel.classList.add("nameLabelP");
  form.appendChild(nameLabel);

  //User input of the name of the new project
  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.classList.add("nameInputP");
  form.appendChild(nameInput);

  //Submit form button
  var submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerHTML = "Create";
  submitButton.classList.add("submitButtonP", "cute-button");
  form.appendChild(submitButton);

  //Creation of the form button
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const project = new Project(nameInput.value);
    clearForm();
    projects.push(project);
    document.getElementsByClassName("header")[0].removeChild(document.getElementsByClassName("projectNav")[0]);
    document.getElementsByClassName("header")[0].appendChild(createNav());
    formContainer.style.display = "none";
    loadProject(project.name);
  });


  formContainer.appendChild(form);

  var closeFormButton = document.createElement("button");
  closeFormButton.setAttribute("id", "close-form");
  closeFormButton.innerHTML = "&times;";
  closeFormButton.classList.add("closeFormButtonP");
  closeFormButton.addEventListener("click", function () {
    formContainer.style.display = "none";
    clearForm();
  });

  formContainer.appendChild(closeFormButton);
  //Append the form-container to the content div
  document.getElementById("content").appendChild(formContainer);

}

function loadTaskForm() {

  //FORM CREATION

  var formContainer = document.createElement("div");
  formContainer.setAttribute("id", "form-containerT");
  formContainer.style.display = "none";

  var form = document.createElement("form");
  form.classList.add("formT");

  //FORM FIELDS

  var nameLabel = document.createElement("label");
  nameLabel.innerHTML = "Task Name";
  nameLabel.classList.add("nameLabelT");


  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.classList.add("nameInputT");

  form.appendChild(nameLabel);
  form.appendChild(nameInput);


  var descLabel = document.createElement("label");
  descLabel.innerHTML = "Task Description";
  descLabel.classList.add("descLabelT");

  var descInput = document.createElement("input");
  descInput.setAttribute("type", "textarea");
  descInput.classList.add("descInputT");

  form.appendChild(descLabel);
  form.appendChild(descInput);

  var dateLabel = document.createElement("label");
  dateLabel.innerHTML = "Due Date";
  dateLabel.classList.add("dateLabelT");

  var dateInput = document.createElement("input");
  dateInput.setAttribute("type", "date");
  dateInput.classList.add("dateInputT");

  form.appendChild(dateLabel);
  form.appendChild(dateInput);

  var priorityLabel = document.createElement("label");
  priorityLabel.innerHTML = "Urgent?";
  priorityLabel.classList.add("priorityLabelT");

  var priorityInput = document.createElement("input");
  priorityInput.setAttribute("type", "checkbox");
  priorityInput.classList.add("priorityInputT");

  form.appendChild(priorityLabel);
  form.appendChild(priorityInput);


  //SUBMIT BUTTON

  var submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerHTML = "Create";
  submitButton.classList.add("submitButtonT", "cute-button");
  form.appendChild(submitButton);

  //SUBMIT BEHAVIOR ---> TASK CREATION

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let priorityVal;
    console.log(priorityInput.value);
    if (priorityInput.checked) priorityVal = 'urgent'
    else priorityVal = 'normal'

    const newTask = new Task(nameInput.value, dateInput.value, descInput.value, dateInput.value, priorityVal);
    clearForm();
    if (currProjPos >= 0) {
      projects[currProjPos].tasks.push(newTask);
      loadProject(projects[currProjPos].name);
    }
    else {
      alert("Can't create a task in All Tasks. Please select a project in order to create a task.")
    }
    formContainer.style.display = "none";
  });


  formContainer.appendChild(form);

  //CLOSE BUTTON

  var closeFormButton = document.createElement("button");
  closeFormButton.innerHTML = "&times;";
  closeFormButton.classList.add("closeFormButtonT");

  closeFormButton.addEventListener("click", function () {
    formContainer.style.display = "none";
    clearForm();
  });

  formContainer.appendChild(closeFormButton);

  document.getElementById("content").appendChild(formContainer);

}

function createNav() {
  const projectNav = document.createElement("div");
  projectNav.classList.add("projectNav");

  const allTasks = document.createElement("div");
  allTasks.className = "projectTitle";
  allTasks.innerHTML = "All Tasks";
  allTasks.addEventListener("click", () => loadAllTasks());
  projectNav.appendChild(allTasks);

  projects.forEach((project) => {
    const projectTitle = document.createElement("div");
    projectTitle.className = "projectTitle";
    projectTitle.innerHTML = project.name;
    projectTitle.addEventListener("click", () => loadProject(project.name));
    projectNav.appendChild(projectTitle);
  });
  projectNav.appendChild(loadNewProjectButton());
  return projectNav;
}

function unpackProjects(fileToUnpack) {
  let newProjectArray = [];
  fileToUnpack.projects.forEach(p => {
    let nP = new Project(p.name);
    p.tasks.forEach( t =>{
      let nT = new Task(t.name, t.date, t.description, t.dueDate,t.priority,t.isComplete);
      nP.tasks.push(nT);
    })
    newProjectArray.push(nP);
  });
  return newProjectArray;
}

function loadDOM() {

  // Get the string from local storage
  let dataString = localStorage.getItem('projectsData');

  // Parse the string to an object
  let data = JSON.parse(dataString);

  console.log(data);
  // Assign the projects to the projects variable
  if (data != null) {
    projects = unpackProjects(data);
  }

  if (projects.length == 0) loadSampleProjects();

  loadProjectForm();
  console.log(projects);

  loadTaskForm();

  loadHeader();

  loadUtilityButtons();

  const projectContainer = document.createElement("div");
  projectContainer.className = "projectContainer";
  document.getElementById("content").appendChild(projectContainer);

  loadAllTasks();

  //loadProject(projects[0].name);
  //currProjPos = 0;
}

function loadAllTasks() {
  currProjPos = -1;

  document.querySelectorAll(".projectTitle").forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
    if (element.innerHTML === "All Tasks") element.classList.add("active");
  });
  let projectContainer = document.getElementsByClassName("projectContainer")[0];
  projectContainer.innerHTML = "";
  let allTasks = [];

  projects.forEach((project) => {
    project.tasks.forEach((task) => {
      allTasks.push(task);
    });
  });

  allTasks.sort(compare);

  allTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";

    taskElement.addEventListener("click", () => {
      projects.forEach((projecti) => {
        projecti.tasks.forEach((taski) => {
          if (taski.name === task.name) {
            taski.markAsComplete();
            loadAllTasks();
          }
        });
      });
    });

    const name = document.createElement("li");
    name.classList.add("taskName");
    name.textContent = task.name;
    taskElement.appendChild(name);

    const description = document.createElement("li");
    description.textContent = task.description;
    description.classList.add("taskDescription");
    taskElement.appendChild(description);

    const dueDate = document.createElement("li");
    dueDate.textContent = "Due Date: " + task.dueDate;
    dueDate.classList.add("taskDueDate");
    taskElement.appendChild(dueDate);

    if (task.isComplete) taskElement.classList.add("completedTask");

    if (task.priority === 'urgent') {
      taskElement.classList.add("urgentTask")
    }
    //const isComplete = document.createElement('li');

    //isComplete.textContent = task.isComplete;
    //taskElement.appendChild(isComplete);

    projectContainer.appendChild(taskElement);
  });

  let dataString = JSON.stringify({ projects: projects });

  localStorage.setItem('projectsData', dataString);
}

function loadProject(title) {
  let projectContainer = document.getElementsByClassName("projectContainer")[0];
  projectContainer.innerHTML = "";

  document.querySelectorAll(".projectTitle").forEach((element) => {
    if (element.classList.contains("active")) {
      element.classList.remove("active");
    }
    if (element.innerHTML === title) element.classList.add("active");
  });

  projects.forEach((project, index) => {
    if (project.name === title) {
      currProjPos = index;
      console.log(index);
      project.tasks.sort(compare);
      project.tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";

        taskElement.addEventListener("click", () => {
          task.markAsComplete();
          loadProject(title);
          //console.log("Hi");
          //console.log(projects[0]);
          /*projects.forEach((project) => {
            project.tasks.forEach((taski) => {
              console.log("clicked task");
              if (taski.name === task.name) {
                taski.markAsComplete();
                loadProject(title);
              }
            });
          });*/
        });

        const name = document.createElement("li");
        name.textContent = task.name;
        name.classList.add("taskName");
        taskElement.appendChild(name);

        const description = document.createElement("li");
        description.textContent = task.description;
        description.classList.add("taskDescription");
        taskElement.appendChild(description);

        const dueDate = document.createElement("li");
        dueDate.textContent = task.dueDate;
        dueDate.classList.add("taskDueDate");
        taskElement.appendChild(dueDate);

        if (task.isComplete) {
          //console.log("hi");
          taskElement.classList.add("completedTask")
        }

        if (task.priority === 'urgent' && !task.isComplete) {
          taskElement.classList.add("urgentTask")
        }

        //const isComplete = document.createElement('li');

        //isComplete.textContent = task.isComplete;
        //taskElement.appendChild(isComplete);

        projectContainer.appendChild(taskElement);
      });
    }
  });

  let dataString = JSON.stringify({ projects: projects });

  localStorage.setItem('projectsData', dataString);
}

function loadUtilityButtons() {
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add("buttonContainer");

  const createTask = document.createElement("button");
  //submitButton.setAttribute("type", "submit");
  createTask.innerHTML = "Create Task";
  createTask.classList.add("createTaskButton", "utility-button");
  createTask.addEventListener('click', () => {
    clearForm();
    document.getElementById("form-containerT").style.display = "grid";
  })

  const clearCompleted = document.createElement("button");
  //submitButton.setAttribute("type", "submit");
  clearCompleted.innerHTML = "Clear Completed Tasks";
  clearCompleted.classList.add("clearCompleted", "utility-button");
  clearCompleted.addEventListener('click', () => {
    clearForm();
    deleteCompletedTasks();
    if (currProjPos == -1) loadAllTasks();
    else if (currProjPos >= 0) loadProject(projects[currProjPos].name)
  })


  const deleteProject = document.createElement("button");
  //submitButton.setAttribute("type", "submit");
  deleteProject.innerHTML = "Delete Project";
  deleteProject.classList.add("deleteProjectButton", "utility-button");
  deleteProject.addEventListener('click', () => {
    clearForm();
    if (currProjPos == -1) alert("Can't delete All Tasks. Please select a project in order to delete it.");
    else if (currProjPos >= 0) {
      var userInput = prompt("Are you sure you want to delete this project? Please type 'yes' or 'no'");
      if (userInput.toUpperCase() === 'YES') {
        console.log("deleting" + currProjPos);
        console.log(projects);
        deleteProjectFunction(projects[currProjPos].name);
        document.querySelector(".header").removeChild(document.querySelector(".projectNav"));
        document.querySelector(".header").appendChild(createNav());
        loadAllTasks();
      } else {
        console.log("Deletion Cancelled");
      }
    }
  })


  buttonContainer.appendChild(createTask);
  buttonContainer.appendChild(clearCompleted);
  buttonContainer.appendChild(deleteProject);

  document.getElementById('content').appendChild(buttonContainer);
}

function loadSampleProjects() {
  projects = [];
  let project = new Project("Household tasks");

  let task1 = new Task(
    "Clean Dishes",
    "",
    "Go to the kitchen and do the dishes, you lazy bastard",
    "12/01/2022",
    "urgent",
    false
  );
  let task2 = new Task(
    "Cook Dinner for Sam",
    "",
    "Cook pasta for Sam before his practice",
    "09/01/2022",
    "normal",
    false
  );
  let task3 = new Task(
    "Buy groceries",
    "",
    "Go to the supermarket",
    "10/01/2022",
    "urgent",
    false
  );

  project.tasks.push(task1, task2, task3);
  projects.push(project);

  project = new Project("Groceries");
  task1 = new Task("Buy Milk", "", "", "09/01/2022", "urgent",false);
  task1.markAsComplete();
  task2 = new Task("Buy toilet paper", "", "", "09/01/2022", "normal",false);
  task3 = new Task("Buy cleaning products", "", "", "09/01/2022", "normal",false);
  project.tasks.push(task1, task2, task3);
  projects.push(project);
}

function deleteCompletedTasks() {
  projects.forEach((project) => {
    project.tasks = project.tasks.filter(item => !item.isComplete);
  });
}

function deleteProjectFunction(name) {
  projects = projects.filter(item => item.name !== name);
  console.log(projects);
}


function clearForm() {
  document.getElementById("form-containerP").style.display = "none";
  document.getElementById("form-containerT").style.display = "none";
  var inputs = document.querySelectorAll('input');

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "text" || inputs[i].type === "textarea") {
      inputs[i].value = "";
    }
  }
}

export { loadDOM };
