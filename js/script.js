const inputTask = document.querySelector('.new-task-input');
const inputButton = document.querySelector('.new-task-button');
const tasksItems = document.querySelector('.tasks-container');


// 1 - Passo: Fazer a validação do input, usando uma função para verificar se o valor digitado é maiior que 0

const validateInput = () => inputTask.value.trim().length>0;


const addtask = ()=>{
    const inputIsValid = validateInput();

    console.log(inputIsValid);

    if(!inputIsValid){
       return inputTask.classList.add('error');
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    //conteudo da tarefa
    const taskContent = document.createElement('p');
    taskContent.innerText = inputTask.value;
    taskContent.addEventListener('click', ()=>taskClick(taskContent));

    //criando o icone de delete
    const deleteItem = document.createElement('i')
    deleteItem.classList.add("fa-solid");
    deleteItem.classList.add("fa-trash");

    deleteItem.addEventListener('click', () => taskDelete(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksItems.appendChild(taskItemContainer);

    inputTask.value="";

    
};

const taskClick = (taskContent) => {
    const tasks = tasksItems.childNodes;

    for(const task of tasks){
        if(task.firstChild === taskContent){
            task.firstChild.classList.toggle("completed");
        }
    }

    
}

const taskDelete = (taskItemContainer,taskContent)=>{
    const tasks = tasksItems.childNodes;

    for(const task of tasks){
        if(task.firstChild === taskContent){
            taskItemContainer.remove();
        }
    }
    
}

const inputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid){
        return inputTask.classList.remove('error');
    }
}


//em fase de testes
const updateLocalStorage = () => {
    const tasks = tasksItems.childNodes;

    const localStorageTasks = [... tasks].map((task) => {
        const content = task.firstChild;
        console.log(content.classList.contains("completed"));
        //const isCompleted = content.classList.contains("completed");

        return {description: content.innerText, isCompleted};
    });

    //console.log({localStorageTasks})
}

inputButton.addEventListener('click',()=>addtask());
inputTask.addEventListener('change',()=>inputChange());

