let toDoList = [{name: 'Cook breakfast', status: false}, {name:'Drink coffee', status: false}];

window.onload = function() {
   updateDom();

};

function clearDom(){
    document.getElementById("myUL").innerHTML = "";
    document.getElementById("listDone").innerHTML = "";
    document.getElementById("listLeft").innerHTML = "";
}

function updateDom(){
    clearDom();
    for(let i = 0; i < toDoList.length; i++) {
        let li = document.createElement('li');
        let text = document.createTextNode(toDoList[i].name);

        li.appendChild(text);

        li.appendChild(addSpan(i));

        li.onclick = function(ev){

            changeStatus(i);
        };

        document.getElementById('myUL').append(li);
        if (toDoList[i].status) {

            let liDone = document.createElement('li');
            let textDone = document.createTextNode(toDoList[i].name);
            liDone.appendChild(textDone);
            document.getElementById('listDone').append(liDone);

            li.setAttribute('class','checked');
            liDone.setAttribute('class','checked');

        } else {
            let liLeft = document.createElement('li');
            let textLeft = document.createTextNode(toDoList[i].name);
            liLeft.appendChild(textLeft);

            document.getElementById('listLeft').append(liLeft);
        }

        localStorage.setItem('tasks'+i,JSON.stringify(toDoList[i]))


    }

}

function changeStatus(id) {
    toDoList[id].status = !toDoList[id].status;
    updateDom();
}

function addSpan(id){
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function(ev){
        ev.stopPropagation();
        deleteTask(id);
    }
    return span;
}

function deleteTask(id){
    toDoList.splice(id, 1);
    updateDom();
}

function addNewElem(){
    let input = document.getElementById('newTask').value;
    let object = {name:`${input}`, status:false};
    if(object.name !== ""){
        toDoList.push(object);
        document.getElementById("newTask").value = "";
        updateDom();
    }
}




