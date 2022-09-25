const input = document.getElementById("input");
const addBtn = document.querySelector(".addBtn");
const removeBtn = document.querySelector(".removeBtn");
const clearAllBtn = document.querySelector(".clearAllBtn");
const notesList = document.querySelector(".notesList");
const notesTitle = document.querySelector(".notesTitle");

//Creating an empty array to store all notes in localStorage
let notesArr;

//we will call this function to show our notes on screen
function showNotes() {
  const allNotes = JSON.parse(localStorage.getItem("notes"));
  if (allNotes == null) {
    notesList.innerHTML = `
    <div class="nullText">
        No any notes to display. Please add notes.
    </div>
    `;
  } else {
    const note = allNotes
      .map((e, index) => {
        if (e.title.length == 0){
          title = `Note ${index+1}`;
        }else {
          title = e.title;
        }
        return `
            <div class="note">
            <h5 class="note_title">${title}</h5>
            <div class="note_content">${e.content}</div>
            <button onClick="remove(${index})" class="removeBtn btn">Remove</button>
            </div>
            `;
      })
      .join(" ");
    notesList.innerHTML = note;
  }
}
showNotes();

//This functional will add current note to localstorage
const addNote = () => {
  let inputText = {
    title: notesTitle.value,
    content: input.value
  };

  if (inputText.content.length == 0 ) {
    alert("Please add some content to your notes!");
  } else {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesArr = [];
    } else {
      notesArr = JSON.parse(notes);
    }
    notesArr.push(inputText);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    notesTitle.value= "";
    input.value = "";
  }
  showNotes();
};

//btn to add note
addBtn.addEventListener("click", addNote);
input.addEventListener("submit", addNote);

const clearAllNotes = () => {
  if (confirm("Do you want to remove all your notes?")) {
    localStorage.clear();
  }
  showNotes();
};

clearAllBtn.addEventListener("click", clearAllNotes);

const remove= (index)=> {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesArr = [];
    } else {
      notesArr = JSON.parse(notes);
    }
    notesArr.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    showNotes();
}