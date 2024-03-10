var ArrayTodos=[]
const title=document.querySelector("#title")
const task=document.querySelector("#task")
const form=document.querySelector("#Todo")
const ShowAll=document.querySelector("#ShowAll")
const ShowCompleted=document.querySelector("#ShowCompleted")
const ShowPending=document.querySelector("#ShowPending")
const tbody=document.querySelector("#tbody")
var EditIndex="";
var Amish=[];
function RenderTable(event){
    bindTable()
}
function Save(event){
    if(title.value!=""&&task.value!=""){
        event.preventDefault();
        let NewDateTime="";
        let dateTime=new Date()
        NewDateTime+=dateTime
        if(EditIndex===""){
            // console.log()
            ArrayTodos.push({
                id:ArrayTodos.length+1,
                title:title.value,
                task:task.value,
                DateTime:NewDateTime.split("G")[0],
                IsChecked:false
            })
        }else{
            ArrayTodos[EditIndex].title=title.value;
            ArrayTodos[EditIndex].task=task.value;
            ArrayTodos[EditIndex].DateTime=NewDateTime.split("G")[0];
            EditIndex="";
        }
      
        // console.log(ArrayTodos)
        form.reset()
        bindTable()
    }
}
function bindTable(){
    html=""
    // if(ShowAll.checked){
        ArrayTodos.forEach((elements,key)=>{
            html+=`<tr class="Pending" id="row_${elements.id}">
                    <td class="w-20"><input id=checkbox_${elements.id} type="checkbox"class="form-check-input togglecheckbox" onchange="handleOnchange(event)"></td>
                    <td class="w-20">${elements.DateTime}</td>
                    <td class="w-20">${elements.title}</td>
                    <td class="w-20">${elements.task}</td>
                    <td class="w-20 pt-0"><button title="Edit" class="btn" onclick="Edit(event,${key})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square p-0" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                  </svg></button></td>
                    </tr>
            `
        })
        tbody.innerHTML=html;
        ArrayTodos.forEach((elements,key)=>{
            document.querySelector(`#checkbox_${elements.id}`).checked=elements.IsChecked;
            elements.IsChecked==true?document.getElementById(`row_${elements.id}`).classList.toggle('text-decoration-line-through')&&document.getElementById(`row_${elements.id}`).classList.toggle('Pending'):"";
        })

    // }
  if(ShowCompleted.checked){
        html="";
        document.querySelectorAll(".text-decoration-line-through").forEach((element)=>{
            html+=`<tr class="text-decoration-line-through" id="${element.id}">${element.innerHTML}</tr>`
        })
        tbody.innerHTML=html;
          document.querySelectorAll(".text-decoration-line-through").forEach((element)=>{
            let tempId=element.id.split("_")[1]
            document.querySelector(`#checkbox_${tempId}`).checked=ArrayTodos[tempId-1].IsChecked;
            ArrayTodos[tempId-1].IsChecked==true?document.getElementById(`${element.id}`).classList.add('text-decoration-line-through')&&document.getElementById(`${element.id}`).classList.remove('Pending'):document.getElementById(`${element.id}`).classList.remove('text-decoration-line-through')&&document.getElementById(`${element.id}`).classList.add('Pending');
        })
    }else if(ShowPending.checked){
        html=""
        document.querySelectorAll(".Pending").forEach((element)=>{
            html+=`<tr class="Pending" id="${element.id}">${element.innerHTML}</tr>`
        })
        tbody.innerHTML=html;
        document.querySelectorAll(".Pending").forEach((element)=>{
            let tempId=element.id.split("_")[1]
            document.querySelector(`#checkbox_${tempId}`).checked=ArrayTodos[tempId-1].IsChecked;
            ArrayTodos[tempId-1].IsChecked==true?document.getElementById(`${element.id}`).classList.add('text-decoration-line-through')&&document.getElementById(`${element.id}`).classList.remove('Pending'):document.getElementById(`${element.id}`).classList.remove('text-decoration-line-through')&&document.getElementById(`${element.id}`).classList.add('Pending');
        })
    }
   

}
function handleOnchange(event){
    let NewID=event.target.id.split("_")[1]
    document.querySelector(`#row_${NewID}`).classList.toggle('text-decoration-line-through');
    document.querySelector(`#row_${NewID}`).classList.toggle('Pending');
    ArrayTodos[NewID-1].IsChecked=!ArrayTodos[NewID-1].IsChecked;
    bindTable()
}

function Edit(event,index){
    // alert(event.target.id)
    title.value=ArrayTodos[index].title
    task.value=ArrayTodos[index].task
    EditIndex=index;
}