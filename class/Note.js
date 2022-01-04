export default class Note {
  constructor(posX, posY,id, text, width, height,) {
    const DEFAULT_WIDTH = 300
    const DEFAULT_HEIGHT = 60

    this.id = id || new Date().valueOf();
    this.text = text || '';
    this.posX = posX;
    this.posY = posY;
    this.width = width || DEFAULT_WIDTH;
    this.height = height || DEFAULT_HEIGHT;
    this.init()
    this.setLocalStorage()
    return this.note
  }
  init() {
    this.note = document.createElement('div')
    this.note.className = 'note'
    this.note.setAttribute('data-id', this.id)
    this.note.style.left = this.posX + 'px'
    this.note.style.top = this.posY + 'px'

    this.noteGrab = document.createElement('div')
    this.noteGrab.setAttribute('class', 'note__grab-area')

    this.noteText = document.createElement('textarea')
    this.noteText.className = 'note__text-area'
    this.noteText.spellcheck = false
    this.noteText.style.width = this.width + 'px'
    this.noteText.style.height = this.height + 'px'
    this.noteText.textContent = this.text

    this.note.appendChild(this.noteGrab)
    this.note.appendChild(this.noteText)

    this.noteGrab.addEventListener('mousedown', this.drag.bind(this))
    this.noteText.addEventListener('input', this.updateText.bind(this))
    this.noteText.addEventListener('keydown', this.onTextKeydown.bind(this))
    this.noteText.addEventListener('blur', this.setLocalStorage.bind(this))
    this.noteText.addEventListener('mouseup', this.setLocalStorage.bind(this))
  }

  updateText() {
    this.text = this.noteText.value
    this.autoResize()
    this.setLocalStorage()
  }

  drag(e) {
    let moveX = 0, moveY = 0, mouseX = e.clientX, mouseY = e.clientY
    e = e || window.event;
    e.preventDefault()
    document.onmouseup = dragStop.bind(this);
    document.onmousemove = dragMove.bind(this);

    function dragMove(e) {
      e = e || window.event;
      e.preventDefault();
      moveX = mouseX - e.clientX
      moveY = mouseY - e.clientY
      mouseX = e.clientX
      mouseY = e.clientY

      this.posX = this.note.offsetLeft - moveX
      this.posY = this.note.offsetTop - moveY
      this.note.style.left = this.posX + 'px'
      this.note.style.top = this.posY + 'px'
    }
    function dragStop() {
      this.setLocalStorage()
      document.onmouseup = null;
      document.onmousemove = null;
    }

  }
  autoResize() {
    this.noteText.style.height = Math.max(this.noteText.offsetHeight, this.noteText.scrollHeight) + 'px'
  }
  setLocalStorage() {
    let obj = {posX: this.posX, posY: this.posY,text: this.text, width: parseInt(this.noteText.style.width),height: parseInt(this.noteText.style.height)}
    localStorage.setItem(this.id, JSON.stringify(obj))
  }
  onTextKeydown(e) {
    if (e.key === 'Escape' || (e.metaKey && e.key === 'Enter')){
      this.noteText.blur()
    }
  }
}