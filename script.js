let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(){

let taskList = document.getElementById("taskList");
taskList.innerHTML="";

let completedCount = 0;

tasks.forEach((task,index)=>{

let li = document.createElement("li");

let taskText = document.createElement("span");
taskText.innerText = task.name + " (" + task.date + ")";

if(task.completed){
taskText.classList.add("completed");
completedCount++;
}

li.appendChild(taskText);

if(task.completed){

let stars = document.createElement("span");
stars.className="stars";
stars.innerText="⭐⭐⭐";
li.appendChild(stars);

}

let completeBtn = document.createElement("button");
completeBtn.innerText="Complete";
completeBtn.className="completeBtn";

completeBtn.onclick=function(){

tasks[index].completed = true;
saveTasks();
renderTasks();

};

let deleteBtn = document.createElement("button");
deleteBtn.innerText="Delete";
deleteBtn.className="delete";

deleteBtn.onclick=function(){

tasks.splice(index,1);
saveTasks();
renderTasks();

};

li.appendChild(completeBtn);
li.appendChild(deleteBtn);

taskList.appendChild(li);

});

updateProgress(completedCount);
}

function addTask(){

let taskInput = document.getElementById("taskInput");
let dateInput = document.getElementById("dateInput");

let taskName = taskInput.value;
let taskDate = dateInput.value;

if(taskName=="" || taskDate==""){
alert("Please enter task and date");
return;
}

tasks.push({
name:taskName,
date:taskDate,
completed:false
});

saveTasks();
renderTasks();

taskInput.value="";
dateInput.value="";
}

function updateProgress(completedCount){

let total = tasks.length;

let percent = total==0 ? 0 : (completedCount/total)*100;

document.getElementById("progressText").innerText =
"Progress: " + Math.round(percent) + "%";

document.getElementById("progressFill").style.width =
percent + "%";
}

renderTasks();