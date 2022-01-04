
document.addEventListener('dblclick', createNote)
document.addEventListener('input', resizeNote)

function createNote(e) {
  if (e.target.classList.contains('noteboard')) {
    let newNote = document.createElement('div');
    let rect = e.target.getBoundingClientRect();
    newNote.className = 'note';
    newNote.style.left = e.clientX - rect.left + 'px'
    newNote.style.top = e.clientY - rect.top + 'px'
    e.target.appendChild(newNote)

    let grabArea = document.createElement('div');
    grabArea.className = 'note__grab-area'
    grabArea.addEventListener('mousedown', dragNote(newNote, grabArea))
    newNote.appendChild(grabArea)

    let textArea = document.createElement('textarea');
    textArea.className = 'note__text-area'
    textArea.spellcheck = false
    newNote.appendChild(textArea)
    textArea.focus()

  }
}

function resizeNote(e) {
  e.target.style.height = Math.max(e.target.offsetHeight, e.target.scrollHeight) + 'px'
}


function dragNote(note, grabArea) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  grabArea.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    note.style.top = (note.offsetTop - pos2) + "px";
    note.style.left = (note.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
