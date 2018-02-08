import './styles/styles.scss'

//define UI vars
const formAddTask = document.querySelector('.formAddTask')
const taskInput = document.querySelector('.taskInput')
const buttonAddTask = document.querySelector('.buttonAddTask')
const inputFilterTask = document.querySelector('.inputFilterTask')
const buttonClearTask = document.querySelector('.buttonClearTask')
const taskList = document.querySelector('.collection')

loadEventListeners()
//Load all event listeners
function loadEventListeners() {
    //add taskevent

    //dom load event
    document.addEventListener('DOMContentLoaded', getTasks)
    buttonAddTask.addEventListener('click', addTask)
    taskList.addEventListener('click', deleteTask)
    buttonClearTask.addEventListener('click', clearTasks)
    inputFilterTask.addEventListener('keyup', filterTasks)

}
//create tasks Array
const creatTasksArrayFromLS = () => {
    let tasks = [];
    if (localStorage.getItem('tasks') !== null) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    return tasks
}
const tasks = creatTasksArrayFromLS()
//Get tasks from local storage
function getTasks() {

    tasks.forEach(task => {
        //Create li
        const li = document.createElement('li');
        li.className = 'collection__item'
        li.appendChild(document.createTextNode(task))
        //Create delete anchor
        const link = document.createElement('button')
        link.innerHTML = 'Delete'
        link.className = "delete-item collection__item__secondary-content"
        //append to taskList
        li.appendChild(link)
        taskList.appendChild(li)
    })
}


//add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('add a task')
    }
    //Create li
    const li = document.createElement('li');
    li.className = 'collection__item'
    li.appendChild(document.createTextNode(taskInput.value))
    //Create delete anchor
    const link = document.createElement('button')
    link.innerHTML = 'Delete'
    link.className = "delete-item collection__item__secondary-content"
    //append to taskList
    li.appendChild(link)
    taskList.appendChild(li)

    //store in ls
    storeTaskInLocalStorage(taskInput.value)

    taskInput.value = ''

    e.preventDefault()
}

//store task
const storeTaskInLocalStorage = task => {
    

    //tasks = [...tasks, task]
    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}
//delete Task
function deleteTask(e) {
    if (e.target.classList.contains('delete-item')) {
        e.target.parentElement.remove()
    }

    removeTaskFromLocalStorage(e.target.parentElement)
    e.preventDefault()
}

const removeTaskFromLocalStorage = (item) => {
    tasks.forEach((task, index) => {
        if(item.firstChild.textContent === task) 
            {tasks.splice(index, 1)}
            console.log(`item.textContent: ${item.firstChild.textContent}, task: ${task}`)
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

//clear Tasks
function clearTasks(e) {
    //taskList.innerHTML = ''

    //faster
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    localStorage.clear()

    e.preventDefault()
}

//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase()

    document.querySelectorAll('.collection__item')
        .forEach(task => {
            const item = task.firstChild.textContent.toLocaleLowerCase()
            item.indexOf(text) != -1 ? task.style.display = 'block' : task.style.display = 'none'
        })
}

