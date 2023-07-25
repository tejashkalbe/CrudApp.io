let selectedRow = null;

//show Alert
let showAlert = (message,className) =>{
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div,main);

  setTimeout(()=>document.querySelector(".alert").remove(),5000);
}

//clear all fields
let clearFields = () =>{
  document.querySelector('#Id').value="";
  document.querySelector('#firstName').value="";
  document.querySelector('#lastName').value="";
}

//add data

document.querySelector('#student-form').addEventListener("submit",(e)=>{
  e.preventDefault();
  //get values
  let id = document.querySelector('#Id').value;
  let firstName = document.querySelector('#firstName').value;
  let lastName = document.querySelector('#lastName').value;

  //validate
  if(id == "" || firstName == "" || lastName == ""){
    showAlert("Please fill in all details")
  }
  else{
    if(selectedRow == null){
      const list = document.querySelector('#student-list');
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>${id}</td>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>
      <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
      <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
      </td>
      `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Data Added","success");
    }
    else{
      selectedRow.children[0].textContent = id;
      selectedRow.children[1].textContent = firstName;
      selectedRow.children[2].textContent = lastName;
      selectedRow = null;
      showAlert("Data Edited","info");
    }
    clearFields();
  }
})

//Edit data
document.querySelector("#student-list").addEventListener("click",(e)=>{
  target = e.target;
  if(target.classList.contains('edit')){
    selectedRow = target.parentElement.parentElement;
    document.querySelector('#Id').value = selectedRow.children[0].textContent;
    document.querySelector('#firstName').value = selectedRow.children[1].textContent; 
    document.querySelector('#lastName').value = selectedRow.children[2].textContent;
  }
});


//delete data

document.querySelector("#student-list").addEventListener("click",(e)=>{
  target = e.target;
  if(target.classList.contains('delete')){
    target.parentElement.parentElement.remove();
    showAlert("Data Deleted","danger");
  }
});