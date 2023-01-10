import _ from 'lodash';
import { loadProject } from './project.js';


 function component() {
   const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  // Lodash, now imported by this script
   element.innerHTML = _.join(['Eu agarro-lhe no', 'barrote'], ' ');

   return element;
 }

 document.getElementById("content").appendChild(component());
 loadProject();