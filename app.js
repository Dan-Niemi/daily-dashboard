import Note from "./class/Note.js";

let noteboard = document.querySelector('.noteboard');
noteboard.addEventListener('dblclick', createNote)

function createNote(e) {
  let rect = noteboard.getBoundingClientRect();
  let posX = e.clientX - rect.left
  let posY = e.clientY - rect.top
  let newNote = new Note(posX, posY)
  noteboard.appendChild(newNote)
}

function getNotesFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let id = localStorage.key(i)
    let json = JSON.parse(localStorage.getItem(id))
    let obj = { id, ...json }
    noteboard.appendChild(new Note(obj.posX, obj.posY,obj.id, obj.text, obj.width, obj.height))
  }
}

getNotesFromLocalStorage()