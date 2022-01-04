let noteboard = document.querySelector('.noteboard')
let notes = []

document.addEventListener('dblclick', createNote)
document.addEventListener('input', resizeNote)
document.addEventListener('mousedown', dragNote)


class Note {
  constructor(posX, posY, text = '', id = null) {
    this.text = text || ''
    this.posX = posX;
    this.posY = posY;
    this.id = id || new Date().valueOf();
    this.note = document.createElement('div')
    noteboard.appendChild(this.note)
    this.note.outerHTML = `
      <div id = id${this.id} class="note" style="left: ${this.posX}px; top: ${this.posY}px;">
        <div class="note__grab-area"></div>
        <textarea class="note__text-area" spellcheck="false">${this.text}</textarea>
      </div>`
    this.textArea = document.querySelector(`#id${this.id} .note__text-area`)
    this.textArea.focus()
    this.textArea.addEventListener('blur',updateLocalStorage.bind(this))
    this.textArea.style.height = Math.max(this.textArea.offsetHeight, this.textArea.scrollHeight) + 'px'
  }
}



function createNote(e) {
  if (e.target == noteboard) {
    let rect = noteboard.getBoundingClientRect();
    let posX = e.clientX - rect.left
    let posY = e.clientY - rect.top
    let noteObject = new Note(posX, posY)
    notes.push(noteObject)
  }
}

function resizeNote(e) {
  if (!e.target.classList.contains('note__text-area')) {
    return
  }
  e.target.style.height = Math.max(e.target.offsetHeight, e.target.scrollHeight) + 'px'
}

function dragNote(e) {
  if (!e.target.classList.contains('note__grab-area')) {
    return
  }

  let moveX = 0, moveY = 0, mouseX = 0, mouseY = 0;
  let note = e.target.parentElement
  
  e = e || window.event;
  e.preventDefault();
  mouseX = e.clientX;
  mouseY = e.clientY;
  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;


  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    moveX = mouseX - e.clientX;
    moveY = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    // set the element's new position:
    note.style.left = (note.offsetLeft - moveX) + "px";
    note.style.top = (note.offsetTop - moveY) + "px";
  }

  function closeDragElement() {
    let noteObject = notes.find(item => "id" + item.id == note.id)
    noteObject.posX = parseInt(note.style.left)
    noteObject.posY = parseInt(note.style.top)

    updateLocalStorage.call(noteObject)
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function updateLocalStorage() {
  let obj = {
    posX: this.posX,
    posY: this.posY,
    text: this.textArea.value
  }
  localStorage.setItem(this.id,JSON.stringify(obj))
}

function readLocalStorage() {
  for (let i = 0; i < localStorage.length; i++){
    let id = localStorage.key(i)
    console.log(id,localStorage.getItem(id))
    let json = JSON.parse(localStorage.getItem(id))
    let obj = {id,...json}

    notes.push(new Note(obj.posX,obj.posY,obj.text,obj.id))
  }
}

readLocalStorage()