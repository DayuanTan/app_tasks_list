// tasks_list_script.js
// the js for tasks_list part only


import Task from './Task.js'; 
import TasksList from './TasksList.js'; 
let Task1 = new Task();
let TasksList1 = new TasksList();


function showTaskElem(oneTask){
    const tasksListModuleForm =  document.getElementById("tasks_list_form");
    const tasktext = oneTask.text;
    const isChecked = oneTask.checked === 1 ? true : false;
    const taskID = oneTask.id;

    const oneTaskEle = document.createElement("li");
    oneTaskEle.setAttribute('class', `tasks_list_elem ${isChecked}`);
    oneTaskEle.innerHTML = `
        <input id=${taskID} type="checkbox"/>
        <label for="1" class="tick js-tick"></label>
        <span>${tasktext}</span>
        <button class="delete-task">
        <svg><use href="#delete-icon"></use></svg>
        </button>
    `;
    tasksListModuleForm.appendChild(oneTaskEle);
}

document.addEventListener('DOMContentLoaded', () => {

    // step 1 read from json
    fetch("./tasks_list/tasks_list_all_tasks.json")// the return value of fetch() is response object
    .then( /* FILL IN RESPONSE HANDLING HERE */ 
      function(response){
        const response_json =  response.json();
        console.log("response_json.length: ", response_json.length);
        console.log("Object.keys(response_json).length: ", Object.keys(response_json).length);
        if (response.ok){
           return response_json;
        }else{
          console.log("Fetch err: ", response.error);
        }
      }
    )
    .then(
        entries => {
        // step 2: if no task, then show  prompt
        console.log("entries.length: ", entries.length);
        if (entries.length === 0 ){
            console.log(1);
            let tasksListModuleTitle =  document.getElementById("tasks_list_title");
            const noTaskFoudnPrompt = document.createElement("div");
            noTaskFoudnPrompt.setAttribute('class', `task_nofound_prompt`);
            noTaskFoudnPrompt.textContent = "No tasks found yet. Let's create a task now:";
            tasksListModuleTitle.appendChild(noTaskFoudnPrompt);
            console.log(2);
        }
        // step 3: if has task, then show tasks
        entries.forEach((entry) => {
            console.log("entry: ", entry)
            showTaskElem(entry);
        })
    })
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
    });
    



});




// document.getElementById("tasks_list_form").addEventListener("submit", event => {
//   // event.preventDefault();
//   //get usr input task
//   const usr_input = document.getElementById("tasks_list_usrinput");
//   const usr_input_text = usr_input.value.trim();
//   console.log("usr_input: ", usr_input_text);
//   //clean it after 'enter'
//   if (usr_input_text !== '') {
//     usr_input.value = '';
//     usr_input.focus();
//   }
//   //write into json
//   var xhr = new XMLHttpRequest();
//   var url = "./tasks_list/tasks_list_all_tasks.json";
//   xhr.open("POST", url, true);
//   xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//           var json = JSON.parse(xhr.responseText);
//           console.log(json.email + ", " + json.password);
//       }
//   };
//   var data = JSON.stringify({"email": "hey@mail.com", "password": "101010"});
//   xhr.send(data);
// });




function getExistedTasksFromLS(){
  let myStorage = window.localStorage;
  let allTasksList =  JSON.parse(myStorage.getItem("tasksList"));  
  console.log("localStorage allTasksList: ", allTasksList);
  return allTasksList;
}

function setTasksListIntoLS(){
  let allTasksList = getExistedTasksFromLS();
  let newTask3 = {"text": "333",
  "checked": 0,
  "id": 3,
  "order": 3,
  "date": "05-18-2021"};
  allTasksList.appendChild(newTask3);


}

function getTodayDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  console.log(today);
  return today;
}

document.getElementById("tasks_list_form").addEventListener("submit", event => {
  event.preventDefault();

  let myStorage = window.localStorage;
  let tasksListCounter = Number(myStorage.getItem('tasksListCounter'));
  myStorage.setItem('tasksListCounter', tasksListCounter+1);

  //create a new task obj
  const usrInput = document.getElementById("tasks_list_usrinput");
  const usrInputText = usrInput.value.trim();
  let aNewTask = new Task(usrInputText, tasksListCounter+1, 0, 0, getTodayDate()); 
  console.log("aNewTask: ", aNewTask);
  // append into existed tasksList
  let allTasksList = getExistedTasksFromLS();
  const appendedTasksList = [allTasksList, aNewTask]
  console.log("appendedTasksList: ", appendedTasksList);
  // update/replace localStorage
  myStorage.setItem('tasksList', JSON.stringify(appendedTasksList));
  getExistedTasksFromLS();

});