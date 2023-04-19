console.log("app.js");
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    //   let notesObj;
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myobj={
        title:addTitle.value,
        text:addTxt.value,
    };
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value="";
    // console.log(notesObj);
    showNotes();
});

//function to show elements from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-dark">Delete Note</button>
        </div>
        </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes`;
    }

    
}

//function to delete a note
function deleteNote(index) {
    //console.log('I am deleting ', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    // after deleting updating the localstorage
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){

    let inputval=search.value.toLowerCase();
    //  console.log("Input event fired",inputval);
     let noteCards=document.getElementsByClassName('noteCard');
     Array.from(noteCards).forEach(function(element){
             let cardTxt=element.getElementsByTagName("p")[0].innerText;
             //console.log(cardTxt);
             if(cardTxt.toLowerCase().includes(inputval.toLowerCase())){
                element.style.display="block";
             }
    else{
        element.style.display="none";
    }
})
});

/*
further features:
Add title
Marks one search by title or note
seperate notes by user
sync and host
*/