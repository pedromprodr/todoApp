import { Project } from "./project.js";
import { Task, compare } from "./task.js";

const projects = [];
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
  if(projects.length<=4){
  newProject.classList.add("newProject", "projectTitle");
  newProject.textContent = "[+]";
  }
  //OPEN THE FORM
  newProject.addEventListener("click", function () {
    document.getElementById("form-container").style.display = "grid";
  });

  return newProject;
}

function loadProjectForm() {
  //FORM CREATION
  var formContainer = document.createElement("div");
  formContainer.setAttribute("id", "form-container");
  formContainer.style.display = "none";

  var form = document.createElement("form");
  form.classList.add("formP");

  //Name of the project label
  var nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "name");
  nameLabel.innerHTML = "Name of the new Project";
  nameLabel.classList.add("nameLabel");
  form.appendChild(nameLabel);

  //User input of the name of the new project
  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "name");
  nameInput.setAttribute("name", "name");
  nameInput.classList.add("nameInput");
  form.appendChild(nameInput);

  //Submit form button
  var submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerHTML = "Create";
  submitButton.classList.add("submitButton", "cute-button");
  form.appendChild(submitButton);

  //Creation of the form button

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const project = new Project(nameInput.value);
    document.getElementsByClassName("nameInput")[0].value = '';
    console.log(projects);
    projects.push(project);
    document.getElementsByClassName("header")[0].removeChild(document.getElementsByClassName("projectNav")[0]);
    document.getElementsByClassName("header")[0].appendChild(createNav());
    formContainer.style.display = "none";
});


  formContainer.appendChild(form);

  var closeFormButton = document.createElement("button");
  closeFormButton.setAttribute("id", "close-form");
  closeFormButton.innerHTML = "&times;";
  closeFormButton.classList.add("closeFormButton");
  closeFormButton.addEventListener("click", function () {
    formContainer.style.display = "none";
    document.getElementsByClassName("nameInput")[0].value = '';
  });
  formContainer.appendChild(closeFormButton);
  //Append the form-container to the content div
  document.getElementById("content").appendChild(formContainer);

}

function createNav() {
  console.log("A");
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

function loadDOM() {
  loadSampleProjects();

  loadProjectForm();

  loadHeader();

  const projectContainer = document.createElement("div");
  projectContainer.className = "projectContainer";
  document.getElementById("content").appendChild(projectContainer);

  loadProject(projects[0].name);
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
    
    if(task.priority==='urgent'){
      taskElement.classList.add("urgentTask")
    }
    //const isComplete = document.createElement('li');

    //isComplete.textContent = task.isComplete;
    //taskElement.appendChild(isComplete);

    projectContainer.appendChild(taskElement);
  });
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

  projects.forEach((project) => {
    if (project.name === title) {
      currProjPos = -1;
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

        if (task.isComplete){
          //console.log("hi");
           taskElement.classList.add("completedTask")
        }

        if(task.priority==='urgent' && !task.isComplete){
          taskElement.classList.add("urgentTask")
        }

        //const isComplete = document.createElement('li');

        //isComplete.textContent = task.isComplete;
        //taskElement.appendChild(isComplete);

        projectContainer.appendChild(taskElement);
      });
    }
  });
}

function loadUtilityButtons() {
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add("buttonContainer");

  const createTask = document.createElement("button");
  //submitButton.setAttribute("type", "submit");
  createTask.innerHTML = "Create Task";
  createTask.classList.add("createTaskButton", "cute-button");

  const deleteProject = document.createElement("button");
  //submitButton.setAttribute("type", "submit");
  deleteProject.innerHTML = "Delete Project";
  deleteProject.classList.add("deleteProjectButton", "cute-button");

  buttonContainer.appendChild(submitButton,createTask);
}

function loadSampleProjects() {
  let project = new Project("Household tasks");
  let task1 = new Task(
    "Clean Dishes",
    "",
    "Go to the kitchen and do the dishes, you lazy bastard",
    "12/01/2022",
    "urgent"
  );
  let task2 = new Task(
    "Cook Dinner for Sam",
    "",
    "Cook pasta for Sam before his practice",
    "09/01/2022",
    "normal"
  );
  let task3 = new Task(
    "Buy groceries",
    "",
    "Go to the supermarket",
    "10/01/2022",
    "urgent"
  );
  project.tasks.push(task1, task2, task3);
  projects.push(project);

  project = new Project("Groceries");
  task1 = new Task("Buy Milk", "", "", "09/01/2022", "urgent");
  task1.markAsComplete();
  task2 = new Task("Buy toilet paper", "", "", "09/01/2022", "normal");
  task3 = new Task("Buy cleaning products", "", "", "09/01/2022", "normal");
  project.tasks.push(task1, task2, task3);
  projects.push(project);
}

export { loadDOM };
