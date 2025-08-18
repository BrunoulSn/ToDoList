listItems = document.getElementById('toDoItems');
function getToDoItems() {
    listItems.innerHTML = "";
    listItems.classList.add('listItems');
    for (let i = 0; i < localStorage.length; i++) {
        let toDoItemKey = localStorage.key(i);
        let toDoItemValue = localStorage.getItem(toDoItemKey);

        if (toDoItemKey && toDoItemValue) {
            let div = document.createElement('div');
            let divBotoes = document.createElement('div');
            let textItem = document.createElement('h3');

            textItem.textContent = toDoItemValue; 

            let editButton = document.createElement('button');
            editButton.textContent = "Editar";
            editButton.classList.add('editButton');
            editButton.addEventListener("click", function () {
                editItemToDoList(toDoItemKey);
            });

            let removeButton = document.createElement('button');
            removeButton.textContent = "Remover";
            removeButton.classList.add('removeButton');
            removeButton.addEventListener("click", function () {
                removeItemToDoList(toDoItemKey);
            });

            div.appendChild(textItem);
            divBotoes.appendChild(editButton);
            divBotoes.appendChild(removeButton);
            divBotoes.classList.add('divButtons');
            div.appendChild(divBotoes);
            div.classList.add('card');
            listItems.appendChild(div);
        }
    }
}



    function editItemToDoList(itemKey) {
    let toDoItemName = document.getElementById("ToDoItemName").value;

    // Permite editar para o mesmo nome, mas impede duplicados
    if (itemKey !== toDoItemName && validarToDoItem(toDoItemName)) {
        console.log("Valor inválido, edição cancelada.");
        return;
    }

    // Se o nome mudou, remove o antigo e adiciona o novo
    if (itemKey !== toDoItemName) {
        localStorage.removeItem(itemKey);
    }
    localStorage.setItem(toDoItemName, toDoItemName);
    getToDoItems();
}



function removeItemToDoList(itemKey) {
    localStorage.removeItem(itemKey);
    getToDoItems();
}

function validarToDoItem(toDoItemName) {
    
    let checarItem = localStorage.getItem(toDoItemName); // Busca o item no localStorage

    if (!toDoItemName) { // Verifica se o campo está vazio
        alert("Por favor, insira um nome para o item.");
        return true; // Retorna true se o campo estiver vazio
    }

    if (toDoItemName.length < 3) {
        alert("O nome do item deve ter pelo menos 3 caracteres.");
        return true; // Retorna true se o nome for muito curto
    }
    if (checarItem) {
        alert("Este item já existe na lista.");
        return true; // Retorna true se o item já existir
    }
    return false; // Retorna true se o item já existe, false caso contrário
}

document.getElementById("addButton").addEventListener("click", function () {

    let toDoItemName = document.getElementById("ToDoItemName").value; 

    if (validarToDoItem(toDoItemName)) // Verifica se o item é válido
        return;

    localStorage.setItem(toDoItemName, toDoItemName);
    getToDoItems();
});

getToDoItems();
//localStorage.clear()