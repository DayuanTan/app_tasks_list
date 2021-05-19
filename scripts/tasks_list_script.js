// tasks_list_script.js
// the js for tasks_list part only


import Task from './Task.js'; 


function getExistedAllTasksFromLS(){
  let myStorage = window.localStorage;
  let allTasksList =  JSON.parse(myStorage.getItem("tasksList"));  
  console.log("localStorage allTasksList: ", allTasksList);
  return allTasksList;
}


function clearDisplayedTasksItems(){
  //delete the old tasks display page
  let tasksListDisplayTag = document.querySelectorAll(".tasks_list_item");
  if(tasksListDisplayTag){
    tasksListDisplayTag.forEach(element => {
      element.remove();
    });
  }
  //delete no tasks prompt
  let noTasksPrompt = document.querySelectorAll(".task_nofound_prompt");
  if(noTasksPrompt){
    noTasksPrompt.forEach(element => {
      element.remove();
    });
  }
}

function renderOneTaskItem(oneTask){
  const tasksListModuleForm =  document.getElementById("tasks_list_display");
  const tasktext = oneTask.taskText;
  const isChecked = oneTask.checked === 1 ? 'done' : '';
  const taskID = oneTask.taskID;

  const oneTaskEle = document.createElement("li");
  oneTaskEle.setAttribute('class', `tasks_list_item ${isChecked}`);
  oneTaskEle.setAttribute('data-key', taskID);
  oneTaskEle.innerHTML = `
      <input id=${taskID} type="checkbox"/>
      <span>${tasktext}</span>
      <button class="tasks_list_delete" >
      <svg><use href="#delete-icon"></use></svg>
      </button>
  `;
  tasksListModuleForm.appendChild(oneTaskEle);
}

function renderTasksList(){
  clearDisplayedTasksItems();
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
  }else {
    // step 3: if has task, then show tasks
    console.log("allTasksList.length: ", allTasksList.length);
    allTasksList.forEach((oneTask) => {
        console.log("read oneTask: ", oneTask)
        renderOneTaskItem(oneTask);
    })
  }
}

// first to do when DOM loaded
document.addEventListener('DOMContentLoaded', renderTasksList);





function getTodayDate(){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

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
  if (usrInputText === ''){
    return;
  }else {// clean it after 'enter'
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



function deleteOneTask(event){
  event.preventDefault();
  console.log(111111);
}
// when user delete a task
let tasksListUlTag = document.getElementById("tasks_list_display");
tasksListUlTag.addEventListener('click', event =>{
  if (event.target.classList.contains("tasks_list_delete")){
    console.log("selected taskID to delete is: ", event.target.parentElement.dataset.key);
  }
});

