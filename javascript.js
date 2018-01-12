var getChange=document.querySelector('#selo');
var getCreate = document.querySelector('#createUser');
var userType, somePerson, PersonsList=[];
var dishome= document.querySelector('#Homeclick');
var disproject=	document.querySelector('#Projectclick');
var i, j;
var buttonOk = document.querySelector('.ok');
var TasksList=[], taskType1, taskType2, taskType3, sometask, target, targetId;
var addTask =  document.querySelector('#AddTask'); 
var clickHunter= document.getElementById('selectTask');


// Funnction User Create   -----------------------------------------------------------
function createUser(person) {
    this.name = person.name;
    this.surname= person.surname;
    this.typeofUser = person.userType;	
}
function createStudent(person){
    createUser.call(this,person);
    this.specialization = person.specialization;
}
function createDeveloper(person){
    createStudent.call(this,person);
    this.jobTitle = person.jobTitle;	 
}

// Select User ----------------------------------------------------------------------
function selectUser(){
	    userType = this.value; 
		switch (userType){
			case'user':
				document.querySelector('#impSpecialization').style.display ='none';
				document.querySelector('#impJobTitle').style.display ='none';
				break;
			case 'student':
				document.querySelector('#impSpecialization').style.display ='block';
				document.querySelector('#impJobTitle').style.display ='none';
				break;
			case 'developer':
				document.querySelector('#impSpecialization').style.display ='block';
				document.querySelector('#impJobTitle').style.display ='block';
				break;
		}		
	}

getChange.addEventListener('change', selectUser);

// Create User ------------------------------------------------------------------------
function CreatePersons () {	
	var example={
		name : document.querySelector('#impName').value,
		surname : document.querySelector('#impSurname').value,
		specialization : document.querySelector('#impSpecialization').value,
		jobTitle : document.querySelector('#impJobTitle').value,
		userType : userType
	};		
	console.log(example);
	
	switch (userType){			
			case 'user':			    
				somePerson = new createUser(example);
				dishome.disabled = true;
				disproject.disabled = true;
				break;
			case 'student':
				somePerson = new createStudent(example);
				dishome.disabled = false;
				disproject.disabled = true;
			    break;
			case 'developer':
				somePerson = new createDeveloper(example);
				dishome.disabled = false;
			    disproject.disabled = false;
				break;
		}	
	document.querySelector('.tasks').style.visibility = 'visible';
	i = PersonsList.length;
	PersonsList[i]= somePerson;
	
}
getCreate.addEventListener('click', CreatePersons);

// ShowPersonsList --------------------------------------------------------------------------
function ShowPersonsList(){
     console.log(PersonsList);
}
	buttonOk.addEventListener('click', ShowPersonsList);


//warning function --------------------------------------------------------------------------
function hunter (e) {
	var event = e || window.event;
	target = event.CurrentTarget || event.srcElement;
	targetId = target.id;
	if ( target.className === 'clicker'){
		//console.log(event.target.className);
		//console.log(target);		
		if( target.id=='Projectclick' && ( userType=='user' || userType=='student') ){
		alert("The task is not available for this type of user");		
		}else if( target.id=='Homeclick' && userType=='user' ){
				alert("The task is not available for this type of user");
				}
	}
}
clickHunter.addEventListener("click", hunter );

//createTask ---------------------------------------------------------------------------------
function createTaskSimple(task) {
	this.typeOfUser=task.typeOfUser;
    this.taskType = task.taskType;
    this.Title= task.Title;
    this.Status = task.Status;	
	
}
function createTaskHome(task) {
	this.Description = task.Description;
	createTaskSimple.call(this,task);
}
function createTaskProject(task) {
	this.Date = task.Date;
	createTaskHome.call(this,task);
}

//AddTask------------------------------------------------------------------------------------
function AddTasks (){
 taskType1= "Simple";
 taskType2= "Home";
 taskType2= "Project";
	var task1 = {
		 typeOfUser: PersonsList[i],
		 taskType : taskType1,
		 Title : document.querySelector('#simpleTitle').value,
	     Status : document.querySelector('#simpleStatus').value
		 
	};
	var task2 = {
		 typeOfUser: PersonsList[i],
		 taskType : taskType2,
		 Title : document.querySelector('#homeTitle').value,
		 Status : document.querySelector('#homeStatus').value,
		 Description : document.querySelector('#homeDescription').value
		 
	};
	
	var task3 = {
		 typeOfUser: PersonsList[i],
		 taskType : taskType3,
		 Title : document.querySelector('#projectTitle').value,
		 Status : document.querySelector('#projectStatus').value,
		 Description : document.querySelector('#projectDescription').value,
		 Date : document.querySelector('#projectDate').value
	};
	
		switch (userType){			
			case 'user':				
				sometask = new createTaskSimple(task1);		
				break;
			case 'student':	
				if(targetId === 'Homeclick'){
					sometask = new createTaskHome(task2);
				}else{
					sometask = new createTaskSimple(task1);
				}
					
			    break;
			case 'developer':
				if(targetId === 'Homeclick'){
					sometask = new createTaskHome(task2);
				}else if(targetId === 'Projectclick'){
					sometask = new createTaskProject(task3);
				}else{
					sometask = new createTaskSimple(task1);
				}
					
				break;			
			}
	j = TasksList.length;	
	TasksList[j]= sometask;	
}
addTask.addEventListener('click', AddTasks);


// ShowTasksList --------------------------------------------------------------------------
var buttonAddTask = document.querySelector('.AddTask');
function ShowTasksList(){
     console.log(TasksList);
}
	buttonAddTask.addEventListener('click', ShowTasksList);




















