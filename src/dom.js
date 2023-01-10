import { Project } from "./project.js";


function loadHeader() {
    const header = document.createElement('div');
    header.className = 'header';

    const logo = document.createElement('div');
    logo.className = 'logo';

    const title = document.createElement('div')
    title.innerHTML = 'To-Do Lists'
    title.classList.add('title')
    const subtitle = document.createElement('div')
    subtitle.innerHTML = 'a project by pedromprod'
    subtitle.classList.add('subtitle')

    logo.appendChild(title);
    logo.appendChild(subtitle);
    header.appendChild(logo);

    document.getElementById('content').appendChild(header);
}

const projects = []

const projectContainer = document.createElement('div');
projectContainer.className = 'projectContainer';
document.getElementById('content').appendChild(projectContainer);

projects.forEach(project => {
    const projectTitle = document.createElement('div');
    projectTitle.className = 'projectTitle';
    projectTitle.innerHTML = project.name;
    projectTitle.addEventListener("click", () => projects.forEach(element => {
        if (element.name === projectTitle.innerHTML) {

        }
    }))
});


function loadProject(title) {
    const content = document.getElementById('content');

    projects.forEach(project => {
        if (project.name === title) {
            project.forEach(element => {
                const name = document.createElement('li');
                name.textContent = task.name;
                content.appendChild(name);

                const description = document.createElement('li');
                description.textContent = task.description;
                content.appendChild(description);

                const dueDate = document.createElement('li');
                dueDate.textContent = task.dueDate;
                content.appendChild(dueDate);

                const isComplete = document.createElement('li');
                isComplete.textContent = task.isComplete;
                content.appendChild(isComplete);

            });
        }
    })



}