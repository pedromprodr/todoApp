import { Project } from "./project.js";
import { Task, compare } from "./task.js";

const projects = [];

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
  header.appendChild(projectNav);
  document.getElementById("content").appendChild(header);
}

function loadNewProjectButton() {
  //NAB-BAR ENTRY TO CREATE NEW PROJECT
  const newProject = document.createElement("div");
  newProject.classList.add("newProject", "projectTitle");
  newProject.textContent = "[+]";
  //OPEN THE FORM
  newProject.addEventListener("click", function () {
    document.getElementById('form-container').style.display = "block";
  });

  return newProject;
}

function loadProjectForm() {
  //FORM CREATION
  var formContainer = document.createElement("div");
  formContainer.setAttribute("id", "form-container");
  formContainer.style.display = "none";

  var form = document.createElement("form");
  form.classList.add('form');

  //Name of the project label
  var nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "name");
  nameLabel.innerHTML = "Name of the project:   ";
  nameLabel.classList.add('nameLabel');
  form.appendChild(nameLabel);

  //User input of the name of the new project
  var nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "name");
  nameInput.setAttribute("name", "name");
  nameInput.classList.add('nameInput');
  form.appendChild(nameInput);

  //Submit form button
  var submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerHTML = "Submit";
  submitButton.classList.add('submitButton','cute-button');
  form.appendChild(submitButton);

  //Creation of the form button
  var closeFormButton = document.createElement("button");
  closeFormButton.setAttribute("id", "close-form");
  closeFormButton.innerHTML = "Close";
  closeFormButton.classList.add("closeFormButton",'cute-button');
  closeFormButton.addEventListener("click", function () {
    formContainer.style.display = "none";
  });

  form.appendChild(closeFormButton);

  formContainer.appendChild(form);

  //Append the form-container to the content div
  document.getElementById("content").appendChild(formContainer);

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

    //const isComplete = document.createElement('li');
    if (task.isComplete) taskElement.classList.add("completedTask");
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
      project.tasks.sort(compare);
      project.tasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";

        taskElement.addEventListener("click", () => {
          projects.forEach((project) => {
            project.tasks.forEach((taski) => {
              if (taski.name === task.name) {
                taski.markAsComplete();
                loadProject(title);
              }
            });
          });
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

        //const isComplete = document.createElement('li');
        if (task.isComplete) taskElement.classList.add("completedTask");
        //isComplete.textContent = task.isComplete;
        //taskElement.appendChild(isComplete);

        projectContainer.appendChild(taskElement);
      });
    }
  });
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
