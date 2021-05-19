// tasks_list_script.js
// the js for tasks_list part only


import Task from './Task.js'; 


function getExistedAllTasksFromLS(){
  let myStorage = window.localStorage;
  let allTasksList =  JSON.parse(myStorage.getItem("tasksList"));  
  console.log("localStorage allTasksList: ", allTasksList);
  return allTasksList;
}


function clearDisplayedTasksList(){
  //delete the old tasks display page
  let taskListDiaplayTag = document.querySelectorAll(".tasks_list_elem");
  if(taskListDiaplayTag){
    taskListDiaplayTag.forEach(element => {
      element.remove();
    });
  }
}

function renderTaskElem(oneTask){
  const tasksListModuleForm =  document.getElementById("tasks_list_display");
  const tasktext = oneTask.taskText;
  const isChecked = oneTask.checked === 1 ? true : false;
  const taskID = oneTask.taskID;

  const oneTaskEle = document.createElement("li");
  oneTaskEle.setAttribute('class', `tasks_list_elem ${isChecked}`);
  oneTaskEle.innerHTML = `
      <input id=${taskID} type="checkbox"/>
      <label for="1" class="tick js-tick"></label>
      <span>${tasktext}</span>
      <button class="delete-task" id="tasks_list_delete_button">
      <svg><use href="#delete-icon"></use></svg>
      </button>
  `;
  tasksListModuleForm.appendChild(oneTaskEle);
}

function renderTasksList(){
  clearDisplayedTasksList();
  // step 1 read from DOM localStorage
  let allTasksList = getExistedAllTasksFromLS();
  // step 2: if no task, then show  prompt
  if (allTasksList == null || allTasksList.length === 0 ){
      console.log("show no task prompt");
      let tasksListModuleTitle =  document.getElementById("tasks_list_title");
      const noTaskFoudnPrompt = document.createElement("div");
      noTaskFoudnPrompt.setAttribute('class', `task_nofound_prompt`);
      noTaskFoudnPrompt.textContent = "No tasks found yet. Let's create a task now:";
      tasksListModuleTitle.appendChild(noTaskFoudnPrompt);
  }
  // step 3: if has task, then show tasks
  if (allTasksList != null){
    console.log("allTasksList.length: ", allTasksList.length);
    allTasksList.forEach((oneTask) => {
        console.log("read oneTask: ", oneTask)
        renderTaskElem(oneTask);
    })
  }
}

// first to do when DOM loaded
document.addEventListener('DOMContentLoaded', renderTasksList);





function getTodayDate(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  console.log("today: ", today);
  return today;
}

// when user enter a new task
document.getElementById("tasks_list_form").addEventListener("submit", event => {
  event.preventDefault();

  let myStorage = window.localStorage;
  let tasksListCounter = Number(myStorage.getItem('tasksListCounter'));
  myStorage.setItem('tasksListCounter', tasksListCounter+1);

  //create a new task obj
  const usrInput = document.getElementById("tasks_list_usrinput");
  const usrInputText = usrInput.value.trim();
  if (usrInputText !== '') {// clean it after 'enter'
    usrInput.value = '';
    usrInput.focus();
  }
  let aNewTask = new Task(usrInputText, tasksListCounter+1, 0, 0, getTodayDate()); 
  console.log("aNewTask: ", aNewTask);
  // combine existed and new tasks into a new tasksList array
  let allTasksList = getExistedAllTasksFromLS();
  let newAllTasksListArray = [];
  if (allTasksList != null){
    for (let i = 0; i < allTasksList.length; i++){
      newAllTasksListArray.push(allTasksList[i]);
    }
  }
  newAllTasksListArray.push(aNewTask);
  console.log("newAllTasksListArray: ", newAllTasksListArray);
  // update/replace localStorage
  myStorage.setItem('tasksList', JSON.stringify(newAllTasksListArray));
  // render/display
  renderTasksList();

});



function deleteOneTask(){

}
// when user delete a task
let deleteButtonObjList = document.querySelectorAll("tasks_list_delete_button");
if (deleteButtonObjList != null){
  for (let i = 0; i < deleteButtonObjList.length; i++){
    deleteButtonObjList[i].addEventListener("click", deleteOneTask);
  }
}
