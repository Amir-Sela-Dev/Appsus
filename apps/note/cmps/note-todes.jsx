
import { noteService } from "../services/note.service.js"
const { useEffect, useRef } = React


export function NoteTodos({ onRenderComp, onAddNote }) {
    const inputEl = useRef()
    let valueToAdd
    addBodyEv()

    useEffect(() => {
        addNoteByClick()

        return removeBodyEv()
    }, [])

    function getValue({ target }) {
        let { value } = target
        if (!value) return
        const newTodos = noteService.textToTodos(value)
        valueToAdd = newTodos
    }

    function addNoteTodos(todos) {
        console.log(todos)
        const newNote = noteService.getEmptyNote()
        if (!newNote.info.todos) newNote.info.todos = []
        newNote.info.todos.push(todos)
        noteService.save(newNote).then(onAddNote)
    }

    function addBodyEv() {
        document.body.style.minHeight = '100vh'
        document.body.addEventListener('click', addNoteByClick)
    }

    function removeBodyEv() {
        document.body.removeEventListener('click', addNoteByClick)
    }

    function addNoteByClick() {
        if (!valueToAdd) return
        let isClicked = true
        if (isClicked) {
            addNoteTodos(valueToAdd)
            valueToAdd = ''
            inputEl.current.value = ''
        }
        isClicked = false
    }

    function onCloseTxtNote() {
        onRenderComp('')
    }

    console.log(valueToAdd)
    return <section className="note-add-todos">
        <form className="todos-wrap" >

            <input type="text"
                id="note-txt"
                className="note-add-todos-input"
                name="note-txt"
                placeholder="Enter todos spread by ,"
                onChange={getValue}
                ref={inputEl}
            />
            <button type='button' className="img-close-btn" onClick={onCloseTxtNote}>Close</button>
        </form>
    </section>
}
