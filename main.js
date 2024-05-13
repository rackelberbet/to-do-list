let form = document.querySelector("#texto");
let button = document.querySelector(".botao");
let list = document.querySelector(".lista");
let result = document.querySelector(".resultado");

function criaLi(){
    const li = document.createElement('li');
    return li;
}

form.addEventListener('keypress', function(e){
    if(e.keyCode === 13) {
        if(!form.value) return;
        criaTarefa(form.value);
    }
})

function limpaInput(){
    form.value = '';
    form.focus();
}

function criaBotaoApagar(li){
    li.innerText += ' '; // apenas espaco entre li e botão apagar
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Clear Task';
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    list.appendChild(li);
    limpaInput();
    criaBotaoApagar(li)
    salvarTarefas();
}


button.addEventListener('click', function(){
    if(!form.value) return;
    criaTarefa(form.value);
})

document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
         el.parentElement.remove();
         salvarTarefas();
    }
})

function salvarTarefas(){
    const liTarefas = list.querySelectorAll('li');
    listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Clear Task', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); //converte para array de novo
    console.log(listaDeTarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvas()


